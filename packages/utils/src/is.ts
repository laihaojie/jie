
export const isWeChat = (): boolean => !!window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);

export const isMobileDevice = (): boolean => !!window.navigator.userAgent.toLowerCase().match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|CrKey)/i)

export const isMobile = (val: any): boolean => !!val.toString().match(/^1[3|4|5|7|8][0-9]{9}/);

export const isString = (val: any): boolean => Object.prototype.toString.call(val) === '[object String]'

export const isNumber = (val: any): boolean => Object.prototype.toString.call(val) === '[object Number]'

export const isObject = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]'

export const isArray = (val: any): boolean => val instanceof Array

export const isHtmlElement = (node: any): boolean => node && node.nodeType === Node.ELEMENT_NODE

export const isFunction = (functionToCheck: any): boolean => {
  var getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = (val: any): boolean => val === void 0

export const isDefined = (val: any): boolean => val !== undefined && val !== null

export const isEmpty = function (val: any): boolean {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }
  return false
}
