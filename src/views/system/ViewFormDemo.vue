<template>
  <div class="ViewFormDemo">
    <div class="p-6 space-y-6">
      <!-- 页面标题 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">表单组件演示</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          展示 CompForm 组件的各种用法和表单字段类型
        </p>
      </div>

      <!-- 基础表单示例 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">基础表单示例</h2>
        <CompForm
          ref="basicForm"
          v-model="basicFormData"
          :form-items="basicFormItems"
          :columns="2"
          @submit="handleBasicSubmit"
        >
          <!-- 自定义插槽示例 -->
          <template #customField>
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p class="text-sm text-blue-600 dark:text-blue-400">这是一个自定义插槽字段</p>
            </div>
          </template>
        </CompForm>

        <div class="flex gap-3 mt-6">
          <CompBaseButton @click="validateForm">验证表单</CompBaseButton>
          <CompBaseButton type="secondary" @click="resetForm">重置表单</CompBaseButton>
        </div>
      </div>

      <!-- 所有字段类型演示 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          所有字段类型演示
        </h2>
        <CompForm v-model="allFieldsData" :form-items="allFieldsItems" :columns="1" />
      </div>

      <!-- 动态表单示例 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">动态表单示例</h2>
        <CompForm v-model="dynamicFormData" :form-items="dynamicFormItems" :columns="2" />
      </div>

      <!-- 表单数据预览 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">表单数据预览</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">基础表单数据:</h3>
            <pre class="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-auto">{{
              JSON.stringify(basicFormData, null, 2)
            }}</pre>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">所有字段数据:</h3>
            <pre class="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-auto">{{
              JSON.stringify(allFieldsData, null, 2)
            }}</pre>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">动态表单数据:</h3>
            <pre class="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-auto">{{
              JSON.stringify(dynamicFormData, null, 2)
            }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validators } from '@/utils/validators'

