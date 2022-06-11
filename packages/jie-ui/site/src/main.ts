import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import JUi from '../../dist'

console.log(JUi);


const app = createApp(App)
app.use(JUi)
app.mount('#app')
