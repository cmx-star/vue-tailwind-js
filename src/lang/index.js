import { createI18n } from 'vue-i18n'
import zhCN from './moudles/zh-CN/index'
import enUS from './moudles/en-US/index'
import { storage } from '@/utils/storage'

// 获取默认语言
const getDefaultLocale = () => {
  // 优先从本地存储获取
  const savedLocale = storage.get('locale')
  if (savedLocale) return savedLocale

  // 其次从浏览器语言获取
  const browserLocale = navigator.language
  if (browserLocale.startsWith('zh')) return 'zh-CN'
  if (browserLocale.startsWith('en')) return 'en-US'

  // 默认中文
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  globalInjection: true, // 全局注入 $t
})

export default i18n
