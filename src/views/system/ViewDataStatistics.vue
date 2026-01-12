<template>
  <CompPageLayout class="ViewDataStatistics">
    <!-- 页面标题 -->
    <CompPageHeader
      :title="$t('nav.dataStatistics')"
      :description="$t('system.statistics.description')"
    />

    <!-- 第一部分：概览信息 (CompBasicInformation) -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('system.statistics.summary')" add-btn @addthing="openDialog" />
      <CompBasicInformation :data-list="summaryData" :columns="4" />
    </CompCard>

    <!-- 第二部分：标签页切换 (CompCardTabs) -->
    <CompCardTabs v-model="activeTab" :tabs="tabs" class="mb-6">
      <!-- Tab 1: 数据表格展示 (CompDataTable + CompPagination) -->
      <template #table>
        <div class="space-y-6">
          <div class="space-y-4">
            <CompTitle
              :title="$t('system.statistics.arpTable')"
              apply-btn
              @applything="handleApply"
            />
            <CompDataTable :data="pagedArpData" :columns="arpColumns" :loading="loading" />
            <div class="flex justify-end mt-4">
              <CompPagination
                v-model="currentPage"
                :total="arpTableData.length"
                :page-size="pageSize"
                @change="handlePageChange"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Tab 2: 万能表单校验 (CompForm + All form components) -->
      <template #form>
        <div class="p-4">
          <CompTitle :title="$t('formDemo.allFields')" export-btn @exportthing="handleExport" />
          <CompForm
            ref="showcaseForm"
            v-model="formData"
            :form-items="formItems"
            :columns="2"
            class="mt-6"
          />
          <div
            class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800"
          >
            <CompBaseButton type="secondary" @click="resetForm">
              {{ $t('formDemo.resetButton') }}
            </CompBaseButton>
            <CompBaseButton type="primary" :loading="submitting" @click="submitForm">
              {{ $t('formDemo.validateButton') }}
            </CompBaseButton>
          </div>
        </div>
      </template>
    </CompCardTabs>

    <!-- 弹窗展示 (CompDialog) -->
    <CompDialog
      v-model="dialogVisible"
      :title="$t('system.statistics.dialogTitle')"
      @confirm="handleDialogConfirm"
    >
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('system.statistics.dialogContent') }}
        </p>
        <CompInput v-model="dialogInput" :placeholder="$t('system.statistics.placeholder.input')" />
      </div>
    </CompDialog>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: 数据统计与组件全能展示页
 * @author: Antigravity
 */