export default {
  name: 'ViewFormDemo',
  data() {
    return {
      // 基础表单数据 (清空以展示验证)
      basicFormData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        hobbies: [],
        agreeTerms: false,
        description: '',
      },
      // 所有字段类型数据 (带 mock 值)
      allFieldsData: {
        textInput: '示例文本',
        textarea: '这是多行文本的示例内容\n可以换行显示\n用于演示 textarea 功能',
        email: 'demo@example.com',
        password: 'Demo@123',
        number: '42',
        singleSelect: '2',
        multipleSelect: ['a', 'c'],
        radio: '1',
        checkbox: ['a', 'b'],
        switch: true,
        datepicker: new Date().toISOString().split('T')[0],
        cascader: ['zhejiang', 'hangzhou'],
      },
      // 动态表单数据 (带 mock 值)
      dynamicFormData: {
        userType: 'company',
        companyName: '示例科技有限公司',
        department: '研发部',
      },
    }
  },
  computed: {
    // 基础表单配置 (带验证规则)
    basicFormItems() {
      return [
        {
          key: 'username',
          label: '用户名',
          type: 'input',
          placeholder: '请输入用户名',
          required: true,
          rules: [
            validators.required('用户名不能为空'),
            validators.username('用户名4-20位,只能包含字母数字下划线'),
          ],
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'input',
          subType: 'email',
          placeholder: '请输入邮箱',
          required: true,
          rules: [validators.required('邮箱不能为空'), validators.email('请输入有效的邮箱地址')],
        },
        {
          key: 'password',
          label: '密码',
          type: 'input',
          subType: 'password',
          placeholder: '请输入密码',
          required: true,
          rules: [
            validators.required('密码不能为空'),
            validators.strongPassword('密码至少8位,需包含大小写字母和数字'),
          ],
        },
        {
          key: 'confirmPassword',
          label: '确认密码',
          type: 'input',
          subType: 'password',
          placeholder: '请再次输入密码',
          required: true,
          rules: [
            validators.required('请确认密码'),
            validators.confirmPassword('password', '两次输入的密码不一致'),
          ],
        },
        {
          key: 'gender',
          label: '性别',
          type: 'radio',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
        {
          key: 'hobbies',
          label: '爱好',
          type: 'checkbox',
          options: [
            { label: '阅读', value: 'reading' },
            { label: '运动', value: 'sports' },
            { label: '音乐', value: 'music' },
          ],
          rules: [validators.arrayNotEmpty('请至少选择一项爱好')],
        },
        {
          key: 'agreeTerms',
          label: '同意条款',
          type: 'switch',
          activeText: '已同意',
          inactiveText: '未同意',
        },
        {
          key: 'description',
          label: '个人简介',
          type: 'input',
          subType: 'textarea',
          placeholder: '请输入个人简介',
          rules: [
            validators.required('个人简介不能为空'),
            validators.minLength(10, '个人简介至少10个字符'),
            validators.maxLength(200, '个人简介最多200个字符'),
          ],
        },
        {
          slot: 'customField',
        },
      ]
    },
    // 所有字段类型配置
    allFieldsItems() {
      return [
        {
          key: 'textInput',
          label: '文本输入',
          type: 'input',
          placeholder: '普通文本输入',
        },
        {
          key: 'textarea',
          label: '多行文本',
          type: 'input',
          subType: 'textarea',
          placeholder: '多行文本输入',
        },
        {
          key: 'email',
          label: '邮箱输入',
          type: 'input',
          subType: 'email',
          placeholder: 'example@email.com',
          rules: [validators.email()],
        },
        {
          key: 'password',
          label: '密码输入',
          type: 'input',
          subType: 'password',
          placeholder: '请输入密码',
        },
        {
          key: 'number',
          label: '数字输入',
          type: 'input',
          subType: 'number',
          placeholder: '请输入数字',
          rules: [
            validators.number('请输入有效的数字'),
            validators.range(1, 100, '数值必须在1-100之间'),
          ],
        },
        {
          key: 'singleSelect',
          label: '单选下拉',
          type: 'select',
          placeholder: '请选择',
          options: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
            { label: '选项3', value: '3' },
          ],
        },
        {
          key: 'multipleSelect',
          label: '多选下拉',
          type: 'select',
          multiple: true,
          placeholder: '请选择多个',
          options: [
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' },
            { label: '选项C', value: 'c' },
          ],
        },
        {
          key: 'radio',
          label: '单选框',
          type: 'radio',
          options: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
          ],
        },
        {
          key: 'checkbox',
          label: '多选框',
          type: 'checkbox',
          options: [
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' },
            { label: '选项C', value: 'c' },
          ],
        },
        {
          key: 'switch',
          label: '开关',
          type: 'switch',
          activeText: '开启',
          inactiveText: '关闭',
        },
        {
          key: 'datepicker',
          label: '日期选择',
          type: 'datepicker',
          placeholder: '请选择日期',
        },
        {
          key: 'cascader',
          label: '级联选择',
          type: 'cascader',
          placeholder: '请选择',
          options: [
            {
              label: '浙江',
              value: 'zhejiang',
              children: [
                { label: '杭州', value: 'hangzhou' },
                { label: '宁波', value: 'ningbo' },
              ],
            },
            {
              label: '江苏',
              value: 'jiangsu',
              children: [
                { label: '南京', value: 'nanjing' },
                { label: '苏州', value: 'suzhou' },
              ],
            },
          ],
        },
      ]
    },
    // 动态表单配置
    dynamicFormItems() {
      const items = [
        {
          key: 'userType',
          label: '用户类型',
          type: 'select',
          placeholder: '请选择用户类型',
          options: [
            { label: '个人用户', value: 'personal' },
            { label: '企业用户', value: 'company' },
          ],
          rules: [validators.required('请选择用户类型')],
        },
      ]

      // 根据用户类型动态显示字段
      if (this.dynamicFormData.userType === 'company') {
        items.push(
          {
            key: 'companyName',
            label: '公司名称',
            type: 'input',
            placeholder: '请输入公司名称',
            required: true,
            rules: [
              validators.required('公司名称不能为空'),
              validators.minLength(2, '公司名称至少2个字符'),
            ],
          },
          {
            key: 'department',
            label: '部门',
            type: 'input',
            placeholder: '请输入部门',
          },
        )
      }

      return items
    },
  },
  methods: {
    async validateForm() {
      const isValid = await this.$refs.basicForm.validate()
      if (isValid) {
        this.$toast.success('表单验证通过!')
      } else {
        this.$toast.error('表单验证失败,请检查输入')
      }
    },
    resetForm() {
      this.$refs.basicForm.resetFields()
      this.$toast.info('表单已重置')
    },
    handleBasicSubmit(data) {
      console.log('提交的表单数据:', data)
      this.$toast.success('表单提交成功!')
    },
  },
}
</script>

<style scoped>
/* 额外样式 */
</style>
