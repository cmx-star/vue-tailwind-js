<template>
  <CompPageLayout>
    <!-- 页面标题 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ pageTitle }}</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        {{ pageDescription }}
      </p>
    </div>

    <!-- 查询表单 -->
    <CompCard>
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <!-- 左侧:查询表单 + 查询/重置按钮 -->
        <div class="flex-1 flex flex-col md:flex-row md:items-end gap-4">
          <div class="flex-1">
            <CompForm ref="queryFormRef" v-model="queryForm" :form-items="queryFormItems" inline />
          </div>
          <div class="flex gap-2">
            <CompBaseButton @click="handleQuery">{{ $t('common.query') }}</CompBaseButton>
            <CompBaseButton type="secondary" @click="handleReset">{{
              $t('common.reset')
            }}</CompBaseButton>
          </div>
        </div>
        <!-- 右侧:新增按钮 -->
        <div>
          <CompBaseButton @click="handleAdd">{{ $t('common.add') }}</CompBaseButton>
        </div>
      </div>
    </CompCard>

    <!-- 数据表格 -->
    <CompCard>
      <CompDataTable :columns="columns" :data="tableData">
        <template #actions="{ row }">
          <div class="flex gap-2">
            <button
              class="px-3 py-1.5 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              @click="handleDetail(row)"
            >
              {{ $t('common.detail') }}
            </button>
            <button
              class="px-3 py-1.5 text-sm text-white bg-brand rounded-lg hover:bg-brand-strong"
              @click="handleEdit(row)"
            >
              {{ $t('common.edit') }}
            </button>
            <button
              class="px-3 py-1.5 text-sm text-white bg-danger rounded-lg hover:bg-danger/90"
              @click="handleDelete(row)"
            >
              {{ $t('common.delete') }}
            </button>
          </div>
        </template>
      </CompDataTable>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <CompPagination
          v-model="currentPage"
          :total="total"
          :page-size="pageSize"
          @change="handlePageChange"
        />
      </div>
    </CompCard>

    <!-- 新增/编辑 Dialog -->
    <CompDialog v-model="showFormDialog" :title="dialogTitle" width="2xl" @confirm="handleSubmit">
      <CompForm ref="formRef" v-model="formData" :form-items="formItems" />
    </CompDialog>

    <!-- 详情 Dialog -->
    <CompDialog
      v-model="showDetailDialog"
      :title="$t('common.detail')"
      width="lg"
      :show-footer="false"
    >
      <div class="space-y-4">
        <div class="flex">
          <span class="w-24 text-gray-600 dark:text-gray-400">ID:</span>
          <span class="flex-1 text-heading">{{ detailData.id }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-600 dark:text-gray-400"
            >{{ $t('edge.common.taskName') }}:</span
          >
          <span class="flex-1 text-heading">{{ detailData.title }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-600 dark:text-gray-400"
            >{{ $t('edge.common.currentStatus') }}:</span
          >
          <span class="flex-1 text-heading">{{ detailData.status }}</span>
        </div>
      </div>
    </CompDialog>

    <!-- 删除确认 Dialog -->
    <CompDialog
      v-model="showDeleteDialog"
      :title="$t('common.deleteConfirm')"
      width="sm"
      @confirm="confirmDelete"
      @close="cancelDelete"
    >
      <p class="text-body">{{ $t('common.deleteConfirmMessage') }}</p>
    </CompDialog>
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewFirewallSettings',
  data() {
    return {
      // 查询表单
      queryForm: {
        keyword: '',
        status: '',
      },
      // 表格数据
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      // Dialog 状态
      showFormDialog: false,
      showDetailDialog: false,
      showDeleteDialog: false,
      // 表单数据
      formData: {},
      detailData: {},
      editingRow: null,
    }
  },
  computed: {
    pageTitle() {
      return this.$t('network.firewall.title')
    },
    pageDescription() {
      return this.$t('network.firewall.description')
    },
    dialogTitle() {
      return this.editingRow ? this.$t('common.edit') : this.$t('common.add')
    },
    queryFormItems() {
      return [
        {
          key: 'keyword',
          label: this.$t('common.keyword'),
          type: 'input',
          placeholder: this.$t('common.keywordPlaceholder'),
        },
        {
          key: 'status',
          label: this.$t('edge.common.currentStatus'),
          type: 'select',
          placeholder: this.$t('common.selectPlaceholder'),
          options: [
            { label: this.$t('edge.common.inProgress'), value: 'inProgress' },
            { label: this.$t('edge.common.completed'), value: 'completed' },
          ],
        },
      ]
    },
    formItems() {
      return [
        {
          key: 'title',
          label: this.$t('edge.common.taskName'),
          type: 'input',
          placeholder: this.$t('edge.common.placeholder'),
          required: true,
          rules: [
            { required: true, message: this.$t('common.required') },
            { min: 2, max: 50, message: this.$t('common.lengthRange', { min: 2, max: 50 }) },
          ],
        },
        {
          key: 'interfaceName',
          label: this.$t('network.interface.interfaceName'),
          type: 'input',
          placeholder: this.$t('network.interface.interfaceNamePlaceholder'),
          required: true,
          rules: [{ required: true, message: this.$t('common.required') }],
        },
        {
          key: 'ipAddress',
          label: this.$t('network.interface.ipAddress'),
          type: 'input',
          placeholder: this.$t('network.interface.ipAddressPlaceholder'),
        },
        {
          key: 'status',
          label: this.$t('edge.common.currentStatus'),
          type: 'select',
          placeholder: this.$t('common.selectPlaceholder'),
          required: true,
          options: [
            { label: this.$t('edge.common.inProgress'), value: 'inProgress' },
            { label: this.$t('edge.common.completed'), value: 'completed' },
          ],
          rules: [{ required: true, message: this.$t('common.required') }],
        },
        {
          key: 'protocols',
          label: this.$t('network.interface.protocols'),
          type: 'select',
          placeholder: this.$t('network.interface.protocolsPlaceholder'),
          multiple: true,
          options: [
            { label: this.$t('network.interface.http'), value: 'http' },
            { label: this.$t('network.interface.https'), value: 'https' },
            { label: this.$t('network.interface.websocket'), value: 'ws' },
            { label: this.$t('network.interface.grpc'), value: 'grpc' },
          ],
        },
        {
          key: 'deployDate',
          label: this.$t('network.interface.deployDate'),
          type: 'datepicker',
          mode: 'date',
          placeholder: this.$t('network.interface.deployDatePlaceholder'),
        },
        {
          key: 'maintenanceTime',
          label: this.$t('network.interface.maintenanceTime'),
          type: 'datepicker',
          mode: 'time',
          placeholder: this.$t('network.interface.maintenanceTimePlaceholder'),
        },
        {
          key: 'scheduleTime',
          label: this.$t('network.interface.scheduleTime'),
          type: 'datepicker',
          mode: 'dateTime',
          placeholder: this.$t('network.interface.scheduleTimePlaceholder'),
        },
        {
          key: 'networkType',
          label: this.$t('network.interface.networkType'),
          type: 'radio',
          options: [
            { label: this.$t('network.interface.internal'), value: 'internal' },
            { label: this.$t('network.interface.external'), value: 'external' },
          ],
        },
        {
          key: 'features',
          label: this.$t('network.interface.features'),
          type: 'checkbox',
          options: [
            { label: this.$t('network.interface.loadBalance'), value: 'loadBalance' },
            { label: this.$t('network.interface.failover'), value: 'failover' },
            { label: this.$t('network.interface.cache'), value: 'cache' },
            { label: this.$t('network.interface.rateLimit'), value: 'rateLimit' },
          ],
        },
        {
          key: 'autoRestart',
          label: this.$t('network.interface.autoRestart'),
          type: 'switch',
          activeText: this.$t('network.interface.enabled'),
          inactiveText: this.$t('network.interface.disabled'),
        },
        {
          key: 'enableMonitoring',
          label: this.$t('network.interface.enableMonitoring'),
          type: 'switch',
        },
        {
          key: 'description',
          label: this.$t('network.interface.description'),
          type: 'input',
          subType: 'textarea',
          placeholder: this.$t('network.interface.descriptionPlaceholder'),
          hint: this.$t('network.interface.descriptionHint'),
        },
      ]
    },
    columns() {
      return [
        { key: 'id', label: 'ID', width: '80px' },
        { key: 'title', label: this.$t('edge.common.taskName') },
        { key: 'status', label: this.$t('edge.common.currentStatus') },
        { key: 'actions', label: this.$t('common.actions'), width: '240px' },
      ]
    },
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      // 模拟 API 调用
      setTimeout(() => {
        this.tableData = [
          {
            id: 101,
            title: this.$t('edge.common.systemUpgrade'),
            status: this.$t('edge.common.inProgress'),
          },
          {
            id: 102,
            title: this.$t('edge.common.componentAdaptation'),
            status: this.$t('edge.common.completed'),
          },
        ]
        this.total = 2
      }, 300)
    },
    handleQuery() {
      this.currentPage = 1
      this.loadData()
      this.$toast.info(this.$t('common.querySuccess'))
    },
    handleReset() {
      this.$refs.queryFormRef.resetFields()
      this.handleQuery()
    },
    handleAdd() {
      this.editingRow = null
      this.formData = {
        title: '',
        interfaceName: '',
        ipAddress: '',
        status: '',
        protocols: [],
        deployDate: null,
        maintenanceTime: null,
        scheduleTime: null,
        networkType: '',
        features: [],
        autoRestart: false,
        enableMonitoring: false,
        description: '',
      }
      this.showFormDialog = true
    },
    handleEdit(row) {
      this.editingRow = row
      this.formData = { ...row }
      this.showFormDialog = true
    },
    handleDetail(row) {
      this.detailData = { ...row }
      this.showDetailDialog = true
    },
    handleDelete(row) {
      this.editingRow = row
      this.showDeleteDialog = true
    },
    async handleSubmit() {
      const valid = await this.$refs.formRef.validate()
      if (!valid) {
        this.$toast.error(this.$t('common.validateFailed'))
        return
      }

      // 模拟 API 调用
      setTimeout(() => {
        this.$toast.success(
          this.editingRow ? this.$t('common.editSuccess') : this.$t('common.addSuccess'),
        )
        this.showFormDialog = false
        this.loadData()
      }, 300)
    },
    async confirmDelete() {
      // 模拟 API 调用
      setTimeout(() => {
        this.$toast.success(this.$t('common.deleteSuccess'))
        this.showDeleteDialog = false
        this.loadData()
      }, 300)
    },
    cancelDelete() {
      this.$toast.info(this.$t('common.deleteCanceled'))
    },
    handlePageChange(_page) {
      this.loadData()
    },
  },
}
</script>
