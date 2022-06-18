import { createApp } from 'vue'
import JUi from '../../components/make-installer'
// import JUi from '../../dist'
import App from './App.vue'

const app = createApp(App)

app.use(JUi)
app.mount('#app')
