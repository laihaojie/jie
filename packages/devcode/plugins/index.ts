/* eslint-disable no-console */
// 初始化vite插件

export default function devCode() {
  return {
    name: 'devCode',
    transform(code) {
      const regx = /\/\/\s*devcode\s*.*\s*\/\/\s*end/g
      const start = /\/\/\s*devcode\s*/g
      const end = /\/\/\s*end\s*/g
      code = code.replace(regx, '')
      code = code.replace(start, '')
      code = code.replace(end, '')
      console.log(code)
      return {
        code,
      }
    },
    config(options) {
      options.esbuild = false
    },
  }
}
