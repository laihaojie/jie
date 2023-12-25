/**
 *
 * @param {string} key
 * @returns res
 */
export function localGet(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  }
  catch (error) {
    return window.localStorage.getItem(key)
  }
}

export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key: string) {
  window.localStorage.removeItem(key)
}
