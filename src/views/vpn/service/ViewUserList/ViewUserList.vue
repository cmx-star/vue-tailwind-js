<template>
  <div class="p-6">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dropdown 下拉菜单示例</h1>
      
      <!-- 点击触发 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">点击触发</h2>
        <div class="flex flex-wrap gap-4">
          <CompDropdown trigger="click" variant="default">
            <template #trigger>
              <span>Dropdown Click</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem @click="handleAction('Dashboard')">Dashboard</CompDropdownItem>
            <CompDropdownItem @click="handleAction('Settings')">Settings</CompDropdownItem>
            <CompDropdownItem @click="handleAction('Earnings')">Earnings</CompDropdownItem>
            <CompDropdownItem @click="handleAction('Sign out')">Sign out</CompDropdownItem>
          </CompDropdown>

          <CompDropdown trigger="click" variant="secondary">
            <template #trigger>
              <span>Secondary</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem>Dashboard</CompDropdownItem>
            <CompDropdownItem>Settings</CompDropdownItem>
            <CompDropdownItem>Earnings</CompDropdownItem>
          </CompDropdown>

          <CompDropdown trigger="click" variant="ghost">
            <template #trigger>
              <span>Ghost</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem>Dashboard</CompDropdownItem>
            <CompDropdownItem>Settings</CompDropdownItem>
            <CompDropdownItem>Earnings</CompDropdownItem>
          </CompDropdown>
        </div>
      </section>

      <!-- 悬停触发 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">悬停触发</h2>
        <div class="flex flex-wrap gap-4">
          <CompDropdown trigger="hover" variant="default">
            <template #trigger>
              <span>Hover Me</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem>Dashboard</CompDropdownItem>
            <CompDropdownItem>Settings</CompDropdownItem>
            <CompDropdownItem>Earnings</CompDropdownItem>
            <CompDropdownItem>Sign out</CompDropdownItem>
          </CompDropdown>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">不同尺寸</h2>
        <div class="flex flex-wrap items-center gap-4">
          <CompDropdown trigger="click" size="sm">
            <template #trigger>
              <span>Small</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem>Dashboard</CompDropdownItem>
            <CompDropdownItem>Settings</CompDropdownItem>
          </CompDropdown>

          <CompDropdown trigger="click" size="base">
            <template #trigger>
              <span>Base</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem>Dashboard</CompDropdownItem>
            <CompDropdownItem>Settings</CompDropdownItem>
          </CompDropdown>

          <CompDropdown trigger="click" size="lg">
            <template #trigger>
              <span>Large</span>
              <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
              </svg>
            </template>
            <CompDropdownItem>Dashboard</CompDropdownItem>
            <CompDropdownItem>Settings</CompDropdownItem>
          </CompDropdown>
        </div>
      </section>

      <!-- 禁用项 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">禁用项</h2>
        <CompDropdown trigger="click">
          <template #trigger>
            <span>With Disabled Items</span>
            <svg class="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
            </svg>
          </template>
          <CompDropdownItem>Dashboard</CompDropdownItem>
          <CompDropdownItem disabled>Settings (Disabled)</CompDropdownItem>
          <CompDropdownItem>Earnings</CompDropdownItem>
          <CompDropdownItem disabled>Sign out (Disabled)</CompDropdownItem>
        </CompDropdown>
      </section>

      <!-- Pagination 分页 -->
      <section class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pagination 分页示例</h1>
        
        <!-- 文本按钮 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">文本按钮</h2>
          <div class="space-y-4">
            <CompPagination
              :total="500"
              :page-size="10"
              :current-page.sync="page1"
              :show-text="true"
              size="sm"
              @change="handlePageChange"
            />
            <CompPagination
              :total="500"
              :page-size="10"
              :current-page.sync="page2"
              :show-text="true"
              size="base"
              @change="handlePageChange"
            />
          </div>
        </div>

        <!-- 图标按钮 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">图标按钮</h2>
          <div class="space-y-4">
            <CompPagination
              :total="500"
              :page-size="10"
              :current-page.sync="page3"
              :show-text="false"
              size="sm"
              @change="handlePageChange"
            />
            <CompPagination
              :total="500"
              :page-size="10"
              :current-page.sync="page4"
              :show-text="false"
              size="base"
              @change="handlePageChange"
            />
          </div>
        </div>

        <!-- 带页面大小选择器 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">带页面大小选择器</h2>
          <CompPagination
            :total="500"
            :page-size.sync="pageSize"
            :current-page.sync="page5"
            :show-text="true"
            :show-page-size="true"
            :page-size-options="[10, 25, 50, 100]"
            @change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
        </div>

        <!-- 紧凑型分页 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">紧凑型分页</h2>
          <CompPaginationCompact
            :total="990"
            :page-size="10"
            :current-page.sync="page6"
            @change="handlePageChange"
          />
        </div>
      </section>

      <!-- Progress 进度条 -->
      <section class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Progress 进度条示例</h1>
        
        <!-- 不同颜色 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">不同颜色</h2>
          <div class="space-y-4">
            <CompProgress :percentage="45" variant="dark" label="Dark" :show-label="true" />
            <CompProgress :percentage="45" variant="brand" label="Brand" :show-label="true" />
            <CompProgress :percentage="45" variant="success" label="Success" :show-label="true" />
            <CompProgress :percentage="45" variant="danger" label="Danger" :show-label="true" />
            <CompProgress :percentage="45" variant="warning" label="Warning" :show-label="true" />
          </div>
        </div>

        <!-- 显示百分比 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">显示百分比</h2>
          <CompProgress :percentage="45" variant="brand" :show-percentage="true" />
        </div>

        <!-- 不同尺寸 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">不同尺寸</h2>
          <div class="space-y-4">
            <CompProgress :percentage="45" variant="brand" size="sm" label="Small" :show-label="true" />
            <CompProgress :percentage="45" variant="brand" size="base" label="Default" :show-label="true" />
            <CompProgress :percentage="45" variant="brand" size="lg" label="Large" :show-label="true" />
          </div>
        </div>

        <!-- 无标签 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">无标签</h2>
          <CompProgress :percentage="45" variant="brand" />
        </div>
      </section>

      <!-- Rating 评分 -->
      <section class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Rating 评分示例</h1>
        
        <!-- 默认评分 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">默认评分</h2>
          <CompRating :rating="4" />
        </div>

        <!-- 不同尺寸 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">不同尺寸</h2>
          <div class="space-y-4">
            <CompRating :rating="4" size="sm" />
            <CompRating :rating="4" size="base" />
            <CompRating :rating="4" size="md" />
            <CompRating :rating="4" size="lg" />
          </div>
        </div>

        <!-- 可交互评分 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">可交互评分（点击星星）</h2>
          <CompRating :rating.sync="userRating" :readonly="false" @change="handleRatingChange" />
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">当前评分: {{ userRating }} 星</p>
        </div>
      </section>

      <!-- Stepper 步骤条 -->
      <section class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Stepper 步骤条示例</h1>
        
        <CompStepper :steps="steps" :current-step="1" layout="vertical" />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewUserList',
  components: {},
  data() {
    return {
      page1: 3,
      page2: 3,
      page3: 3,
      page4: 3,
      page5: 3,
      page6: 1,
      pageSize: 10,
      userRating: 3,
      steps: [
        { title: 'User info', description: 'Step details here' },
        { title: 'Company info', description: 'Step details here' },
        { title: 'Payment info', description: 'Step details here' }
      ]
    };
  },
  methods: {
    handleAction(action) {
      this.$toast.info({
        title: 'Action',
        message: `You clicked: ${action}`,
        duration: 2000
      });
    },
    handlePageChange(page) {
      this.$toast.info({
        title: 'Page Changed',
        message: `Current page: ${page}`,
        duration: 2000
      });
    },
    handlePageSizeChange(size) {
      this.$toast.info({
        title: 'Page Size Changed',
        message: `Page size: ${size}`,
        duration: 2000
      });
    },
    handleRatingChange(rating) {
      this.$toast.success({
        title: 'Rating Changed',
        message: `You rated: ${rating} stars`,
        duration: 2000
      });
    }
  }
};
</script>
