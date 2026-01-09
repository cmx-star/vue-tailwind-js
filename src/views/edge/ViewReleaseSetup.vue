<template>
  <CompPageLayout class="ViewReleaseSetup">
    <!-- 页面标题 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6"
    >
      <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('nav.releaseSetup') }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">{{ $t('edge.release.description') }}</p>
    </div>

    <!-- 发布主题列表 -->
    <CompCard>
      <div
        class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('edge.release.topicManagement') }}
        </h2>
        <div class="flex gap-3">
          <CompBaseButton size="sm" @click="addRelease">{{ $t('button.add') }}</CompBaseButton>
          <CompBaseButton size="sm" variant="danger" @click="delOption(true)">{{
            $t('button.delete')
          }}</CompBaseButton>
          <CompBaseButton
            size="sm"
            variant="primary"
            :disabled="display"
            :loading="btnLoading"
            @click="submitForm"
            >{{ $t('button.apply') }}</CompBaseButton
          >
        </div>
      </div>

      <CompDataTable
        :data="releaseDataList"
        :columns="releaseColumn"
        :loading="releaseLoading"
        selectable
        @selection-change="postSelection"
      >
        <template #retain="{ row }">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="
              row.retain
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            "
          >
            {{ row.retain == true ? $t('edge.release.retained') : $t('edge.release.notRetained') }}
          </span>
        </template>
        <template #qos="{ row }">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            <span v-if="row.qos == 0">QOS0</span>
            <span v-else-if="row.qos == 1">QOS1</span>
            <span v-else>QOS2</span>
          </span>
        </template>
        <template #option="{ row, index }">
          <div class="flex gap-3">
            <button
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
              @click="editOption(row, index)"
            >
              {{ $t('button.edit') }}
            </button>
            <button
              class="text-danger hover:text-danger/90 text-sm font-medium"
              @click="delOption(false, row)"
            >
              {{ $t('button.delete') }}
            </button>
          </div>
        </template>
      </CompDataTable>
    </CompCard>

    <!-- 添加/编辑主题弹窗 -->
    <CompDialog
      ref="releaseCanPortDialog"
      :title="VTitle"
      width="xl"
      @close="closeRouteCanPortDialog"
      @confirm="releaseCanPort"
    >
      <CompForm
        ref="addTopicForm"
        v-model="formData"
        :form-items="protocol == 5 ? formAliItems : formItems"
        :label-width="labelWidth"
      />
    </CompDialog>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: 发布设置 - MQTT 主题发布配置
 * @author: Antigravity
 * 1. 保持template、script、style这个顺序
 * 2. 保持template最外层元素的 class 与组件名称一致
 */

