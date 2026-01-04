import VueI18n from 'vue-i18n'
import Vue from 'vue'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import { storage } from '@/utils/storage'

Vue.use(VueI18n)

// 获取默认语言
const getDefaultLocale = () => {
  const savedLocale = storage.get('locale')
  if (savedLocale) return savedLocale

  const browserLocale = navigator.language
  if (browserLocale.startsWith('zh')) return 'zh-CN'
  if (browserLocale.startsWith('en')) return 'en-US'

  return 'zh-CN'
}

const i18n = new VueI18n({
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n
