import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './store'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('savePage', this)
        this.$store.commit('updateUser')
    }
}).$mount('#app')
