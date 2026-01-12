<template>
  <CompPageLayout class="ViewIomanagement">
    <!-- 页面标题 -->
    <CompPageHeader :title="$t('nav.ioManagement')" :description="$t('edge.io.description')" />

    <!-- 接入点 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.io.accessPoint') }}
        </h2>
      </div>
      <CompForm
        ref="accessPointForm"
        v-model="accessPointData"
        :form-items="accessPointItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 配置 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.io.configuration') }}
        </h2>
      </div>
      <CompForm
        ref="configForm"
        v-model="configData"
        :form-items="configItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- UDPv6配置 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.io.udpv6Config') }}
        </h2>
      </div>
      <CompForm
        ref="udpv6Form"
        v-model="udpv6Data"
        :form-items="udpv6Items"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 私有空间分配 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.io.privateSpaceAllocation') }}
        </h2>
      </div>
      <CompForm
        ref="privateSpaceForm"
        v-model="privateSpaceData"
        :form-items="privateSpaceItems"
        :label-width="labelWidth"
      />
    </CompCard>

    <!-- 目录文件的权限设置 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.io.permissionSettings') }}
        </h2>
      </div>
      <CompForm
        ref="permissionForm"
        v-model="permissionData"
        :form-items="permissionItems"
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
 * @desc: 接入选路 - 网络接入选路配置
 * @author: Antigravity
 * 1. 保持template、script、style这个顺序
 * 2. 保持template最外层元素的 class 与组件名称一致
 */

export default {
  // 组件名称
  name: 'ViewIomanagement',
  // 子组件
  components: {},
  // 动态属性
  data() {
    return {
      labelWidth: '200px',

      // 接入点数据
      accessPointData: {
        time: '',
        ip: '',
      },
      accessPointItems: [
        {
          type: 'input',
          key: 'time',
          label: this.$t('edge.io.time'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
        {
          type: 'input',
          key: 'ip',
          label: this.$t('edge.io.ipAddress'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
        },
      ],

      // 配置数据
      configData: {
        srcAddressPrefix: '',
        srcPortPrefix: '',
        networkProtocol: '',
        dstPortPrefix: '',
        upperProtocol: '70',
      },
      configItems: [
        {
          type: 'input',
          key: 'srcAddressPrefix',
          label: this.$t('edge.io.srcAddressPrefix'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
          tip: this.$t('edge.io.srcAddressPrefixTip'),
        },
        {
          type: 'input',
          key: 'srcPortPrefix',
          label: this.$t('edge.io.srcPortPrefix'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
          tip: this.$t('edge.io.srcPortPrefixTip'),
        },
        {
          type: 'input',
          key: 'networkProtocol',
          label: this.$t('edge.io.networkProtocol'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
          tip: this.$t('edge.io.networkProtocolTip'),
        },
        {
          type: 'input',
          key: 'dstPortPrefix',
          label: this.$t('edge.io.dstPortPrefix'),
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '400px',
          tip: this.$t('edge.io.dstPortPrefixTip'),
        },
        {
          type: 'select',
          key: 'upperProtocol',
          label: this.$t('edge.io.upperProtocol'),
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '400px',
          options: [
            { label: '70', value: '70' },
            { label: '80', value: '80' },
            { label: '90', value: '90' },
          ],
        },
      ],

      // UDPv6配置数据
      udpv6Data: {
        udpv6Port: '25s',
      },
      udpv6Items: [
        {
          type: 'select',
          key: 'udpv6Port',
          label: this.$t('edge.io.udpv6Port'),
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '400px',
          options: [
            { label: '25s', value: '25s' },
            { label: '30s', value: '30s' },
            { label: '60s', value: '60s' },
          ],
        },
      ],

      // 私有空间分配数据
      privateSpaceData: {
        enablePrivateSpace: [],
      },
      privateSpaceItems: [
        {
          type: 'checkbox',
          key: 'enablePrivateSpace',
          label: this.$t('edge.io.enablePrivateSpace'),
          options: [
            {
              label: this.$t('edge.io.enablePrivateSpaceOption'),
              value: 'enabled',
            },
          ],
        },
      ],

      // 权限设置数据
      permissionData: {
        pingPermission: '默认',
      },
      permissionItems: [
        {
          type: 'select',
          key: 'pingPermission',
          label: this.$t('edge.io.pingPermission'),
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '400px',
          options: [
            { label: this.$t('edge.io.default'), value: '默认' },
            { label: this.$t('edge.io.allow'), value: '允许' },
            { label: this.$t('edge.io.deny'), value: '拒绝' },
          ],
        },
      ],
    }
  },
  // 计算属性
  computed: {},
  // 侦听属性
  watch: {},
  // vue实例挂载到dom之后
  mounted() {
    this.loadData()
  },
  // vue实例数据变化更新DOM之后
  updated() {},
  // vue实例销毁之后
  unmounted() {},
  // 绑定方法
  methods: {
    loadData() {
      // 加载初始数据
      console.log('加载接入选路配置数据')
    },
    async submitForm() {
      // 验证所有表单
      const validations = await Promise.all([
        this.$refs.accessPointForm.validate(),
        this.$refs.configForm.validate(),
        this.$refs.udpv6Form.validate(),
        this.$refs.privateSpaceForm.validate(),
        this.$refs.permissionForm.validate(),
      ])

      const allValid = validations.every((v) => v)

      if (allValid) {
        const formData = {
          ...this.accessPointData,
          ...this.configData,
          ...this.udpv6Data,
          ...this.privateSpaceData,
          ...this.permissionData,
        }
        console.log('提交表单数据:', formData)
        this.$toast.success(this.$t('edge.common.applySuccessfully'))
      } else {
        this.$toast.error(this.$t('common.validateFailed'))
      }
    },
    resetForm() {
      this.$refs.accessPointForm.resetFields()
      this.$refs.configForm.resetFields()
      this.$refs.udpv6Form.resetFields()
      this.$refs.privateSpaceForm.resetFields()
      this.$refs.permissionForm.resetFields()
      this.$toast.info(this.$t('formDemo.messages.resetSuccess'))
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
