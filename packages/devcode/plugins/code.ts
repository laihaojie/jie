/* eslint-disable unused-imports/no-unused-vars */
// 初始化vite插件

export default function codePlugin() {
  return {
    name: 'code-plugin',
    // enforce: 'pre',
    transform(code, id) {
      // if (id.endsWith('.ts') || id.endsWith('.tsx'))
      // console.log('code-plugin', code)
    },
    config(options) {
      // console.log('esbuild', options.esbuild)
    },
  }
}
