// import type { App } from 'vue'
import * as components from './index'

type App = import('vue').App

export default {
  install(app: App) {
    for (const key in components) {
      const component = components[key]
      app.component(component.name, component)
    }
  }
}