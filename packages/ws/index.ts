/* eslint-disable no-console */
interface WsOptions {
  /**
   * 心跳间隔时间
   * @default 10000
   */
  timeout?: number
  /**
   * 心跳key
   *  @default 'ping'
   */
  pingKey?: string
  /**
   * 是否立即链接
   * @default true
   */
  immediate?: boolean
  onopen?: (event: Event) => void
  onerror?: (event: Event) => void
  onclose?: (event: CloseEvent) => void
}

export default class Wss {
  websocket: WebSocket | null = null
  // 避免重复连接
  lockReconnect = false
  tt
  // 心跳间隔时间
  timeout = 10000
  timeoutObj: ReturnType<typeof setTimeout> | null = null
  serverTimeoutObj: ReturnType<typeof setTimeout> | null = null
  callbackStack = {}
  url: string
  pingKey = 'ping'
  onopen
  onerror
  onclose
  isClose = false
  // 是否立即链接
  immediate = true

  constructor(url, options: WsOptions = {}) {
    this.url = url
    Object.assign(this, options)
    if (this.immediate)
      this.createWebSocket()
  }

  /**
   *  创建WebSocket实例
   */
  createWebSocket() {
    if (!window.WebSocket)
      throw new Error('您的浏览器不支持WebSocket')

    try {
      // 关闭之前的连接
      if (this.websocket) {
        this.isClose = true
        this.websocket.close()
        this.websocket = null
      }
      this.websocket = new WebSocket(this.url)
      this.init()
    }
    catch (e) {
      console.log(`catch${e}`)
      this.reconnect()
    }
  }

  connect() {
    this.createWebSocket()
  }

  init() {
    // 连接成功建立的回调方法
    this.websocket!.onopen = (event) => {
      if (this.onopen) {
        this.onopen(event)
      }
      // 心跳检测重置
      this.reset().start()
    }

    // 接收到消息的回调方法
    this.websocket!.onmessage = (event) => {
      // console.log("WebSocket:收到一条消息", event.data);
      let result
      try {
        result = JSON.parse(event.data)

        // 如果指定了action 就出发对应的依赖
        if (result.action)
          this.trigger(result)
        else
          this.trigger({ action: 'default', data: result })
      }
      catch {
        this.trigger({ action: 'default', data: event.data })
      }
      finally {
        this.reset().start()
      }
    }

    // 连接发生错误的回调方法
    this.websocket!.onerror = (event) => {
      console.log('WebSocket: Error')
      if (this.onerror)
        this.onerror(event)
      this.reconnect()
    }

    // 连接关闭的回调方法
    this.websocket!.onclose = (event) => {
      console.log('WebSocket: Closed')
      if (this.onclose)
        this.onclose(event)
      this.reset() // 心跳检测
      // 判断是否是主动关闭
      if (!this.isClose)
        this.reconnect()
    }

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = () => {
      this.websocket!.close()
    }
  }

  /**
   *
   * @param {string} action 回调事件名称
   * @param {Function} callback 回调函数
   */
  on(action, callback) {
    if (this.callbackStack[action] === undefined)
      this.callbackStack[action] = new Set()

    this.callbackStack[action].add(callback)
  }

  trigger(result) {
    const effects = this.callbackStack[result.action]
    if (effects && effects.size) {
      effects.forEach((effect) => {
        effect(result.data)
      })
    }
  }

  // 发送消息
  send({ action, data }) {
    if (!this.websocket)
      throw new Error('websocket 未连接')
    if (!action) {
      throw new Error('action 不能为空')
    }
    const message = JSON.stringify({ action, data })

    this.websocket!.send(message)
  }

  /**
   * websocket重连
   */
  reconnect() {
    if (this.lockReconnect)
      return
    this.lockReconnect = true
    this.isClose = false
    if (this.tt)
      clearTimeout(this.tt)
    this.tt = setTimeout(() => {
      console.log('reconnect...')
      this.lockReconnect = false
      this.createWebSocket()
    }, 0)
  }

  reset() {
    clearTimeout(this.timeoutObj!)
    clearTimeout(this.serverTimeoutObj!)
    return this
  }

  start() {
    if (this.timeoutObj)
      clearTimeout(this.timeoutObj)
    if (this.serverTimeoutObj)
      clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      this.send({ action: this.pingKey, data: 'ping' })
      // console.log('ping');
      this.serverTimeoutObj = setTimeout(() => { // 如果超过一定时间还没重置，说明后端主动断开了
        console.log('Close Server')
        this.websocket!.close() // 如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
      }, this.timeout)
    }, this.timeout)
  }

  /**
   * 清除事件监听
   */
  off(action, callback) {
    if (this.callbackStack[action] === undefined)
      return
    this.callbackStack[action].delete(callback)
    if (this.callbackStack[action].size === 0) {
      delete this.callbackStack[action]
    }
  }

  /**
   * 清除所有事件监听
   */
  offAll(action) {
    if (this.callbackStack[action] === undefined)
      return
    this.callbackStack[action].clear()
    delete this.callbackStack[action]
  }

  /**
   * 清除所有事件监听
   */
  clearAll() {
    Object.keys(this.callbackStack).forEach((key) => {
      this.callbackStack[key].clear()
      delete this.callbackStack[key]
    })
  }

  /**
   * Close websocket connect
   */
  close() {
    this.isClose = true
    this.websocket!.close()
  }
}
