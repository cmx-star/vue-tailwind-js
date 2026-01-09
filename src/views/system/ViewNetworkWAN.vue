<template>
  <div class="ViewLogManagement">
    <CompCardTabs :router-view-card="true">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 px-4">
        {{ $t('vpn.networkWAN.title') }}
      </h2>

      <!-- 运行状态 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 mx-4 shadow-sm border border-gray-100 dark:border-gray-700/50"
      >
        <CompTitle
          :title="$t('vpn.networkWAN.statusTitle')"
          :connect="wanConnectFlag ? 1 : 0"
          class="mb-4"
        />
        <CompBasicInformation :data-list="statusData" :columns="3" />
      </div>

      <!-- 属性配置 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 mx-4 shadow-sm border border-gray-100 dark:border-gray-700/50"
      >
        <CompTitle :title="$t('vpn.networkWAN.configTitle')" class="mb-4" />
        <div class="max-w-4xl mx-auto py-4">
          <CompForm
            ref="configFormRef"
            v-model="wanFormData"
            :form-items="formItems"
            :columns="2"
            label-width="150px"
          />

          <div
            class="mt-10 flex justify-center border-t border-gray-100 dark:border-gray-700/50 pt-8"
          >
            <CompBaseButton
              size="lg"
              :loading="btnLoading"
              :disabled="isUnchanged"
              :type="buttonType"
              class="w-48 shadow-lg transition-all active:scale-95"
              @click="handleSubmit"
            >
              {{ $t('common.submit') }}
            </CompBaseButton>
          </div>
        </div>
      </div>
    </CompCardTabs>
  </div>
</template>

<script>
import { formatDtDHS, setData, netmaskCheck, wanParams } from '@/utils/network'
import { validators } from '@/utils/validators'

