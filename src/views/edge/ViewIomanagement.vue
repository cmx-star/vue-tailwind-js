<template>
  <CompPageLayout class="ViewIomanagement">
    <!-- 页面标题 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6"
    >
      <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('io.title') }}</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">{{ $t('io.description') }}</p>
    </div>

    <!-- DI 功能 -->
    <CompCard class="mb-6">
      <div
        class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('io.di.title') }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in diList"
          :key="index"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-4">
            {{ item.port }}
          </h3>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('io.di.inputMode') }}:</span>
              <span class="text-gray-900 dark:text-white font-medium">
                {{ item.work_mode === 1 ? $t('io.di.digitalInput') : $t('io.di.counter') }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('io.di.filterTime') }}:</span>
              <span class="text-gray-900 dark:text-white font-medium"
                >{{ item.filter_tm_switch }} ms</span
              >
            </div>

            <div v-if="item.work_mode === 2" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('io.di.counterMode') }}:</span>
              <span class="text-gray-900 dark:text-white font-medium">
                {{ item.trigger_mode === 1 ? $t('io.di.risingEdge') : $t('io.di.fallingEdge') }}
              </span>
            </div>

            <div v-if="item.work_mode === 2" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400"
                >{{ $t('io.di.countFrequency') }}:</span
              >
              <span class="text-gray-900 dark:text-white font-medium"
                >{{ item.filter_tm_count }} ms</span
              >
            </div>

            <div v-if="item.work_mode === 2" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('io.di.maxRange') }}:</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ item.range }}</span>
            </div>

            <div v-if="item.work_mode === 2" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400"
                >{{ $t('io.di.exceedsMaxRange') }}:</span
              >
              <span class="text-gray-900 dark:text-white font-medium">
                {{ item.range_opt === 1 ? $t('io.di.loop') : $t('io.di.stop') }}
              </span>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              @click="editDI(item)"
            >
              {{ $t('io.common.edit') }}
            </button>
          </div>
        </div>
      </div>
    </CompCard>

    <!-- AO 功能 -->
    <CompCard class="mb-6">
      <div
        class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('io.ao.title') }}</h2>
      </div>

      <div v-if="aoList.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400">
        {{ $t('io.common.noData') }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in aoList"
          :key="index"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-4">
            {{ item.port }}
          </h3>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('io.ao.type') }}:</span>
              <span class="text-gray-900 dark:text-white font-medium">
                {{ item.work_mode === 1 ? $t('io.ao.current') : $t('io.ao.voltage') }}
              </span>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              @click="editAO(item)"
            >
              {{ $t('io.common.edit') }}
            </button>
          </div>
        </div>
      </div>
    </CompCard>

    <!-- DO 功能 -->
    <CompCard class="mb-6">
      <div
        class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('io.do.title') }}</h2>
        <CompBaseButton size="sm" @click="applyDO">{{ $t('io.common.apply') }}</CompBaseButton>
      </div>

      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >{{ $t('io.do.restartHold') }}:</span
        >
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="holdMode"
            type="radio"
            :value="1"
            class="w-4 h-4 text-primary-600 focus:ring-primary-500"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('io.do.open') }}</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="holdMode"
            type="radio"
            :value="0"
            class="w-4 h-4 text-primary-600 focus:ring-primary-500"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">{{ $t('io.do.close') }}</span>
        </label>
      </div>
    </CompCard>

    <!-- 定时功能 -->
    <CompCard>
      <div
        class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('io.timing.title') }}
        </h2>
        <CompBaseButton size="sm" @click="addTiming">{{ $t('io.common.add') }}</CompBaseButton>
      </div>

      <CompDataTable :columns="timingColumns" :data="timingList">
        <template #timingMode="{ row }">
          <span>{{
            row.alarm_mode === 1 ? $t('io.timing.timingMotion') : $t('io.timing.periodicAction')
          }}</span>
        </template>

        <template #time="{ row }">
          <span v-if="row.alarm_mode === 1">{{ row.time }}</span>
          <span v-else>{{ row.time_cycle }} s</span>
        </template>

        <template #action="{ row }">
          <span v-if="row.do_action === 1">{{ $t('io.do.on') }}</span>
          <span v-else-if="row.do_action === 2">{{ $t('io.do.off') }}</span>
          <span v-else>{{ $t('io.do.switch') }}</span>
        </template>

        <template #actions="{ row }">
          <div class="flex gap-3">
            <button
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
              @click="editTiming(row)"
            >
              {{ $t('common.edit') }}
            </button>
            <button
              class="text-danger hover:text-danger/90 text-sm font-medium"
              @click="deleteTiming(row)"
            >
              {{ $t('common.delete') }}
            </button>
          </div>
        </template>
      </CompDataTable>
    </CompCard>

    <!-- DI 编辑弹窗 -->
    <CompDialog v-model="showDIDialog" :title="$t('io.common.edit')" width="lg" @confirm="saveDI">
      <CompForm
        ref="diFormRef"
        v-model="diFormData"
        :form-items="diFormItems"
        label-width="150px"
      />
    </CompDialog>

    <!-- AO 编辑弹窗 -->
    <CompDialog v-model="showAODialog" :title="$t('io.common.edit')" width="md" @confirm="saveAO">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <label class="w-36 text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
            {{ $t('io.ao.outputMode') }}:
          </label>
          <select
            v-model="aoFormData.work_mode"
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option :value="1">{{ $t('io.ao.currentOutput') }}</option>
            <option :value="2">{{ $t('io.ao.voltageOutput') }}</option>
          </select>
        </div>
      </div>
    </CompDialog>

    <!-- 定时功能编辑弹窗 -->
    <CompDialog
      v-model="showTimingDialog"
      :title="timingDialogTitle"
      width="lg"
      @confirm="saveTiming"
    >
      <CompForm
        ref="timingFormRef"
        v-model="timingFormData"
        :form-items="timingFormItems"
        label-width="150px"
      >
        <template #time>
          <div v-if="timingFormData.alarm_mode === 1" class="flex items-center gap-2">
            <input
              v-model="timingFormData.time"
              type="time"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </template>

        <template #time_cycle>
          <div v-if="timingFormData.alarm_mode === 2" class="flex items-center gap-2">
            <input
              v-model="timingFormData.time_cycle"
              type="number"
              min="1"
              max="86400"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">s</span>
          </div>
        </template>
      </CompForm>
    </CompDialog>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: IO 管理
 * @author: Antigravity
 * 1. 保持template、script、style这个顺序
 * 2. 保持template最外层元素的 class 与组件名称一致
 */
