import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import Toast from './plugins/Toast'
import './styles/index.css'
import 'uplot/dist/uPlot.min.css'

// 使用插件
Vue.use(VueRouter)
Vue.use(Vuex)

// 注册 Toast 到 Vue 原型
Vue.prototype.$toast = Toast

// 创建 Vue 实例
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