export default {
  name: 'ViewLogManagement',
  data() {
    return {
      wanConnectFlag: false,
      statusData: [],
      btnLoading: false,
      isUnchanged: true,
      initialFormData: null,
      deviceType: '', // EG628 or others
      wanFormData: {
        proto: 'dhcp',
        dns_mode: 'auto',
        ip: '',
        netmask: '',
        gw: '',
        dns1: '',
        dns2: '',
        mtu: 1500,
      },
    }
  },
  computed: {
    buttonType() {
      // 模拟原有的 device_type 逻辑
      if (this.isUnchanged) return 'secondary'
      return this.deviceType === 'EG628' ? 'danger' : 'primary'
    },
    formItems() {
      return [
        {
          key: 'proto',
          label: this.$t('vpn.networkWAN.fields.proto'),
          type: 'select',
          options: [
            { label: this.$t('vpn.networkWAN.options.dhcp'), value: 'dhcp' },
            { label: this.$t('vpn.networkWAN.options.static'), value: 'static' },
          ],
          required: true,
        },
        {
          key: 'mtu',
          label: this.$t('vpn.networkWAN.fields.mtu'),
          type: 'input',
          subType: 'number',
          placeholder: '128-1500',
          required: true,
          rules: [
            validators.required(this.$t('common.validation.required')),
            validators.range(128, 1500, 'MTU: 128~1500'),
          ],
        },
        {
          key: 'ip',
          label: this.$t('vpn.networkWAN.fields.ip'),
          type: 'input',
          show: (form) => form.proto === 'static',
          required: true,
          rules: [
            validators.required(this.$t('common.validation.required')),
            validators.ip(this.$t('common.validation.ip')),
          ],
        },
        {
          key: 'netmask',
          label: this.$t('vpn.networkWAN.fields.netmask'),
          type: 'input',
          show: (form) => form.proto === 'static',
          required: true,
          rules: [
            validators.required(this.$t('common.validation.required')),
            validators.custom((val) => netmaskCheck(val), this.$t('common.validation.pattern')),
          ],
        },
        {
          key: 'gw',
          label: this.$t('vpn.networkWAN.fields.gw'),
          type: 'input',
          show: (form) => form.proto === 'static',
          required: true,
          rules: [
            validators.required(this.$t('common.validation.required')),
            validators.ip(this.$t('common.validation.ip')),
          ],
        },
        {
          key: 'dns_mode',
          label: this.$t('vpn.networkWAN.fields.dnsMode'),
          type: 'select',
          options: (form) => {
            const options = [{ label: this.$t('vpn.networkWAN.options.manual'), value: 'custom' }]
            if (form.proto === 'dhcp') {
              options.unshift({ label: this.$t('vpn.networkWAN.options.auto'), value: 'auto' })
            }
            return options
          },
          // 逻辑适配：当切换到 static 时，dns_mode 只能是 custom
          required: true,
        },
        {
          key: 'dns1',
          label: this.$t('vpn.networkWAN.fields.dns1'),
          type: 'input',
          show: (form) =>
            form.proto === 'static' || (form.proto === 'dhcp' && form.dns_mode === 'custom'),
          required: true,
          rules: [
            validators.required(this.$t('common.validation.required')),
            validators.ip(this.$t('common.validation.ip')),
          ],
        },
        {
          key: 'dns2',
          label: this.$t('vpn.networkWAN.fields.dns2'),
          type: 'input',
          show: (form) =>
            form.proto === 'static' || (form.proto === 'dhcp' && form.dns_mode === 'custom'),
          required: true,
          rules: [
            validators.required(this.$t('common.validation.required')),
            validators.ip(this.$t('common.validation.ip')),
          ],
        },
      ]
    },
  },
  watch: {
    'wanFormData.proto'(newVal) {
      if (newVal === 'static') {
        this.wanFormData.dns_mode = 'custom'
      }
    },
    wanFormData: {
      handler(val) {
        if (!this.initialFormData) return
        this.isUnchanged = JSON.stringify(val) === JSON.stringify(this.initialFormData)
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchConfig()
    this.get_language()
    this.startPolling()
  },
  beforeUnmount() {
    this.stopPolling()
  },
  methods: {
    formatDtDHS,
    async get_language() {
      // 本地模拟
      this.deviceType = 'M300'
    },
    async fetchConfig() {
      // 本地模拟 ethwanGetConfig
      const mockData = {
        proto: 'dhcp',
        dns_mode: 'auto',
        ip: '192.168.1.100',
        netmask: '255.255.255.0',
        gw: '192.168.1.1',
        dns1: '8.8.8.8',
        dns2: '8.8.4.4',
        mtu: 1500,
      }
      this.wanFormData = { ...mockData }
      this.initialFormData = JSON.parse(JSON.stringify(mockData))
      this.isUnchanged = true
    },
    async fetchStatus() {
      // 本地模拟 ethwanGetInfo
      const mockStatus = {
        alive: 1,
        proto: this.wanFormData.proto,
        ip: this.wanFormData.ip || '192.168.1.100',
        netmask: this.wanFormData.netmask || '255.255.255.0',
        gw: this.wanFormData.gw || '192.168.1.1',
        dns: `${this.wanFormData.dns1}${this.wanFormData.dns2 ? ', ' + this.wanFormData.dns2 : ''}`,
        mac: '00:11:22:33:44:55',
        rx: '1.2 GB',
        tx: '450 MB',
        uptime: 3600,
      }
      this.wanConnectFlag = mockStatus.alive === 1
      this.statusData = setData(mockStatus, wanParams).map((item) => ({
        ...item,
        label: this.$t(`vpn.networkWAN.status.${item.key}`),
      }))
    },
    handleSubmit() {
      this.$refs.configFormRef.validate().then(async (valid) => {
        if (!valid) {
          this.$toast.error(this.$t('common.validateFailed'))
          return
        }

        this.btnLoading = true
        // 模拟提交成功
        setTimeout(() => {
          this.$toast.success(this.$t('common.success'))
          this.initialFormData = JSON.parse(JSON.stringify(this.wanFormData))
          this.isUnchanged = true
          this.btnLoading = false
        }, 800)
      })
    },
    startPolling() {
      this.fetchStatus()
      this.timer = setInterval(this.fetchStatus, 5000)
    },
    stopPolling() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
  },
}
</script>

<style scoped>
.ViewLogManagement {
  padding-bottom: 20px;
}
</style>