export default {
  // 组件名称
  name: 'ViewReleaseSetup',
  // 子组件
  components: {},
  // 过滤器
  filters: {},
  // 动态属性
  data() {
    // MQTT主题校验
    const MqttTopicValidator = (rule, value, callback) => {
      value = value.toString()
      if (value.length > 200) {
        callback(
          new Error(this.$t('edge.common.inputRange') + ' 0~200 ' + this.$t('edge.common.byte')),
        )
      } else {
        if (!value) {
          callback(new Error(this.$t('edge.common.pleaseEnter')))
        } else {
          // let reg = new RegExp("^[a-zA-Z0-9_/]+$");
          // if (reg.test(value)) {
          callback()
          // } else {
          //   callback(new Error("请输入正确的主题名称"));
          // }
        }
      }
    }

    return {
      // 内部管理的配置值
      indexFlag: 0, // 通道序号,默认为0
      protocol: 0, // 协议类型,默认为0 (非阿里云)

      labelWidth: '150px',
      dataNum: 1,
      display: true,
      editIndex: null,
      idData: null,
      VTitle: null,
      releaseDataList: [
        {
          id: 1,
          name: 'telemetry/status',
          qos: 0,
          retain: true,
          desp: '设备状态上报',
        },
        {
          id: 2,
          name: 'telemetry/metrics',
          qos: 1,
          retain: false,
          desp: '传感器数据采集',
        },
      ],
      releaseColumn: [
        {
          label: this.$t('edge.release.topic'),
          key: 'name',
        },
        {
          label: 'QOS',
          key: 'qos',
        },
        {
          label: this.$t('edge.release.messageRetained'),
          key: 'retain',
        },
        {
          label: this.$t('edge.release.description_field'),
          key: 'desp',
        },
        {
          label: this.$t('edge.release.operation'),
          key: 'option',
          width: '150px',
        },
      ],
      formData: {
        name: null,
        qos: 0,
        retain: false,
        desp: null,
      },
      // 阿里云不支持QOS2,单独赋值
      formAliItems: [
        // 主题名称
        {
          type: 'input',
          key: 'name',
          label: this.$t('edge.release.topic') + ':',
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '300px',
          rules: [
            {
              required: true,
              message: this.$t('edge.common.formatError'),
              trigger: 'blur',
            },
            {
              validator: MqttTopicValidator,
            },
          ],
        },
        // QOS
        {
          type: 'select',
          key: 'qos',
          label: 'QOS:',
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '300px',
          rules: [
            {
              required: true,
              message: this.$t('edge.common.pleaseSelect'),
              trigger: 'change',
            },
          ],
          options: [
            {
              label: 'QOS0',
              value: 0,
            },
            {
              label: 'QOS1',
              value: 1,
            },
          ],
        },
        // 消息保留
        {
          type: 'radio',
          key: 'retain',
          label: this.$t('edge.release.messageRetained') + ':',
          width: '300px',
          rules: [
            {
              required: true,
              trigger: 'change',
            },
          ],
          options: [
            {
              label: this.$t('edge.release.false'),
              value: false,
            },
            {
              label: this.$t('edge.release.true'),
              value: true,
            },
          ],
        },
        // 备注
        {
          type: 'input',
          key: 'desp',
          label: this.$t('edge.release.description_field') + ':',
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '300px',
          rules: [
            {
              min: 1,
              max: 64,
              message: this.$t('edge.common.inputRange') + ' 1-64 ' + this.$t('edge.common.byte'),
            },
          ],
        },
      ],
      formItems: [
        // 主题名称
        {
          type: 'input',
          key: 'name',
          label: this.$t('edge.release.topic') + ':',
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '300px',
          rules: [
            {
              required: true,
              message: this.$t('edge.common.formatError'),
              trigger: 'blur',
            },
            {
              validator: MqttTopicValidator,
            },
          ],
        },
        // QOS
        {
          type: 'select',
          key: 'qos',
          label: 'QOS:',
          placeholder: this.$t('edge.common.pleaseSelect'),
          width: '300px',
          rules: [
            {
              required: true,
              message: this.$t('edge.common.pleaseSelect'),
              trigger: 'change',
            },
          ],
          options: [
            {
              label: 'QOS0',
              value: 0,
            },
            {
              label: 'QOS1',
              value: 1,
            },
            {
              label: 'QOS2',
              value: 2,
            },
          ],
        },
        // 消息保留
        {
          type: 'radio',
          key: 'retain',
          label: this.$t('edge.release.messageRetained') + ':',
          width: '300px',
          rules: [
            {
              required: true,
              trigger: 'change',
            },
          ],
          options: [
            {
              label: this.$t('edge.release.false'),
              value: false,
            },
            {
              label: this.$t('edge.release.true'),
              value: true,
            },
          ],
        },
        // 备注
        {
          type: 'input',
          key: 'desp',
          label: this.$t('edge.release.description_field') + ':',
          placeholder: this.$t('edge.common.pleaseEnter'),
          width: '300px',
          rules: [
            {
              min: 1,
              max: 64,
              message: this.$t('edge.common.inputRange') + ' 1-64 ' + this.$t('edge.common.byte'),
            },
          ],
        },
      ],
      selectDataList: [],
      releaseLoading: false,
      btnLoading: false,
    }
  },
  // 计算属性
  computed: {},
  // 侦听属性
  watch: {
    releaseDataList: {
      handler(_newVal) {
        this.display = false
      },
      deep: true,
    },
  },
  // vue实例挂载到dom之后
  mounted() {
    this.getTableList()
  },
  // vue实例数据变化更新DOM之后
  updated() {},
  // vue实例销毁之后
  unmounted() {},
  // 绑定方法
  methods: {
    postSelection(val) {
      if (val) {
        this.selectDataList = val.map(function (item) {
          return item.id
        })
      }
    },
    submitForm() {
      this.btnLoading = true
      // 模拟提交过程
      setTimeout(() => {
        this.btnLoading = false
        this.display = true
        this.$toast.success(this.$t('edge.common.applySuccessfully'))
      }, 500)
    },
    deleteCanPort() {
      // 物理删除列表数据
      this.releaseDataList = this.releaseDataList.filter((item) => !this.idData.includes(item.id))
      this.$toast.success(this.$t('edge.common.deleteSuccessfully'))
    },
    addRelease() {
      this.VTitle = this.$t('button.add')
      this.$refs.releaseCanPortDialog.open()
    },
    editOption(item, index) {
      const data = JSON.parse(JSON.stringify(item))
      this.formData = data
      this.VTitle = this.$t('button.edit')
      this.editIndex = index
      this.$refs.releaseCanPortDialog.open()
    },
    delOption(flag, item) {
      let content = ''
      if (flag) {
        if (this.selectDataList.length == 0) {
          this.$toast.info(this.$t('edge.release.noTopicSelected'))
          return
        }
        this.dataNum = this.selectDataList.length
        this.idData = this.selectDataList
        content = `${this.$t('edge.release.selectedTopics')} ${this.dataNum}, ${this.$t('edge.release.deleteConfirm')}`
      } else {
        this.dataNum = 1
        this.idData = [item.id]
        content = this.$t('edge.release.deleteConfirm')
      }

      this.$modal.confirm({
        title: this.$t('edge.release.tips'),
        content: content,
        onConfirm: () => {
          this.deleteCanPort()
        },
      })
    },
    async releaseCanPort() {
      const valid = await this.$refs.addTopicForm.validate()
      if (valid) {
        if (this.VTitle == this.$t('button.edit')) {
          // Vue 3 直接赋值即可触发响应式，或者使用 splice
          this.releaseDataList[this.editIndex] = JSON.parse(JSON.stringify(this.formData))
          this.$toast.success(this.$t('edge.common.modifySuccessfully'))
          this.closeRouteCanPortDialog(true)
        } else {
          if (this.releaseDataList.length == 16) {
            this.$toast.warning(this.$t('edge.release.maxTopics'))
          } else {
            let data = JSON.parse(JSON.stringify(this.formData))
            data['id'] = Date.now()
            this.releaseDataList.unshift(data)
            this.$toast.success(this.$t('edge.common.addSuccessfully'))
            this.closeRouteCanPortDialog(true)
          }
        }
      }
    },
    closeRouteCanPortDialog(flag) {
      this.$refs.addTopicForm.resetFields()
      if (flag) this.$refs.releaseCanPortDialog.close()
    },
    getTableList() {
      this.releaseLoading = true
      // 模拟加载逻辑
      setTimeout(() => {
        this.releaseLoading = false
        this.display = true
        // 确保每个项目都有 ID (如果是从其他地方加载的)
        this.releaseDataList.forEach((item) => {
          if (!item.id) item.id = Math.random().toString(36).substr(2, 9)
        })
      }, 300)
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS，最小化自定义样式 */
</style>
