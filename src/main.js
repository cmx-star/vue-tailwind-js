import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import i18n from './lang'
import { ToastPlugin } from '@/plugins/toast'
import { ModalPlugin } from '@/plugins/modal'

// 导入样式
import './styles/index.css'

// 创建应用
const app = createApp(App)

// 使用插件
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ToastPlugin)
app.use(ModalPlugin)

// 挂载应用
app.mount('#app')
