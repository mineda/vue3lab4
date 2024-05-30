import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { usuarioStore } from './stores/usuarioStore'

axios.defaults.baseURL = 'https://8080-mineda-springboot3lab4-11o9c17xhco.ws-us114.gitpod.io/'

axios.interceptors.request.use(config => {
    const store = usuarioStore();
    if(store.token) {
      config.headers.Authorization = store.token
    }
    return config
  })

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
