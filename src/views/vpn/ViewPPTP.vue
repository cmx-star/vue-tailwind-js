<template>
  <CompPageLayout class="ViewPPTPSettings">
    <!-- 页面标题 -->
    <CompPageHeader :title="$t('nav.pptp')" :description="$t('vpn.pptp.description')" />

    <!-- PPTP 服务器 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('vpn.pptp.serverTitle') }}
        </h2>
      </div>
      <CompForm
        ref="pptpForm"
        v-model="formData"
        :form-items="formItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 操作按钮 -->
    <CompCard>
      <div class="flex justify-center gap-4">
        <CompBaseButton variant="primary" @click="submitForm">
          {{ $t('button.apply') }}
        </CompBaseButton>
        <CompBaseButton variant="secondary" @click="resetForm">
          {{ $t('common.reset') }}
        </CompBaseButton>
      </div>
    </CompCard>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: PPTP 设置 - PPTP 服务器配置
 * @author: Antigravity
 */

export default {
  name: 'ViewPPTPSettings',
  components: {},
  data() {
    return {
      labelWidth: '150px',

      // 表单数据
      formData: {
        serverName: 'PPTP 服务器',
        status: '启用',
        remarks: '默认',
      },

      formItems: [
        {
          type: 'input',
          key: 'serverName',
          label: this.$t('vpn.pptp.serverName'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
        {
          type: 'select',
          key: 'status',
          label: this.$t('vpn.pptp.status'),
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '400px',
          options: [
            { label: this.$t('vpn.pptp.enabled'), value: '启用' },
            { label: this.$t('vpn.pptp.disabled'), value: '禁用' },
          ],
        },
        {
          type: 'input',
          key: 'remarks',
          label: this.$t('vpn.pptp.remarks'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      console.log('加载 PPTP 设置数据')
    },

    async submitForm() {
      const valid = await this.$refs.pptpForm.validate()
      if (valid) {
        console.log('提交表单数据:', this.formData)
        this.$toast.success(this.$t('edge.common.applySuccessfully'))
      } else {
        this.$toast.error(this.$t('common.validateFailed'))
      }
    },

    resetForm() {
      this.$refs.pptpForm.resetFields()
      this.$toast.info(this.$t('formDemo.messages.resetSuccess'))
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