import { isInteger } from '@/utils/validate'

export default {
  name: 'ViewIomanagement',
  data() {
    return {
      // DI 数据
      diList: [
        {
          port: 'DI1',
          address: '0x01',
          work_mode: 1,
          filter_tm_switch: 50,
          trigger_mode: 1,
          filter_tm_count: 5,
          range: 10000,
          range_opt: 1,
        },
        {
          port: 'DI2',
          address: '0x02',
          work_mode: 2,
          filter_tm_switch: 50,
          trigger_mode: 1,
          filter_tm_count: 10,
          range: 50000,
          range_opt: 2,
        },
      ],

      // AO 数据
      aoList: [
        { port: 'AO1', work_mode: 1 },
        { port: 'AO2', work_mode: 2 },
      ],

      // DO 数据
      holdMode: 0,
      doList: [
        { port: 'DO1', address: '0x01' },
        { port: 'DO2', address: '0x02' },
      ],

      // 定时功能数据
      timingList: [
        {
          id: 1,
          name: '定时任务1',
          alarm_mode: 1,
          time: '08:00',
          time_cycle: '',
          do_port: 'DO1',
          do_addr: '0x01',
          do_action: 1,
        },
        {
          id: 2,
          name: '周期任务1',
          alarm_mode: 2,
          time: '',
          time_cycle: 60,
          do_port: 'DO2',
          do_addr: '0x02',
          do_action: 3,
        },
      ],

      // DI 弹窗
      showDIDialog: false,
      diFormData: {},

      // AO 弹窗
      showAODialog: false,
      aoFormData: {},

      // 定时功能弹窗
      showTimingDialog: false,
      timingFormData: {},
      timingDialogTitle: '',
      editingTimingIndex: -1,
    }
  },
  computed: {
    diFormItems() {
      const items = [
        {
          key: 'work_mode',
          label: this.$t('io.di.inputMode'),
          type: 'radio',
          options: [
            { label: this.$t('io.di.digitalInput'), value: 1 },
            { label: this.$t('io.di.counter'), value: 2 },
          ],
          required: true,
        },
      ]

      if (this.diFormData.work_mode === 1) {
        items.push({
          key: 'filter_tm_switch',
          label: this.$t('io.di.filterTime'),
          type: 'input',
          subType: 'number',
          placeholder: '10-65535',
          required: true,
          rules: [
            { required: true, message: this.$t('common.required') },
            {
              validator: (rule, value, callback) => {
                if (!isInteger(value) || value < 10 || value > 65535) {
                  callback(new Error('范围: 10-65535'))
                } else {
                  callback()
                }
              },
            },
          ],
        })
      }

      if (this.diFormData.work_mode === 2) {
        items.push(
          {
            key: 'trigger_mode',
            label: this.$t('io.di.counterMode'),
            type: 'radio',
            options: [
              { label: this.$t('io.di.risingEdge'), value: 1 },
              { label: this.$t('io.di.fallingEdge'), value: 2 },
            ],
            required: true,
          },
          {
            key: 'filter_tm_count',
            label: this.$t('io.di.countFrequency'),
            type: 'input',
            subType: 'number',
            placeholder: '5-65535',
            required: true,
          },
          {
            key: 'range',
            label: this.$t('io.di.maxRange'),
            type: 'input',
            subType: 'number',
            placeholder: '2-4294967296',
            required: true,
          },
          {
            key: 'range_opt',
            label: this.$t('io.di.exceedsMaxRange'),
            type: 'radio',
            options: [
              { label: this.$t('io.di.loop'), value: 1 },
              { label: this.$t('io.di.stop'), value: 2 },
            ],
            required: true,
          },
        )
      }

      return items
    },

    timingFormItems() {
      return [
        {
          key: 'name',
          label: this.$t('io.timing.taskDescription'),
          type: 'input',
          placeholder: this.$t('common.validation.required'),
          required: true,
          rules: [
            { required: true, message: this.$t('common.required') },
            { min: 1, max: 64, message: this.$t('common.lengthRange', { min: 1, max: 64 }) },
          ],
        },
        {
          key: 'alarm_mode',
          label: this.$t('io.timing.timingMode'),
          type: 'radio',
          options: [
            { label: this.$t('io.timing.timingMotion'), value: 1 },
            { label: this.$t('io.timing.periodicAction'), value: 2 },
          ],
          required: true,
        },
        {
          key: 'time',
          label: this.$t('io.timing.timingModeTime'),
          slot: 'time',
          show: (m) => m.alarm_mode === 1,
        },
        {
          key: 'time_cycle',
          label: this.$t('io.timing.cycleTime'),
          slot: 'time_cycle',
          show: (m) => m.alarm_mode === 2,
        },
        {
          key: 'do_port',
          label: this.$t('io.do.select'),
          type: 'select',
          options: this.doList.map((item) => ({ label: item.port, value: item.port })),
          required: true,
        },
        {
          key: 'do_action',
          label: this.$t('io.do.action'),
          type: 'radio',
          options: [
            {
              label: this.$t('io.do.on'),
              value: 1,
              disabled: this.timingFormData.alarm_mode !== 1,
            },
            {
              label: this.$t('io.do.off'),
              value: 2,
              disabled: this.timingFormData.alarm_mode !== 1,
            },
            { label: this.$t('io.do.switch'), value: 3 },
          ],
          required: true,
        },
      ]
    },

    timingColumns() {
      return [
        { key: 'name', label: this.$t('io.timing.taskDescription') },
        { key: 'timingMode', label: this.$t('io.timing.timingMode') },
        { key: 'time', label: this.$t('io.timing.time') },
        { key: 'do_port', label: this.$t('io.timing.actionOptions') },
        { key: 'action', label: this.$t('io.timing.action') },
        { key: 'actions', label: this.$t('io.timing.operation'), width: '150px' },
      ]
    },
  },
  watch: {
    'timingFormData.alarm_mode'(val) {
      if (val === 2) {
        this.timingFormData.do_action = 3
      }
    },
  },
  methods: {
    // DI 编辑
    editDI(item) {
      this.diFormData = { ...item }
      this.showDIDialog = true
    },

    async saveDI() {
      const valid = await this.$refs.diFormRef.validate()
      if (!valid) {
        this.$toast.error(this.$t('common.validateFailed'))
        return
      }

      const index = this.diList.findIndex((item) => item.port === this.diFormData.port)
      if (index !== -1) {
        this.diList[index] = { ...this.diFormData }
        this.$toast.success(this.$t('common.editSuccess'))
        this.showDIDialog = false
      }
    },

    // AO 编辑
    editAO(item) {
      this.aoFormData = { ...item }
      this.showAODialog = true
    },

    saveAO() {
      const index = this.aoList.findIndex((item) => item.port === this.aoFormData.port)
      if (index !== -1) {
        this.aoList[index] = { ...this.aoFormData }
        this.$toast.success(this.$t('common.editSuccess'))
        this.showAODialog = false
      }
    },

    // DO 应用
    applyDO() {
      this.$toast.success(this.$t('common.success'))
    },

    // 定时功能
    addTiming() {
      if (this.timingList.length >= 16) {
        this.$toast.error(this.$t('io.timing.maxTasks'))
        return
      }

      this.timingFormData = {
        name: '',
        alarm_mode: 2,
        time: '',
        time_cycle: '',
        do_port: '',
        do_action: 3,
      }
      this.timingDialogTitle = this.$t('io.common.add') + ' ' + this.$t('io.timing.title')
      this.editingTimingIndex = -1
      this.showTimingDialog = true
    },

    editTiming(row) {
      this.timingFormData = { ...row }
      this.timingDialogTitle = this.$t('io.common.edit') + ' ' + this.$t('io.timing.title')
      this.editingTimingIndex = this.timingList.findIndex((item) => item.id === row.id)
      this.showTimingDialog = true
    },

    async saveTiming() {
      const valid = await this.$refs.timingFormRef.validate()
      if (!valid) {
        this.$toast.error(this.$t('common.validateFailed'))
        return
      }

      // 查找对应的 DO 地址
      const doItem = this.doList.find((item) => item.port === this.timingFormData.do_port)
      if (doItem) {
        this.timingFormData.do_addr = doItem.address
      }

      if (this.editingTimingIndex >= 0) {
        // 编辑
        this.timingList[this.editingTimingIndex] = { ...this.timingFormData }
        this.$toast.success(this.$t('common.editSuccess'))
      } else {
        // 新增
        this.timingFormData.id = Date.now()
        this.timingList.push({ ...this.timingFormData })
        this.$toast.success(this.$t('common.addSuccess'))
      }

      this.showTimingDialog = false
    },

    deleteTiming(row) {
      this.$modal.confirm({
        title: this.$t('common.deleteConfirm'),
        content: this.$t('common.deleteConfirmMessage'),
        onConfirm: () => {
          const index = this.timingList.findIndex((item) => item.id === row.id)
          if (index !== -1) {
            this.timingList.splice(index, 1)
            this.$toast.success(this.$t('common.deleteSuccess'))
          }
        },
      })
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS，最小化自定义样式 */
</style>
