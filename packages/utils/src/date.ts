/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat?: string | '{y}-{m}-{d} {h}:{i}:{s}'): string | null {
  if (arguments.length === 0 || !time)
    return null
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time))
        time = parseInt(time)
      else
        time = time.replace(/-/gm, '/')
    }

    if (typeof time === 'number' && time.toString().length === 10)
      time = time * 1000

    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a')
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: number | string) {
  if ((`${time}`).length === 10)
    time = parseInt(time as string) * 1000

  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000
  if (diff < 30)
    return '刚刚'
  if (diff < 3600)
    return `${Math.ceil(diff / 60)}分钟前`
  if (diff < 3600 * 24)
    return `${Math.ceil(diff / 3600)}小时前`
  if (diff < 3600 * 24 * 2)
    return '1天前'
  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
}
