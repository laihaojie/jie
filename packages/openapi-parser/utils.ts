export function sliceBeforeApi(str) {
  const match = str.match(/^(.*)(?=Api(?!.*Api))/) // 匹配 "Api" 之前的所有字符
  return match ? match[1] : '' // 如果匹配到，返回结果；否则返回空字符串
}

// 去除字符串的大括号
export function removeBraces(str) {
  return str.replace(/[{}]/g, '') // 使用正则表达式替换所有大括号
}

export function capitalizeFirstLetter(str) {
  if (!str) return '' // 如果字符串为空，直接返回
  return str.charAt(0).toUpperCase() + str.slice(1) // 将首字母大写，剩余部分不变
}

export function toCamelCase(str: string): string {
  return str
    .split('/')
    .reverse()
    .map(segment => segment.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/[-_]/g, '-').split('-'))
    .flat()
    .map((word, idx) => (idx === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}
