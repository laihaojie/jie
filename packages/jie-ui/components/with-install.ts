import type { App } from 'vue'

// https://github.com/youzan/vant/issues/8302
interface EventShim {
  new(...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}

export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export function withInstall<T>(options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as unknown as { name: string }
    app.component(name, options as any)
  }

  return options as WithInstall<T>
}
