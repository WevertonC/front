import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import store from './config/store/store'
import Axios from 'axios'
import VueApexCharts from "vue3-apexcharts"
import Multiselect from 'vue-multiselect'
import VueTheMask from 'vue-the-mask'
import { Quasar, Dialog, Notify, Loading } from 'quasar'
import quasarLang from "quasar/lang/pt-BR";
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { funcoes } from './config/funcoes/funcoes.js'

if(import.meta.env.DEV) {
  Axios.defaults.baseURL = "https://localhost:44325";
} else {
  Axios.defaults.baseURL = "https://efolha-7lgniu5kpa-rj.a.run.app";
}
Axios.defaults.headers.common['numeroDeSerie'] = localStorage.numeroDeSerie
Axios.defaults.headers.Authorization = `Bearer ${localStorage.token}`

const app = createApp(App)

app.use(Quasar, {
  plugins: { Dialog, Notify, Loading },
  lang: quasarLang,
})
app.use(createPinia())
app.use(router)
app.use(store)
app.use(VueApexCharts);
app.use(VueTheMask);
app.component('multiselect', Multiselect)
app.config.globalProperties.$funcoes = funcoes;

app.mount('#app')
