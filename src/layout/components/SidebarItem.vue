<template>
  <li class="list-none">
    <!-- 有子菜单的项 (Menu Group) -->
    <div v-if="item.subMenu && item.subMenu.length > 0">
      <button
        class="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group relative"
        :class="[
          isExpanded || isParentActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50',
          level === 1 ? 'pl-[72px]' : level === 2 ? 'pl-[96px]' : level >= 3 ? 'pl-[120px]' : '',
        ]"
        @click="toggleExpand"
      >
        <div v-if="level === 0" class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <CompIcon v-if="item.icon" :name="item.icon" :size="16" />
          <CompIcon v-else name="circle" :size="4" class="opacity-20" />
        </div>

        <template v-if="!collapsed">
          <span :class="['truncate flex-1 text-left', level === 0 ? 'ml-3' : '']">{{
            getMenuName(item.name)
          }}</span>
          <CompIcon
            v-if="item.subMenu && item.subMenu.length > 0"
            name="chevron-right"
            :size="10"
            class="transition-transform duration-200"
            :class="{ 'rotate-90': isExpanded }"
          />
        </template>
      </button>

      <!-- 子菜单容器 (递归调用) -->
      <transition @enter="enter" @after-enter="afterEnter" @leave="leave">
        <ul v-if="isExpanded && !collapsed" class="mt-1 space-y-1 overflow-hidden">
          <SidebarItem
            v-for="sub in item.subMenu"
            :key="sub.id"
            :item="sub"
            :collapsed="collapsed"
            :level="level + 1"
            :parent-path="combinedPath"
          />
        </ul>
      </transition>
    </div>

    <!-- 无子菜单的项 (Link) -->
    <router-link
      v-else
      :to="combinedPath"
      class="flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group relative"
      :class="[
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50',
        level === 1 ? 'pl-[72px]' : level === 2 ? 'pl-[96px]' : level >= 3 ? 'pl-[120px]' : '',
      ]"
    >
      <div
        v-if="isActive && level === 0"
        class="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"
      ></div>

      <div v-if="level === 0" class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        <CompIcon v-if="item.icon" :name="item.icon" :size="16" />
        <CompIcon v-else name="circle" :size="4" class="opacity-20" />
      </div>

      <span v-if="!collapsed" :class="['truncate flex-1 text-left', level === 0 ? 'ml-3' : '']">{{
        getMenuName(item.name)
      }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  components: {},
  props: {
    item: { type: Object, required: true },
    collapsed: { type: Boolean, default: false },
    level: { type: Number, default: 0 },
    parentPath: { type: String, default: '' },
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    combinedPath() {
      // 拼接父级路径和当前路径
      const p = this.parentPath.endsWith('/') ? this.parentPath.slice(0, -1) : this.parentPath
      const s = this.item.uri.startsWith('/') ? this.item.uri.slice(1) : this.item.uri
      return `${p}/${s}`
    },
    isActive() {
      return this.$route.path === this.combinedPath
    },
    isParentActive() {
      if (!this.item.subMenu) return false
      return this.checkChildActive(this.item.subMenu)
    },
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        if (this.isParentActive) {
          this.isExpanded = true
        }
      },
    },
  },
  methods: {
    getMenuName(name) {
      // name 已经是国际化键，直接使用
      const menuKey = `menu.${name}`
      // 使用 $te 检查翻译是否存在，避免警告
      if (this.$te(menuKey)) {
        return this.$t(menuKey)
      }
      // 如果翻译不存在，直接返回原始名称
      return name
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
    checkChildActive(subMenu) {
      return subMenu.some((sub) => {
        const path = this.getCombinedPath(this.combinedPath, sub.uri)
        if (this.$route.path === path) return true
        if (sub.subMenu) return this.checkChildActive(sub.subMenu)
        return false
      })
    },
    getCombinedPath(parent, child) {
      const p = parent.endsWith('/') ? parent.slice(0, -1) : parent
      const s = child.startsWith('/') ? child.slice(1) : child
      return `${p}/${s}`
    },
    // 动画相关
    enter(el) {
      el.style.height = '0'
      el.offsetHeight // trigger reflow
      el.style.transition = 'height 0.3s ease-in-out'
      el.style.height = el.scrollHeight + 'px'
    },
    afterEnter(el) {
      el.style.height = 'auto'
    },
    leave(el) {
      el.style.transition = 'height 0.3s ease-in-out'
      el.style.height = el.scrollHeight + 'px'
      el.offsetHeight // trigger reflow
      el.style.height = '0'
    },
  },
}
</script>
