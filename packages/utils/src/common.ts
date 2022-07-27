export function randomStr(length = 10): string {
  const seeder = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
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

export function rafThrottle(fn: Function) {
  let locked = false
  return function (this: any, ...args: any[]) {
    if (locked)
      return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url: string) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj: any = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 义url字符串拼接的方法
 * @param options
 * @returns
 */
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
 * @param {string} input value
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
 * @returns {Array}
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
 * @param {Object} json
 * @returns {Array}
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
 * @returns {Object}
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
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val: string) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
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
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element: HTMLElement, className: string) {
  if (!element || !className)
    return

  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += `${className}`
  }
  else {
    classString
      = classString.substr(0, nameIndex)
      + classString.substr(nameIndex + className.length)
  }
  element.className = classString
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
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
 * @param {Object} source
 * @returns {Object}
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
 * @returns {Array}
 */
export function uniqueArr(arr: any) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = `${+new Date()}`
  const randomNum = `${(1 + Math.random()) * 65536}`
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls))
    ele.className += ` ${cls}`
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */
export default function openWindow(url, title, w, h) {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft
    = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop
    = window.screenTop !== undefined ? window.screenTop : window.screenY

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w
    }, height=${h
    }, top=${top
    }, left=${left}`,
  ) as Window

  // Puts focus on the newWindow

  newWindow.focus()
}

