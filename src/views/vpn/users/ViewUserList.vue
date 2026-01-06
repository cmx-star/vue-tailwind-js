<template>
  <div class="p-6 space-y-6">
    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ pageTitle }}</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">{{ pageDescription }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('edge.common.inputExample') }}
        </h2>
        <div class="space-y-4">
          <CompBaseInput
            v-model="formData.name"
            :label="$t('edge.common.name')"
            :placeholder="$t('edge.common.placeholder')"
          />
          <CompSelect
            v-model="formData.type"
            :label="$t('edge.common.type')"
            :options="typeOptions"
          />
          <CompDatePicker v-model="formData.date" :label="$t('edge.common.timeSelect')" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('edge.common.interactionExample') }}
        </h2>
        <div class="flex flex-wrap gap-3">
          <CompBaseButton type="success" @click="showToast('success')">
            {{ $t('vpn.users.successToast') }}
          </CompBaseButton>
          <CompBaseButton type="warning" @click="showToast('warning')">
            {{ $t('vpn.users.warningToast') }}
          </CompBaseButton>
          <CompBaseButton type="danger" @click="showToast('error')">
            {{ $t('vpn.users.errorToast') }}
          </CompBaseButton>
          <CompBaseButton type="secondary" @click="showToast('info')">
            {{ $t('vpn.users.infoToast') }}
          </CompBaseButton>
          <CompBaseButton type="danger" @click="showToast('danger')">
            {{ $t('vpn.users.dangerToast') }}
          </CompBaseButton>
        </div>
      </div>
    </div>

    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {{ $t('edge.common.listDisplay') }}
      </h2>
      <CompDataTable :columns="columns" :data="tableData" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewUserList',
  data() {
    return {
      formData: {
        name: '',
        type: '',
        date: null,
      },
      tableData: [
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
      ],
    }
  },
  computed: {
    pageTitle() {
      return this.$t('vpn.users.title')
    },
    pageDescription() {
      return this.$t('vpn.users.description')
    },
    typeOptions() {
      return [
        { label: this.$t('edge.common.basicBusiness'), value: 'basic' },
        { label: this.$t('edge.common.coreBusiness'), value: 'core' },
      ]
    },
    columns() {
      return [
        { key: 'id', title: 'ID', width: '80px' },
        { key: 'title', title: this.$t('edge.common.taskName') },
        { key: 'status', title: this.$t('edge.common.currentStatus') },
      ]
    },
  },
  methods: {
    showToast(type) {
      const { success, warning, error, info, danger } = this.$toast

      switch (type) {
        case 'success':
          success(this.$t('vpn.users.successMessage'))
          break
        case 'warning':
          warning(this.$t('vpn.users.warningMessage'))
          break
        case 'error':
          error(this.$t('vpn.users.errorMessage'))
          break
        case 'info':
          info(this.$t('vpn.users.infoMessage'))
          break
        case 'danger':
          danger(this.$t('vpn.users.dangerMessage'))
          break
      }
    },
  },
}
</script>
