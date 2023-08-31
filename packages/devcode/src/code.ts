// 初始化vite插件
import type { Plugin, ResolvedConfig } from 'vite'
import { SKIP_COMMENT_RE } from '../constants'

export interface DevCodePluginOptions {

}

export function DevCodePlugin(options?: DevCodePluginOptions): Plugin {
  let config: ResolvedConfig

  return {
    name: 'jie-dev-plugin',
    enforce: 'pre',
    async transform(code, id) {
      if (config.mode !== 'development')
        code = code.replace(SKIP_COMMENT_RE, '')

      return { code }
    },
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
  }
}
