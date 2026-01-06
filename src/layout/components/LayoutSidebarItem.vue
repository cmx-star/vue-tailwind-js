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

<script>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { getIcon } from '@/utils/icons'

export default {
  name: 'LayoutSidebarItem',
  components: {
    ChevronDownIcon,
  },
  props: {
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
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    isActive() {
      if (!this.item.path) return false
      return this.$route.path === this.item.path
    },
  },
  watch: {
    '$route.path': {
      handler() {
        this.checkAndExpandActive()
      },
      immediate: false,
    },
  },
  mounted() {
    this.checkAndExpandActive()
  },
  methods: {
    getIcon,
    formatMenuTitle(item) {
      // 优先使用 meta.titleKey（i18n key）
      if (item.meta?.titleKey) {
        return this.$t(item.meta.titleKey)
      }
      // 其次使用 meta.title（可能是 i18n key 或直接是文本）
      if (item.meta?.title) {
        // 如果 title 看起来像 i18n key（包含点号），尝试翻译
        if (typeof item.meta.title === 'string' && item.meta.title.includes('.')) {
          try {
            return this.$t(item.meta.title)
          } catch {
            // 如果翻译失败，直接返回原文本
            return item.meta.title
          }
        }
        return item.meta.title
      }
      // 最后使用 name
      return item.name || ''
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
    isPathMatch(itemPath, currentPath) {
      if (!itemPath) return false
      if (itemPath === currentPath) return true
      if (currentPath.startsWith(itemPath + '/') || currentPath.startsWith(itemPath + '?')) {
        return true
      }
      return false
    },
    checkAndExpandActive() {
      if (this.item.children && this.item.children.length > 0) {
        const hasActiveChild = this.item.children.some((child) => {
          if (this.isPathMatch(child.path, this.$route.path)) return true
          if (child.children && child.children.length > 0) {
            return this.checkChildrenActive(child.children)
          }
          return false
        })
        if (this.item.path && this.isPathMatch(this.item.path, this.$route.path)) {
          this.isExpanded = true
        } else if (hasActiveChild) {
          this.isExpanded = true
        }
      }
    },
    checkChildrenActive(children) {
      return children.some((child) => {
        if (this.isPathMatch(child.path, this.$route.path)) return true
        if (child.children && child.children.length > 0) {
          return this.checkChildrenActive(child.children)
        }
        return false
      })
    },
  },
}
</script>
