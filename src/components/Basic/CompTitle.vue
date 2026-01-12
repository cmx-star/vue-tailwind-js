<template>
  <div class="compTitle w-full pb-[15px] relative">
    <div class="flex items-center justify-between">
      <!-- Title Section -->
      <div class="flex-1 flex items-center overflow-hidden">
        <div
          class="border-l-3 pl-2 text-[18px] font-bold tracking-wider truncate group relative"
          :class="[
            title.length > 20 ? 'w-[80%]' : '',
            !color ? 'text-primary-600 dark:text-white' : '',
          ]"
          :style="{
            borderColor: color || 'var(--color-primary)',
            color: color || '',
          }"
        >
          {{ title }}
          <span
            v-if="title.length > 20"
            class="hidden group-hover:block absolute top-full left-0 p-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg whitespace-nowrap z-50 rounded"
          >
            {{ title }}
          </span>
        </div>

        <!-- Switch -->
        <div v-if="switchBtn" class="ml-[15px] flex items-center">
          <CompSwitch v-model="switchValue" @update:model-value="switchChange" />
        </div>

        <!-- Connection Status -->
        <span
          v-if="connect !== 2"
          class="ml-[10px] px-1.5 py-[3px] text-sm text-white rounded whitespace-nowrap"
          :class="connect == 1 ? 'bg-success' : 'bg-error'"
        >
          {{ connectValue }}
        </span>
      </div>

      <!-- Buttons Section -->
      <div class="flex items-center gap-2 ml-4">
        <!-- Popover Prompt Info -->
        <div v-if="popover" class="flex items-center">
          <CompTipPopover :venus-style="true">
            <template #content>
              <p>{{ string_1 }}</p>
              <p>{{ string_2 }}</p>
              <p>{{ string_3 }}</p>
              <p>{{ string_4 }}</p>
            </template>
          </CompTipPopover>
        </div>

        <CompBaseButton v-if="addBtn" size="sm" class="h-8 min-w-[100px]" @click="add">
          {{ $t('common.add') }}
        </CompBaseButton>

        <CompBaseButton
          v-if="editBtn"
          size="sm"
          class="h-8 min-w-[100px]"
          type="warning"
          @click="editchange(edi)"
        >
          {{ edi }}
        </CompBaseButton>

        <CompBaseButton
          v-if="applyBtn"
          size="sm"
          class="h-8 min-w-[100px]"
          type="primary"
          @click="apply"
        >
          {{ $t('common.apply') }}
        </CompBaseButton>

        <CompBaseButton
          v-if="importBtn"
          size="sm"
          class="h-8 min-w-[100px]"
          type="primary"
          @click="import_function"
        >
          {{ $t('common.import') }}
        </CompBaseButton>

        <CompBaseButton
          v-if="exportBtn"
          size="sm"
          class="h-8 min-w-[100px]"
          type="primary"
          @click="export_function"
        >
          {{ $t('common.export') }}
        </CompBaseButton>

        <CompBaseButton
          v-if="delBtn"
          size="sm"
          type="danger"
          :loading="delLoading"
          class="h-8 min-w-[100px]"
          @click="delet"
        >
          {{ $t('common.delete') }}
        </CompBaseButton>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc: 通用标题组件 - 支持自定义颜色和基础操作按钮
 * @author: Antigravity
 */
export default {
  name: 'CompTitle',
  props: {
    title: {
      type: String,
      default: '基础信息',
    },
    // 自定义左侧边线颜色，默认使用主题色
    color: {
      type: String,
      default: '',
    },
    connect: {
      type: Number,
      default: 2,
    },
    switchBtn: {
      type: Boolean,
      default: false,
    },
    switchDefault: {
      type: Boolean,
      default: false,
    },
    delBtn: {
      type: Boolean,
      default: false,
    },
    editBtn: {
      type: Boolean,
      default: false,
    },
    addBtn: {
      type: Boolean,
      default: false,
    },
    popover: {
      type: Boolean,
      default: false,
    },
    applyBtn: {
      type: Boolean,
      default: false,
    },
    exportBtn: {
      type: Boolean,
      default: false,
    },
    importBtn: {
      type: Boolean,
      default: false,
    },
    delLoading: {
      type: Boolean,
      default: false,
    },
    string_1: { type: String, default: '' },
    string_2: { type: String, default: '' },
    string_3: { type: String, default: '' },
    string_4: { type: String, default: '' },
    popoverRight: { type: String, default: '960px' },
  },
  emits: [
    'switchChange',
    'ediChange',
    'deletthing',
    'addthing',
    'applything',
    'exportthing',
    'importthing',
  ],
  data() {
    return {
      switchValue: false,
    }
  },
  computed: {
    edi() {
      return this.$t('common.edit')
    },
    connectValue() {
      if (this.connect == 1) return this.$t('common.connected')
      if (this.connect == 0) return this.$t('common.disconnected')
      return ''
    },
  },
  watch: {
    switchDefault: {
      handler(newVal) {
        this.switchValue = newVal
      },
      immediate: true,
    },
  },
  methods: {
    switchChange(value) {
      this.$emit('switchChange', value)
    },
    editchange(edi) {
      this.$emit('ediChange', edi)
    },
    delet() {
      this.$emit('deletthing')
    },
    add() {
      this.$emit('addthing')
    },
    apply() {
      this.$emit('applything')
    },
    export_function() {
      this.$emit('exportthing')
    },
    import_function() {
      this.$emit('importthing')
    },
  },
}
</script>

<style scoped>
.border-l-3 {
  border-left-width: 3px;
}
</style>
