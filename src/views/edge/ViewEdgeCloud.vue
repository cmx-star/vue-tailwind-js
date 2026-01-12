<template>
  <CompPageLayout class="ViewEdgeCloud">
    <!-- 页面标题 -->
    <CompPageHeader :title="$t('edge.cloud.title')" :description="$t('edge.cloud.description')" />

    <!-- 有人云 -->
    <CompCard class="mb-6">
      <CompSectionHeader :title="$t('edge.cloud.usrCloud')" />
      <CompForm
        ref="cloudForm"
        v-model="cloudData"
        :form-items="cloudItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 配置 -->
    <CompCard class="mb-6">
      <CompSectionHeader :title="$t('edge.cloud.config')" />
      <CompForm
        ref="configForm"
        v-model="configData"
        :form-items="configItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- UDP配置 -->
    <CompCard class="mb-6">
      <CompSectionHeader :title="$t('edge.cloud.udpConfig')" />
      <CompForm ref="udpForm" v-model="udpData" :form-items="udpItems" :label-width="labelWidth" />
    </CompCard>

    <!-- 私有化部署 -->
    <CompCard class="mb-6">
      <CompSectionHeader :title="$t('edge.cloud.privateDeployment')" />
      <CompForm
        ref="privateForm"
        v-model="privateData"
        :form-items="privateItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 自定义ping检查地址 -->
    <CompCard class="mb-6">
      <CompSectionHeader :title="$t('edge.cloud.customPing')" />
      <CompForm
        ref="pingForm"
        v-model="pingData"
        :form-items="pingItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 操作按钮 -->
    <CompCard>
      <CompActionButtons
        :secondary-text="$t('common.save')"
        @primary="submitForm"
        @secondary="saveForm"
      />
    </CompCard>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: ViewEdgeCloud - USR Cloud Service Configuration
 * @author: Antigravity
 */
export default {
  name: 'ViewEdgeCloud',
  components: {},
  data() {
    return {
      labelWidth: '220px',

      // 有人云
      cloudData: {
        enable: [], // Checkbox uses array
      },
      cloudItems: [
        {
          type: 'checkbox',
          key: 'enable',
          label: this.$t('edge.cloud.enable'), // Should ideally be label key for the row, but here enable acts as checkbox label
          // Based on image '总用' (Enable) is the label for the row, checkbox is checked.
          // Wait, image shows: "启用" (Enable) followed by a checkbox.
          // Actually, '启用' is usually the label.
          options: [
            {
              label: '', // No label next to checkbox? Or maybe '启用' is the option label?
              value: 'enabled',
            },
          ],
        },
      ],

      // 配置
      configData: {
        trafficRecordTime: 10,
        trafficReportTime: 30,
        networkRecordTime: 5,
        networkReportTime: 20,
        heartbeatTime: '30',
      },
      configItems: [
        {
          type: 'input', // Assuming number input is text input with type number
          inputType: 'number',
          key: 'trafficRecordTime',
          label: this.$t('edge.cloud.trafficRecordTime'),
          width: '300px',
          tip: '设置时长不可大于12小时', // Hardcoded from image or need translation? I'll use raw string or add if critical.
          // Let's stick to translation key if possible, or raw if lazy. I'll add a tip if needed.
        },
        {
          type: 'input',
          inputType: 'number',
          key: 'trafficReportTime',
          label: this.$t('edge.cloud.trafficReportTime'),
          width: '300px',
        },
        {
          type: 'input',
          inputType: 'number',
          key: 'networkRecordTime',
          label: this.$t('edge.cloud.networkRecordTime'),
          width: '300px',
        },
        {
          type: 'input',
          inputType: 'number',
          key: 'networkReportTime',
          label: this.$t('edge.cloud.networkReportTime'),
          width: '300px',
        },
        {
          type: 'select',
          key: 'heartbeatTime',
          label: this.$t('edge.cloud.heartbeatTime'),
          width: '300px',
          options: [
            { label: '30', value: '30' },
            { label: '60', value: '60' },
          ],
        },
      ],

      // UDP配置
      udpData: {
        udpHeartbeatPeriod: '20s',
      },
      udpItems: [
        {
          type: 'select',
          key: 'udpHeartbeatPeriod',
          label: this.$t('edge.cloud.udpHeartbeatPeriod'),
          width: '300px',
          options: [
            { label: '20s', value: '20s' },
            { label: '30s', value: '30s' },
          ],
        },
      ],

      // 私有化部署
      privateData: {
        enablePrivate: [],
      },
      privateItems: [
        {
          type: 'checkbox',
          key: 'enablePrivate',
          label: this.$t('edge.cloud.enablePrivate'),
          options: [
            {
              label: '',
              value: 'enabled',
            },
          ],
        },
      ],

      // 自定义ping
      pingData: {
        pingAddress: 'Default',
      },
      pingItems: [
        {
          type: 'select',
          key: 'pingAddress',
          label: this.$t('edge.cloud.pingAddress'),
          width: '300px',
          options: [
            { label: this.$t('edge.cloud.default'), value: 'Default' },
            { label: '8.8.8.8', value: '8.8.8.8' },
          ],
        },
      ],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      console.log('Loading Cloud Service data...')
    },
    async submitForm() {
      const validations = await Promise.all([
        this.$refs.cloudForm.validate(),
        this.$refs.configForm.validate(),
        this.$refs.udpForm.validate(),
        this.$refs.privateForm.validate(),
        this.$refs.pingForm.validate(),
      ])

      const allValid = validations.every((v) => v)

      if (allValid) {
        const formData = {
          ...this.cloudData,
          ...this.configData,
          ...this.udpData,
          ...this.privateData,
          ...this.pingData,
        }
        console.log('Submitting Cloud Service form:', formData)
        this.$toast.success(this.$t('edge.common.applySuccessfully'))
      } else {
        this.$toast.error(this.$t('common.validateFailed'))
      }
    },
    saveForm() {
      console.log('Saving Cloud Service configuration...')
      this.$toast.success(this.$t('common.save'))
    },
  },
}
</script>

<style scoped></style>
