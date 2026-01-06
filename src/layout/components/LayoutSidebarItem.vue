<template>
  <li>
    <!-- 有子菜单的项 -->
    <div v-if="item.children && item.children.length > 0">
      <button
        :class="[
          'w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'text-gray-700 dark:text-gray-300',
          level > 0 ? 'text-sm' : '',
        ]"
        @click="toggleExpand"
      >
        <div class="flex items-center flex-1 min-w-0">
          <component
            :is="getIcon(item.meta.icon)"
            v-if="level === 0 && item.meta?.icon && getIcon(item.meta.icon)"
            class="w-5 h-5 flex-shrink-0"
          />
          <span
            v-if="!collapsed"
            :class="level === 0 && item.meta?.icon ? 'ml-3' : ''"
            class="truncate"
            >{{ formatMenuTitle(item) }}</span
          >
        </div>
        <ChevronDownIcon
          v-if="!collapsed"
          :class="['w-4 h-4 transition-transform flex-shrink-0', isExpanded ? 'rotate-180' : '']"
        />
      </button>

      <!-- 子菜单 -->
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-150 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-96"
        leave-from-class="opacity-100 max-h-96"
        leave-to-class="opacity-0 max-h-0"
      >
        <ul v-show="isExpanded && !collapsed" class="mt-2 ml-4 space-y-1 overflow-hidden">
          <LayoutSidebarItem
            v-for="child in item.children"
            :key="child.path || child.name"
            :item="child"
            :collapsed="collapsed"
            :level="level + 1"
          />
        </ul>
      </transition>
    </div>

    <!-- 无子菜单的项 -->
    <router-link
      v-else
      :to="item.path"
      :class="[
        'flex items-center px-4 py-2 rounded-lg transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        isActive
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-300',
        level > 0 ? 'text-sm' : '',
      ]"
    >
      <component
        :is="getIcon(item.meta.icon)"
        v-if="level === 0 && item.meta?.icon && getIcon(item.meta.icon)"
        class="w-5 h-5 flex-shrink-0"
      />
      <span
        v-if="!collapsed"
        :class="level === 0 && item.meta?.icon ? 'ml-3' : ''"
        class="truncate"
        >{{ formatMenuTitle(item) }}</span
      >
    </router-link>
  </li>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { getIcon } from '@/utils/icons'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    default: 0,
  },
})

const route = useRoute()
const { t } = useI18n()
const isExpanded = ref(false)

const isActive = computed(() => {
  if (!props.item.path) return false
  return route.path === props.item.path
})

const formatMenuTitle = (item) => {
  // 优先使用 meta.titleKey（i18n key）
  if (item.meta?.titleKey) {
    return t(item.meta.titleKey)
  }
  // 其次使用 meta.title（可能是 i18n key 或直接是文本）
  if (item.meta?.title) {
    // 如果 title 看起来像 i18n key（包含点号），尝试翻译
    if (typeof item.meta.title === 'string' && item.meta.title.includes('.')) {
      try {
        return t(item.meta.title)
      } catch {
        // 如果翻译失败，直接返回原文本
        return item.meta.title
      }
    }
    return item.meta.title
  }
  // 最后使用 name
  return item.name || ''
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 检查路径是否匹配（支持精确匹配和前缀匹配）
const isPathMatch = (itemPath, currentPath) => {
  if (!itemPath) return false
  // 精确匹配
  if (itemPath === currentPath) return true
  // 前缀匹配（确保是完整路径段）
  if (currentPath.startsWith(itemPath + '/') || currentPath.startsWith(itemPath + '?')) {
    return true
  }
  return false
}

// 自动展开包含当前路由的菜单
const checkAndExpandActive = () => {
  if (props.item.children && props.item.children.length > 0) {
    const hasActiveChild = props.item.children.some((child) => {
      // 检查子菜单路径是否匹配当前路由
      if (isPathMatch(child.path, route.path)) return true
      // 递归检查子菜单的子菜单
      if (child.children && child.children.length > 0) {
        return checkChildrenActive(child.children)
      }
      return false
    })
    // 如果当前路由路径以父菜单路径开头，也应该展开
    if (props.item.path && isPathMatch(props.item.path, route.path)) {
      isExpanded.value = true
    } else if (hasActiveChild) {
      isExpanded.value = true
    }
  }
}

const checkChildrenActive = (children) => {
  return children.some((child) => {
    if (isPathMatch(child.path, route.path)) return true
    if (child.children && child.children.length > 0) {
      return checkChildrenActive(child.children)
    }
    return false
  })
}

// 初始化时检查
onMounted(() => {
  checkAndExpandActive()
})

// 监听路由变化，重新检查展开状态
watch(
  () => route.path,
  () => {
    checkAndExpandActive()
  },
)
</script>