export default {
  name: 'ViewDataStatistics',
  data() {
    return {
      activeTab: 'table',
      loading: false,
      submitting: false,
      dialogVisible: false,
      dialogInput: '',
      currentPage: 1,
      pageSize: 5,

      // 表格数据
      arpTableData: Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        ipAddress: `192.168.1.${100 + i}`,
        macAddress: `00:E0:4C:68:01:${i.toString(16).padStart(2, '0')}`,
        port: i % 2 === 0 ? 'eth0' : 'wlan0',
      })),

      // 表单数据 (CompForm)
      formData: {
        username: '',
        userType: 'personal',
        technologies: ['vue3'],
        status: true,
        birthday: null,
        level: 2,
        region: [],
        remark: '',
      },
    }
  },
  computed: {
    tabs() {
      return [
        { label: this.$t('system.statistics.tabs.table'), value: 'table' },
        { label: this.$t('system.statistics.tabs.form'), value: 'form' },
      ]
    },
    // 概览数据 (CompBasicInformation)
    summaryData() {
      return [
        { label: this.$t('system.statistics.arpCount'), value: '1,284', key: 'arpCount' },
        { label: this.$t('system.statistics.connCount'), value: '456', key: 'connCount' },
        { label: this.$t('system.statistics.upFlow'), value: '1.2 GB', key: 'tx' },
        { label: this.$t('system.statistics.downFlow'), value: '8.5 GB', key: 'rx' },
      ]
    },
    arpColumns() {
      return [
        { label: this.$t('system.statistics.ipAddress'), key: 'ipAddress' },
        { label: this.$t('system.statistics.macAddress'), key: 'macAddress' },
        { label: this.$t('system.statistics.port'), key: 'port' },
      ]
    },
    formItems() {
      return [
        {
          key: 'username',
          label: this.$t('formDemo.fields.username'),
          type: 'input',
          required: true,
          placeholder: this.$t('formDemo.placeholders.username'),
          tip: this.$t('formDemo.tips.cascader'), // 借用提示
          rules: [{ required: true, message: this.$t('formDemo.validation.usernameRequired') }],
        },
        {
          key: 'userType',
          label: this.$t('formDemo.fields.userType'),
          type: 'radio',
          options: [
            { label: this.$t('formDemo.options.personal'), value: 'personal' },
            { label: this.$t('formDemo.options.company'), value: 'company', disabled: true },
            { label: this.$t('formDemo.options.option3'), value: 'government' },
          ],
        },
        {
          key: 'technologies',
          label: this.$t('formDemo.subtitle'), // 换个标签演示
          type: 'checkbox',
          options: [
            { label: 'Vue 3', value: 'vue3' },
            { label: 'React', value: 'react' },
            { label: 'Tailwind', value: 'tailwind' },
            { label: 'Tauri', value: 'tauri' },
          ],
        },
        {
          key: 'status',
          label: this.$t('formDemo.fields.status'),
          type: 'switch',
          activeText: this.$t('formDemo.options.on'),
          inactiveText: this.$t('formDemo.options.off'),
        },
        {
          key: 'level',
          label: this.$t('formDemo.fields.groupSelect'),
          type: 'select',
          options: [
            { label: this.$t('formDemo.options.option1'), value: 1 },
            { label: this.$t('formDemo.options.option2'), value: 2 },
            { label: this.$t('formDemo.options.option3'), value: 3 },
          ],
          placeholder: this.$t('formDemo.placeholders.select'),
        },
        {
          key: 'birthday',
          label: this.$t('formDemo.fields.datepicker'),
          type: 'datepicker',
          mode: 'date',
          placeholder: this.$t('formDemo.placeholders.datepicker'),
        },
        {
          key: 'region',
          label: this.$t('formDemo.fields.cascader'),
          type: 'cascader',
          placeholder: this.$t('formDemo.placeholders.cascader'),
          options: [
            {
              value: 'zhejiang',
              label: this.$t('formDemo.options.zhejiang'),
              children: [
                { value: 'hangzhou', label: this.$t('formDemo.options.hangzhou') },
                { value: 'ningbo', label: this.$t('formDemo.options.ningbo') },
              ],
            },
            {
              value: 'jiangsu',
              label: this.$t('formDemo.options.jiangsu'),
              children: [
                { value: 'nanjing', label: this.$t('formDemo.options.nanjing') },
                { value: 'suzhou', label: this.$t('formDemo.options.suzhou') },
              ],
            },
          ],
        },
        {
          key: 'remark',
          label: this.$t('formDemo.fields.description'),
          type: 'input',
          subType: 'textarea',
          placeholder: this.$t('formDemo.placeholders.description'),
        },
      ]
    },
    // 处理分页后的数据
    pagedArpData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.arpTableData.slice(start, end)
    },
  },
  methods: {
    // Tab 1 操作
    handlePageChange(page) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$toast.info(this.$t('system.statistics.messages.pageSwitched', { page }))
      }, 300)
    },
    handleApply() {
      this.$toast.success(this.$t('system.statistics.messages.applied'))
    },

    // Tab 2 操作 (表单)
    async submitForm() {
      this.submitting = true
      const isValid = await this.$refs.showcaseForm.validate()
      this.submitting = false
      if (isValid) {
        this.$toast.success(this.$t('system.statistics.messages.validateSuccess'))
        console.log('Form Data:', this.formData)
      } else {
        this.$toast.error(this.$t('system.statistics.messages.validateFailed'))
      }
    },
    resetForm() {
      this.$refs.showcaseForm.resetFields()
      this.$toast.info(this.$t('system.statistics.messages.reset'))
    },
    handleExport() {
      this.$toast.info(this.$t('system.statistics.messages.exporting'))
    },

    // 弹窗操作
    openDialog() {
      this.dialogVisible = true
    },
    handleDialogConfirm() {
      if (this.dialogInput) {
        this.$toast.success(
          this.$t('system.statistics.messages.addSuccess', { val: this.dialogInput }),
        )
        this.dialogInput = ''
      } else {
        this.$toast.info(this.$t('system.statistics.messages.noInput'))
      }
    },
  },
}
</script>

<style scoped>
.ViewDataStatistics :deep(.tabsPan) {
  background-color: transparent;
}
</style>
