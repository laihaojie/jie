// 获取元素在窗口的绝对位置
export function getElementPosition(el: HTMLElement) {
  let top = 0
  let left = 0
  let element: any = el
  while (element.offsetParent) {
    top += element.offsetTop
    left += element.offsetLeft
    element = element.offsetParent
  }
  return { top, left }
} 
