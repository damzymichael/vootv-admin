import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin)

const options: PluginOptions = {
  maxToasts: 3,
  hideProgressBar: true,
  newestOnTop: true,
  timeout: 3500
}

app.use(Toast, options)

app.mount('#app')
