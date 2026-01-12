<template>
  <CompPageLayout class="ViewEdgeSnmpd">
    <!-- 页面标题 -->
    <CompPageHeader :title="$t('edge.snmpd.title')" :description="$t('edge.snmpd.description')" />

    <!-- SNMP开关配置 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.snmpd.snmpSwitchConfig') }}
        </h2>
      </div>
      <CompForm
        ref="switchForm"
        v-model="switchData"
        :form-items="switchItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 用户配置 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.snmpd.userConfig') }}
        </h2>
      </div>
      <CompForm
        ref="userForm"
        v-model="userData"
        :form-items="userItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 系统信息 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.snmpd.systemInfo') }}
        </h2>
      </div>
      <CompForm
        ref="systemForm"
        v-model="systemData"
        :form-items="systemItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 操作按钮 -->
    <CompCard>
      <div class="flex justify-center gap-4">
        <CompBaseButton variant="primary" @click="submitForm">
          {{ $t('common.apply') }}
        </CompBaseButton>
        <CompBaseButton variant="secondary" @click="resetForm">
          {{ $t('common.save') }}
        </CompBaseButton>
      </div>
    </CompCard>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: SNMPD Configuration View
 * @author: Antigravity
 */
export default {
  name: 'ViewEdgeSnmpd',
  components: {},
  data() {
    return {
      labelWidth: '150px',

      // Switch Config
      switchData: {
        snmpSwitch: [],
      },
      switchItems: [
        {
          type: 'checkbox',
          key: 'snmpSwitch',
          label: this.$t('edge.snmpd.snmpSwitch'),
          options: [
            {
              label: '',
              value: 'enabled',
            },
          ],
        },
      ],

      // User Config
      userData: {
        username: 'user',
        authType: 'auth',
        authMode: 'SHA',
        authPassword: '',
      },
      userItems: [
        {
          type: 'input',
          key: 'username',
          label: this.$t('edge.snmpd.username'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
        {
          type: 'select',
          key: 'authType',
          label: this.$t('edge.snmpd.authType'),
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '400px',
          options: [
            { label: this.$t('edge.snmpd.auth'), value: 'auth' },
            { label: this.$t('edge.snmpd.noAuth'), value: 'noAuth' },
          ],
        },
        {
          type: 'select',
          key: 'authMode',
          label: this.$t('edge.snmpd.authMode'),
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '400px',
          options: [
            { label: 'SHA', value: 'SHA' },
            { label: 'MD5', value: 'MD5' },
          ],
        },
        {
          type: 'input', // Should be password type ideally, but simple input for now based on image
          inputType: 'password', // If CompForm supports this
          key: 'authPassword',
          label: this.$t('edge.snmpd.authPassword'),
          placeholder: this.$t('edge.common.pleaseEnter'), // Or specific placeholder if needed
          width: '400px',
        },
      ],

      // System Info
      systemData: {
        systemLocation: 'JiNan',
        systemContact: 'www.usr.cn',
        systemName: 'Smart_Router',
      },
      systemItems: [
        {
          type: 'input',
          key: 'systemLocation',
          label: this.$t('edge.snmpd.systemLocation'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
        {
          type: 'input',
          key: 'systemContact',
          label: this.$t('edge.snmpd.systemContact'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
        {
          type: 'input',
          key: 'systemName',
          label: this.$t('edge.snmpd.systemName'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
      ],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      console.log('Loading SNMPD data...')
    },
    async submitForm() {
      // Validate all forms
      const validations = await Promise.all([
        this.$refs.switchForm.validate(),
        this.$refs.userForm.validate(),
        this.$refs.systemForm.validate(),
      ])

      const allValid = validations.every((v) => v)

      if (allValid) {
        const formData = {
          ...this.switchData,
          ...this.userData,
          ...this.systemData,
        }
        console.log('Submitting form:', formData)
        this.$toast.success(this.$t('edge.common.applySuccessfully'))
      } else {
        this.$toast.error(this.$t('common.validateFailed'))
      }
    },
    resetForm() {
      // The secondary button was "Save" in the image, but I'll treat it as maybe 'reset' or just a log for now?
      // Wait, image said 'Apply' and 'Save'. Usually "Save" means persist, "Apply" means effective immediately.
      // I'll just log "Saved"
      console.log('Saving configuration...')
      this.$toast.success(this.$t('common.success'))
    },
  },
}
</script>

<style scoped></style>
