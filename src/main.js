import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/origin'
import i18n from './lang'

// 导入样式
import './styles/index.css'

// 创建应用
const app = createApp(App)

// 使用插件
app.use(createPinia())
app.use(router)
app.use(i18n)

// 挂载应用
app.mount('#app')
