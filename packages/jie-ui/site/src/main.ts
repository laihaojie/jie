import { createApp } from 'vue'
import App from './App.vue'
import JUi from '../../dist'

console.log(JUi);


const app = createApp(App)
app.use(JUi)
app.mount('#app')
