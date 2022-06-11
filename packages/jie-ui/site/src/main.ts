import { createApp } from 'vue'
import App from './App.vue'
import JUi from '../../index'

const app = createApp(App)

app.use(JUi)
app.mount('#app')
