import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin)

app.use(ToastPlugin)

app.mount('#app')
