export function randomStr(length = 10): string {
  const seeder = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 */
  let randomStr = ''
  for (let i = 0; i < length; i++)
    randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length))

  return randomStr
}

export function randomInt(length = 6): number {
  let code = ''
  for (let i = 0; i < length; i++)
    code += Math.floor(Math.random() * 10)

  return Number(code)
}

export function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function setUrlQuery(url, query: Record<string, any>) {
  if (!url)
    return ''
  if (query) {
    const queryArr = [] as string[]
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key))
        queryArr.push(`${key}=${query[key]}`)
    }
    if (url.includes('?'))
      url = `${url}&${queryArr.join('&')}`

    else
      url = `${url}?${queryArr.join('&')}`
  }
  return url
}

/**
 * @param {string} str value
 * @returns {number} output value
 */
export function byteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7F && code <= 0x7FF)
      s++
    else if (code > 0x7FF && code <= 0xFFFF)
      s += 2
    if (code >= 0xDC00 && code <= 0xDFFF)
      i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array} xxx
 */
export function cleanArray(actual: Array<any>) {
  const newArray = [] as Array<any>
  for (let i = 0; i < actual.length; i++) {
    if (actual[i])
      newArray.push(actual[i])
  }
  return newArray
}

/**
 * @param {object} json
 * @returns {Array} xxx
 */
export function param(json: any) {
  if (!json)
    return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined)
        return ''
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
    }),
  ).join('&')
}

/**
 * @param {string} url
 * @returns {object} xxx
 */
export function param2Obj(url: string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search)
    return {}

  const obj: any = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * Merges two objects, giving the last one precedence
 * @param {object} target
 * @param {(object | Array)} source
 * @returns {object} xxx
 */
export function objectMerge(target: any, source: any) {
  if (typeof target !== 'object')
    target = {}

  if (Array.isArray(source))
    return source.slice()

  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object')
      target[property] = objectMerge(target[property], sourceProperty)
    else
      target[property] = sourceProperty
  })
  return target
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout: any, args: any, context: any, timestamp: any, result: any

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    }
    else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout)
          context = args = null
      }
    }
  }

  return function (this: any, ...args: any[]) {
    // eslint-disable-next-line ts/no-this-alias
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout)
      timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args as any[])
      context = args = null as any
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {object} source
 * @returns {object} xxx
 */
export function deepClone(source: any) {
  if (!source && typeof source !== 'object')
    throw new Error('error arguments')

  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object')
      targetObj[keys] = deepClone(source[keys])
    else
      targetObj[keys] = source[keys]
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array} xxx
 */
export function uniqueArr(arr: any) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string} xxx
 */
export function createUniqueString() {
  const timestamp = `${+new Date()}`
  const randomNum = `${(1 + Math.random()) * 65536}`
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @param {string} paths
 * @returns {string} xxx
 */
export function resolvePath(...paths) {
  // 实现类似于 path.resolve 的功能
  return paths.reduce((prev, curr) => {
    if (prev.endsWith('/') && curr.startsWith('/'))
      return prev + curr.slice(1)

    if (prev.endsWith('/') || curr.startsWith('/'))
      return prev + curr

    return `${prev}/${curr}`
  }).replace(/\/$/, '')
}
