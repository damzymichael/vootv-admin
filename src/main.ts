import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin, QueryClient, QueryCache, MutationCache } from '@tanstack/vue-query'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)

const options: PluginOptions = {
  maxToasts: 3,
  hideProgressBar: true,
  newestOnTop: true,
  timeout: 3500
}

app.use(Toast, options)

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const vueQueryOptions: VueQueryPluginOptions = { queryClient }

app.use(VueQueryPlugin, vueQueryOptions)

app.mount('#app')
