<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("dashboard.title") }}
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        欢迎回来，这里是您的数据概览
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 p-6 hover:shadow-md transition-all"
        :class="stat.borderColor"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p
              class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              {{ stat.title }}
            </p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ stat.value }}
            </p>
            <div class="flex items-center mt-2">
              <span
                class="text-xs font-medium"
                :class="stat.trend > 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ stat.trend > 0 ? "↑" : "↓" }} {{ Math.abs(stat.trend) }}%
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                较上月
              </span>
            </div>
          </div>
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="stat.bgColor"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="stat.icon"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 数据趋势图 -->
      <div
        class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            数据趋势
          </h2>
          <div class="flex items-center space-x-3">
            <!-- 日期选择器 -->
            <CompDatePicker
              v-model="selectedDateRange"
              :clearable="true"
            />
            <!-- 时间段选择器 -->
            <CompSelect
              v-model="selectedPeriod"
              :options="periodOptions"
              placeholder="选择时间段"
            />
          </div>
        </div>
        <!-- 折线图 -->
        <CompLineChart
          :data="chartData"
          :height="320"
          color="#3B82F6"
          :smooth="true"
        />
      </div>

      <!-- 快捷操作 -->
      <div class="space-y-6">
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            快捷操作
          </h2>
          <div class="space-y-2">
            <button
              v-for="action in quickActions"
              :key="action.label"
              class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="action.icon"
                />
              </svg>
              {{ action.label }}
            </button>
          </div>
        </div>

        <!-- 最近活动 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            最近活动
          </h2>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-3"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                :class="activity.bgColor"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="activity.icon"
                  />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ activity.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ activity.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 四个图表展示区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- 折线图 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          折线图
        </h3>
        <CompLineChart
          :data="lineChartData"
          :height="300"
          color="#3B82F6"
          :smooth="true"
        />
      </div>

      <!-- 面积图 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          面积图
        </h3>
        <CompAreaChart
          :data="areaChartData"
          :height="300"
          :colors="['#10B981', '#3B82F6']"
          :smooth="true"
        />
      </div>

      <!-- 柱状图 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          柱状图
        </h3>
        <CompBarChart
          :data="barChartData"
          :height="300"
          :colors="['#F59E0B', '#EF4444']"
        />
      </div>

      <!-- 饼图 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          饼图
        </h3>
        <CompPieChart
          :data="pieChartData"
          :height="300"
          :colors="['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']"
        />
      </div>
    </div>

    <!-- 组件展示区域 -->
    <div class="mt-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
          封装组件展示
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 下拉选择器 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              下拉选择器 (CompSelect)
            </h3>
            <div class="space-y-3">
              <CompSelect
                v-model="demoSelect"
                :options="selectOptions"
                placeholder="请选择选项"
                label="label"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                已选择: {{ demoSelect || '无' }}
              </p>
            </div>
          </div>

          <!-- 日期选择器 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              日期选择器
            </h3>
            <div class="space-y-3">
              <CompDatePicker
                v-model="demoDate"
                label="选择日期"
                mode="date"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                已选择: {{ demoDate ? new Date(demoDate).toLocaleDateString() : '无' }}
              </p>
            </div>
          </div>

          <!-- 时间选择器 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              时间选择器
            </h3>
            <div class="space-y-3">
              <CompDatePicker
                v-model="demoTime"
                label="选择时间"
                mode="time"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                已选择: {{ demoTime ? new Date(demoTime).toLocaleTimeString() : '无' }}
              </p>
            </div>
          </div>

          <!-- 日期时间选择器 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              日期时间选择器
            </h3>
            <div class="space-y-3">
              <CompDatePicker
                v-model="demoDateTime"
                label="选择日期时间"
                mode="dateTime"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                已选择: {{ demoDateTime ? new Date(demoDateTime).toLocaleString() : '无' }}
              </p>
            </div>
          </div>

          <!-- 日期范围选择器 -->
          <div class="lg:col-span-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              日期范围选择器
            </h3>
            <div class="space-y-3">
              <CompDatePicker
                v-model="demoDateRange"
                label="选择日期范围"
                mode="date"
                :range="true"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                已选择: 
                <span v-if="demoDateRange && demoDateRange.start && demoDateRange.end">
                  {{ new Date(demoDateRange.start).toLocaleDateString() }} 
                  至 
                  {{ new Date(demoDateRange.end).toLocaleDateString() }}
                </span>
                <span v-else>无</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      selectedPeriod: "week",
      selectedDateRange: null,
      periodOptions: [
        { label: "本周", value: "week" },
        { label: "本月", value: "month" },
        { label: "本季度", value: "quarter" },
      ],
      chartData: [
        { x: "周一", y: 30 },
        { x: "周二", y: 45 },
        { x: "周三", y: 35 },
        { x: "周四", y: 50 },
        { x: "周五", y: 60 },
        { x: "周六", y: 55 },
        { x: "周日", y: 40 },
      ],
      // 折线图数据 - 多条线
      lineChartData: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            name: '销售额',
            values: [30, 45, 35, 50, 60, 55]
          },
          {
            name: '利润',
            values: [20, 30, 25, 35, 45, 40]
          }
        ]
      },
      // 面积图数据 - 多条线
      areaChartData: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            name: '访问量',
            values: [20, 35, 45, 30, 50, 40]
          },
          {
            name: '注册量',
            values: [10, 20, 30, 20, 35, 28]
          }
        ]
      },
      // 柱状图数据 - 多条数据
      barChartData: {
        labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
        datasets: [
          {
            name: '销量',
            values: [120, 90, 150, 80, 110]
          },
          {
            name: '库存',
            values: [80, 70, 100, 60, 85]
          }
        ]
      },
      // 饼图数据
      pieChartData: [
        { label: "直接访问", value: 335 },
        { label: "邮件营销", value: 310 },
        { label: "联盟广告", value: 234 },
        { label: "视频广告", value: 135 },
        { label: "搜索引擎", value: 1548 },
      ],
      // 组件展示数据
      demoSelect: '',
      selectOptions: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
        { label: '选项四', value: 'option4' },
      ],
      demoDate: null,
      demoTime: null,
      demoDateTime: null,
      demoDateRange: null,
      stats: [
        {
          title: "总用户",
          value: "12,345",
          trend: 12.5,
          bgColor: "bg-blue-500",
          borderColor: "border-blue-500",
          icon:
            "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
        },
        {
          title: "总订单",
          value: "8,567",
          trend: 8.3,
          bgColor: "bg-green-500",
          borderColor: "border-green-500",
          icon:
            "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
        },
        {
          title: "总收入",
          value: "¥456,789",
          trend: 15.2,
          bgColor: "bg-purple-500",
          borderColor: "border-purple-500",
          icon:
            "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
          title: "活跃用户",
          value: "3,234",
          trend: -2.1,
          bgColor: "bg-orange-500",
          borderColor: "border-orange-500",
          icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        },
      ],
      quickActions: [
        {
          label: "添加用户",
          icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
        },
        {
          label: "创建订单",
          icon:
            "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
        },
        {
          label: "生成报告",
          icon:
            "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        },
      ],
      recentActivities: [
        {
          id: 1,
          title: "新用户注册",
          time: "2 分钟前",
          bgColor: "bg-blue-500",
          icon:
            "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
        },
        {
          id: 2,
          title: "订单已完成",
          time: "15 分钟前",
          bgColor: "bg-green-500",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
          id: 3,
          title: "系统更新",
          time: "1 小时前",
          bgColor: "bg-purple-500",
          icon:
            "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
        },
      ],
    };
  },
};
</script>

