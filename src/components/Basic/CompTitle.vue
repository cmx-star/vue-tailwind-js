<template>
  <div class="compTitle w-full pb-[15px] flex items-center relative">
    <!-- Title Section -->
    <div class="flex-1 flex items-center">
      <div
        v-if="device_type === 'EG628'"
        class="border-l-3 border-[#c12123] pl-2 text-[18px] font-bold tracking-wider truncate group relative"
        :class="title.length > 20 ? 'w-[80%]' : ''"
      >
        {{ title }}
        <span
          v-if="title.length > 20"
          class="hidden group-hover:block absolute top-full left-0 p-1 bg-white border border-gray-200 shadow-lg whitespace-nowrap z-50 rounded"
        >
          {{ title }}
        </span>
      </div>
      <div
        v-else-if="device_type === 'M300'"
        class="border-l-3 border-[#ed741d] pl-2 text-[18px] font-bold tracking-wider truncate group relative"
        :class="title.length > 20 ? 'w-[80%]' : ''"
      >
        {{ title }}
        <span
          v-if="title.length > 20"
          class="hidden group-hover:block absolute top-full left-0 p-1 bg-white border border-gray-200 shadow-lg whitespace-nowrap z-50 rounded"
        >
          {{ title }}
        </span>
      </div>
      <div
        v-else
        class="border-l-3 border-[#ed741d] pl-2 text-[18px] font-bold tracking-wider truncate"
      >
        {{ title }}
      </div>

      <!-- Switch -->
      <div v-if="switchBtn" class="ml-[15px]">
        <CompSwitch v-model="switchValue" @update:model-value="switchChange" />
      </div>

      <!-- Connection Status -->
      <span
        v-if="connect !== 2"
        class="ml-[10px] px-1.5 py-[3px] text-sm text-white rounded"
        :style="{ backgroundColor: connectStyle.backgroundColor }"
      >
        {{ connectValue }}
      </span>
    </div>

    <!-- Buttons Section -->
    <div :class="device_type === 'EG628' ? 'flex gap-2' : 'flex gap-2'">
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

      <CompBaseButton v-if="addBtn" size="sm" class="rounded-none! h-8 min-w-[100px]" @click="add">
        {{ $t('button.add') }}
      </CompBaseButton>

      <CompBaseButton
        v-if="editBtn"
        size="sm"
        class="rounded-none! h-8 min-w-[100px]"
        :type="device_type === 'EG628' ? 'danger' : 'warning'"
        @click="editchange(edi)"
      >
        {{ edi }}
      </CompBaseButton>

      <CompBaseButton
        v-if="applyBtn"
        size="sm"
        class="rounded-none! h-8 min-w-[100px]"
        :type="device_type === 'EG628' ? 'danger' : 'warning'"
        @click="apply"
      >
        {{ $t('button.apply') }}
      </CompBaseButton>

      <CompBaseButton
        v-if="importBtn"
        size="sm"
        class="rounded-none! h-8 min-w-[100px]"
        :type="device_type === 'EG628' ? 'danger' : 'warning'"
        @click="import_function"
      >
        {{ $t('button.import') }}
      </CompBaseButton>

      <CompBaseButton
        v-if="exportBtn"
        size="sm"
        class="rounded-none! h-8 min-w-[100px]"
        :type="device_type === 'EG628' ? 'danger' : 'warning'"
        @click="export_function"
      >
        {{ $t('button.export') }}
      </CompBaseButton>

      <CompBaseButton
        v-if="delBtn"
        size="sm"
        type="danger"
        :loading="delLoading"
        class="rounded-none! h-8 min-w-[100px]"
        @click="delet"
      >
        {{ $t('button.delete') }}
      </CompBaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompTitle',
  props: {
    string_1: { type: String, default: '' },
    string_2: { type: String, default: '' },
    string_3: { type: String, default: '' },
    string_4: { type: String, default: '' },
    popoverRight: { type: String, default: '960px' },
    delLoading: { type: Boolean, default: false },
    title: { type: String, default: '基础信息' },
    connect: { type: Number, default: 2 },
    switchBtn: { type: Boolean, default: false },
    switchDefault: { type: Boolean, default: false },
    delBtn: { type: Boolean, default: false },
    editBtn: { type: Boolean, default: false },
    addBtn: { type: Boolean, default: false },
    popover: { type: Boolean, default: false },
    applyBtn: { type: Boolean, default: false },
    exportBtn: { type: Boolean, default: false },
    importBtn: { type: Boolean, default: false },
  },
  data() {
    return {
      device_type: '',
      switchValue: false,
    }
  },
  computed: {
    edi() {
      return this.$t('button.edit')
    },
    connectValue() {
      if (this.connect == 1) return this.$t('common.connected')
      if (this.connect == 0) return this.$t('common.disconnected')
      return ''
    },
    connectStyle() {
      return {
        backgroundColor: this.connect == 1 ? '#1ebf8a' : '#fc011a',
      }
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
  mounted() {
    this.get_language()
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
    get_language() {
      this.device_type = 'M300'
    },
  },
}
</script>

<style scoped>
/* 按钮颜色适配逻辑已在 template 中通过 type 处理 */
.border-l-3 {
  border-left-width: 3px;
}
</style>
