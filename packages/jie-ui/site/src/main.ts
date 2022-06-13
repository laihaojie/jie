import { createApp } from 'vue'
import JUi from '../../index'
import App from './App.vue'

const app = createApp(App)

app.use(JUi)
app.mount('#app')
