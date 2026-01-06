<template>
  <nav class="mb-4" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-sm">
      <li>
        <router-link
          to="/dashboard"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <HomeIcon class="w-4 h-4" />
        </router-link>
      </li>
      <li v-for="(item, index) in breadcrumbList" :key="index">
        <div class="flex items-center">
          <ChevronRightIcon class="w-4 h-4 text-gray-400 mx-2" />
          <router-link
            v-if="item.path && index < breadcrumbList.length - 1"
            :to="item.path"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {{ formatTitle(item) }}
          </router-link>
          <span v-else class="text-gray-700 dark:text-gray-200 font-medium">
            {{ formatTitle(item) }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { t } = useI18n()

const breadcrumbList = computed(() => {
  const matched = route.matched.filter(
    (item) => item.meta && (item.meta.title || item.meta.titleKey),
  )
  const list = []

  matched.forEach((item) => {
    list.push({
      title: item.meta.title,
      titleKey: item.meta.titleKey,
      path: item.path,
    })
  })

  return list
})

const formatTitle = (item) => {
  // 优先使用 titleKey（i18n key）
  if (item.titleKey) {
    return t(item.titleKey)
  }
  // 其次使用 title（可能是 i18n key 或直接是文本）
  if (item.title) {
    // 如果 title 看起来像 i18n key（包含点号），尝试翻译
    if (typeof item.title === 'string' && item.title.includes('.')) {
      try {
        return t(item.title)
      } catch {
        // 如果翻译失败，直接返回原文本
        return item.title
      }
    }
    return item.title
  }
  return ''
}
</script>
