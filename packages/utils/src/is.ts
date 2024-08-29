export const isWeChat = (): boolean => !!window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)

export const isMobileDevice = (): boolean => !!window.navigator.userAgent.toLowerCase().match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|CrKey)/i)

export const isMobile = (val: any): boolean => !!val.toString().match(/^1[3|4578]\d{9}/)

export const isString = (val: any): boolean => Object.prototype.toString.call(val) === '[object String]'

export const isNumber = (val: any): boolean => Object.prototype.toString.call(val) === '[object Number]'

export const isObject = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]'

export const isArray = (val: any): boolean => Array.isArray(val)

export const isHtmlElement = (node: any): boolean => node && node.nodeType === Node.ELEMENT_NODE

export function isFunction(functionToCheck: any): boolean {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = (val: any): boolean => val === undefined

export const isDefined = (val: any): boolean => val !== undefined && val !== null

export function isUrl(val: any): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(val)
    return true
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    return false
  }
}

export function isValidFileName(fileName) {
  // 定义正则表达式，匹配无效字符
  // eslint-disable-next-line no-control-regex, regexp/no-useless-flag
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g
  // 检查是否符合命名规范
  const isValid
    = typeof fileName === 'string'
    && fileName.length > 0
    && fileName.length <= 255
    && !invalidChars.test(fileName)
    && !/^\s|\s$/.test(fileName) // 不能以空格开头或结尾
    && !/^\.+$/.test(fileName) // 不能是仅由句点组成的字符串

  return isValid
}

export const isEmpty = function (val: any): boolean {
  // null or undefined
  if (val == null)
    return true

  if (typeof val === 'boolean')
    return false

  if (typeof val === 'number')
    return !val

  if (val instanceof Error)
    return val.message === ''

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

export function isIdNumber(id: string) {
  // 1 "验证通过!", 0 //校验不通过
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const format = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|(71)|(8[12]))\d{4}((19\d{2})|(2\d{3}))((0[1-9])|(1[0-2]))((0[1-9])|([12]\d)|(3[01]))\d{3}[0-9x]$/i
  // 号码规则校验
  if (!format.test(id))
    return false
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  const year = id.substr(6, 4) // 身份证年
  const month = id.substr(10, 2) // 身份证月
  const date = id.substr(12, 2) // 身份证日
  const time = Date.parse(`${month}-${date}-${year}`) // 身份证日期时间戳date
  const now_time = Date.now() // 当前时间戳
  // @ts-expect-error  xxx
  const dates = (new Date(year, month, 0)).getDate() // 身份证当月天数
  // @ts-expect-error  xxx
  if (time > now_time || date > dates)
    return false
  // 校验码判断
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对照表
  const id_array = id.split('')
  let sum = 0
  for (let k = 0; k < 17; k++)
    sum += Number.parseInt(id_array[k]) * c[k]

  return id_array[17].toUpperCase() === b[sum % 11].toUpperCase()
}
