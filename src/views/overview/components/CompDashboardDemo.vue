<template>
  <CompCard class="mt-6 shadow-none">
    <CompTitle :title="$t('overview.dashboard.componentDemo')" class="pb-0!" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- 下拉选择器 -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ $t('overview.dashboard.selectDemo') }}
        </h3>
        <div class="space-y-3">
          <CompSelect
            v-model="demoSelect"
            :options="selectOptions"
            :placeholder="$t('overview.dashboard.selectOption')"
            label="label"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('overview.dashboard.selected') }}{{ demoSelect || $t('overview.dashboard.none') }}
          </p>
        </div>
      </div>

      <!-- 日期选择器 -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ $t('overview.dashboard.datePicker') }}
        </h3>
        <div class="space-y-3">
          <CompDatePicker
            v-model="demoDate"
            :label="$t('overview.dashboard.selectDate')"
            mode="date"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('overview.dashboard.selected')
            }}{{
              demoDate ? new Date(demoDate).toLocaleDateString() : $t('overview.dashboard.none')
            }}
          </p>
        </div>
      </div>

      <!-- 时间选择器 -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ $t('overview.dashboard.timePicker') }}
        </h3>
        <div class="space-y-3">
          <CompDatePicker
            v-model="demoTime"
            :label="$t('overview.dashboard.selectTime')"
            mode="time"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('overview.dashboard.selected')
            }}{{
              demoTime ? new Date(demoTime).toLocaleTimeString() : $t('overview.dashboard.none')
            }}
          </p>
        </div>
      </div>

      <!-- 日期时间选择器 -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ $t('overview.dashboard.dateTimePicker') }}
        </h3>
        <div class="space-y-3">
          <CompDatePicker
            v-model="demoDateTime"
            :label="$t('overview.dashboard.selectDateTime')"
            mode="dateTime"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('overview.dashboard.selected')
            }}{{
              demoDateTime ? new Date(demoDateTime).toLocaleString() : $t('overview.dashboard.none')
            }}
          </p>
        </div>
      </div>

      <!-- 日期范围选择器 -->
      <div class="lg:col-span-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ $t('overview.dashboard.dateRangePicker') }}
        </h3>
        <div class="space-y-3">
          <CompDatePicker
            v-model="demoDateRange"
            :label="$t('overview.dashboard.selectDateRange')"
            mode="date"
            :range="true"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('overview.dashboard.selected') }}
            <span v-if="demoDateRange && demoDateRange.start && demoDateRange.end">
              {{ new Date(demoDateRange.start).toLocaleDateString() }}
              {{ $t('overview.dashboard.to') }}
              {{ new Date(demoDateRange.end).toLocaleDateString() }}
            </span>
            <span v-else>{{ $t('overview.dashboard.none') }}</span>
          </p>
        </div>
      </div>
    </div>
  </CompCard>
</template>

<script>
export default {
  name: 'CompDashboardDemo',
  components: {},
  data() {
    return {
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
    }
  },
}
</script>
