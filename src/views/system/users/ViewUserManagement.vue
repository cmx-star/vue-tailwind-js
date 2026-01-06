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
          <CompInput
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
          <CompBaseButton @click="handleAction('primary')">
            {{ $t('edge.common.primaryAction') }}
          </CompBaseButton>
          <CompBaseButton type="secondary" @click="handleAction('secondary')">
            {{ $t('edge.common.secondaryAction') }}
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
  name: 'ViewUserManagement',
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
      return this.$t('system.users.title')
    },
    pageDescription() {
      return this.$t('system.users.description')
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
    handleAction(type) {
      const actionName =
        type === 'primary'
          ? this.$t('edge.common.primaryAction')
          : this.$t('edge.common.secondaryAction')
      alert(this.$t('edge.common.clickedMessage') + actionName)
    },
  },
}
</script>
