<template>
  <CompPageLayout>
    <CompPageHeader
      :title="$t('overview.dashboard.title')"
      :description="$t('overview.dashboard.welcome')"
    />

    <!-- 统计卡片 -->
    <CompDashboardStats :stats="stats" />

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 数据趋势图 -->
      <CompCard class="lg:col-span-2 shadow-none">
        <CompTitle :title="$t('overview.dashboard.dataTrend')" class="pb-0!" />
        <!-- 折线图 -->
        <CompLineChart :data="chartData" :height="320" :smooth="true" />
      </CompCard>

      <!-- 快捷操作与最近活动 -->
      <div class="flex flex-col gap-6">
        <!-- 快捷操作 -->
        <CompCard class="shadow-none">
          <CompTitle :title="$t('overview.dashboard.quickActions')" class="pb-0!" />
          <div class="space-y-2 mt-4">
            <CompDashboardQuickActionItem
              v-for="action in quickActions"
              :key="action.label"
              :action="action"
            />
          </div>
        </CompCard>

        <!-- 最近活动 -->
        <CompCard class="shadow-none">
          <CompTitle :title="$t('overview.dashboard.recentActivity')" class="pb-0!" />
          <div class="space-y-4 mt-4">
            <CompDashboardActivityItem
              v-for="activity in recentActivities"
              :key="activity.id"
              :activity="activity"
            />
          </div>
        </CompCard>
      </div>
    </div>

    <!-- 图表展示区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <!-- 折线图 -->
      <CompCard class="shadow-none">
        <CompTitle :title="$t('overview.dashboard.lineChart')" class="pb-0!" />
        <CompLineChart :data="lineChartData" :height="300" :smooth="true" />
      </CompCard>

      <!-- 面积图 -->
      <CompCard class="shadow-none">
        <CompTitle :title="$t('overview.dashboard.areaChart')" class="pb-0!" />
        <CompAreaChart :data="areaChartData" :height="300" :smooth="true" />
      </CompCard>

      <!-- 柱状图 -->
      <CompCard class="shadow-none">
        <CompTitle :title="$t('overview.dashboard.barChart')" class="pb-0!" />
        <CompBarChart :data="barChartData" :height="300" />
      </CompCard>
    </div>

    <!-- 组件展示区域 -->
    <CompDashboardDemo />
  </CompPageLayout>
</template>

<script>
import CompDashboardStats from './components/CompDashboardStats.vue'
import CompDashboardDemo from './components/CompDashboardDemo.vue'
import CompDashboardQuickActionItem from './components/CompDashboardQuickActionItem.vue'
import CompDashboardActivityItem from './components/CompDashboardActivityItem.vue'

export default {
  name: 'Dashboard',
  components: {
    CompDashboardStats,
    CompDashboardDemo,
    CompDashboardQuickActionItem,
    CompDashboardActivityItem,
  },
  data() {
    return {
      selectedPeriod: 'week',
      selectedDateRange: null,
      chartData: [
        { x: '周一', y: 30 },
        { x: '周二', y: 45 },
        { x: '周三', y: 35 },
        { x: '周四', y: 50 },
        { x: '周五', y: 60 },
        { x: '周六', y: 55 },
        { x: '周日', y: 40 },
      ],
      // 折线图数据 - 多条线
      lineChartData: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            name: '销售额',
            values: [30, 45, 35, 50, 60, 55],
          },
          {
            name: '利润',
            values: [20, 30, 25, 35, 45, 40],
          },
        ],
      },
      // 面积图数据 - 多条线
      areaChartData: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            name: '访问量',
            values: [20, 35, 45, 30, 50, 40],
          },
          {
            name: '注册量',
            values: [10, 20, 30, 20, 35, 28],
          },
        ],
      },
      // 柱状图数据 - 多条数据
      barChartData: {
        labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
        datasets: [
          {
            name: '销量',
            values: [120, 90, 150, 80, 110],
          },
          {
            name: '库存',
            values: [80, 70, 100, 60, 85],
          },
        ],
      },
      stats: [
        {
          title: '总用户',
          value: '12,345',
          trend: 12.5,
          bgColor: 'bg-primary-500',
          borderColor: 'border-primary-500',
          icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        },
        {
          title: '总订单',
          value: '8,567',
          trend: 8.3,
          bgColor: 'bg-green-500',
          borderColor: 'border-green-500',
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        },
        {
          title: '总收入',
          value: '¥456,789',
          trend: 15.2,
          bgColor: 'bg-purple-500',
          borderColor: 'border-purple-500',
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: '活跃用户',
          value: '3,234',
          trend: -2.1,
          bgColor: 'bg-orange-500',
          borderColor: 'border-orange-500',
          icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
        },
      ],
      quickActions: [
        {
          label: '添加用户',
          icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
        },
        {
          label: '创建订单',
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        },
        {
          label: '生成报告',
          icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        },
      ],
      recentActivities: [
        {
          id: 1,
          title: '新用户注册',
          time: '2 分钟前',
          bgColor: 'bg-primary-500',
          icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
        },
        {
          id: 2,
          title: '订单已完成',
          time: '15 分钟前',
          bgColor: 'bg-green-500',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          id: 3,
          title: '系统更新',
          time: '1 小时前',
          bgColor: 'bg-purple-500',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        },
      ],
    }
  },
}
</script>
