<template>
  <div class="ViewFormDemo">
    <div class="p-6 space-y-6">
      <!-- 页面标题 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t('formDemo.title') }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t('formDemo.subtitle') }}
        </p>
      </div>

      <!-- 基础表单示例 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('formDemo.basicForm') }}
        </h2>
        <CompForm
          ref="basicForm"
          v-model="basicFormData"
          :form-items="basicFormItems"
          :columns="2"
          @submit="handleBasicSubmit"
        >
          <!-- 自定义插槽示例 -->
          <template #customField>
            <div class="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p class="text-sm text-primary-600 dark:text-primary-400">
                {{ $t('formDemo.customSlot') }}
              </p>
            </div>
          </template>
        </CompForm>

        <div class="flex gap-3 mt-6">
          <CompBaseButton @click="validateForm">{{ $t('formDemo.validateButton') }}</CompBaseButton>
          <CompBaseButton type="secondary" @click="resetForm">{{
            $t('formDemo.resetButton')
          }}</CompBaseButton>
        </div>
      </div>

      <!-- 所有字段类型演示 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('formDemo.allFields') }}
        </h2>
        <CompForm v-model="allFieldsData" :form-items="allFieldsItems" :columns="1" />
      </div>

      <!-- 动态表单示例 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('formDemo.dynamicForm') }}
        </h2>
        <CompForm v-model="dynamicFormData" :form-items="dynamicFormItems" :columns="2" />
      </div>

      <!-- 表单数据预览 -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('formDemo.dataPreview') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('formDemo.basicForm') }}:
            </h3>
            <pre
              class="text-xs bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 rounded overflow-auto"
              >{{ JSON.stringify(basicFormData, null, 2) }}</pre
            >
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('formDemo.allFields') }}:
            </h3>
            <pre
              class="text-xs bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 rounded overflow-auto"
              >{{ JSON.stringify(allFieldsData, null, 2) }}</pre
            >
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('formDemo.dynamicForm') }}:
            </h3>
            <pre
              class="text-xs bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 rounded overflow-auto"
              >{{ JSON.stringify(dynamicFormData, null, 2) }}</pre
            >
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
      allFieldsData: {
        textInput: this.$t('formDemo.mockData.sampleText'),
        textarea: this.$t('formDemo.mockData.sampleTextarea'),
        email: 'demo@example.com',
        password: 'Demo@123',
        number: '42',
        singleSelect: '2',
        multipleSelect: ['a', 'c'],
        groupSelect: 'frontend-vue',
        radio: '1',
        checkbox: ['a', 'b'],
        switch: true,
        datepicker: new Date().toISOString().split('T')[0],
        cascader: ['zhejiang', 'hangzhou'],
        transfer: ['1', '3'],
      },
      dynamicFormData: {
        userType: 'company',
        companyName: this.$t('formDemo.mockData.companyName'),
        department: this.$t('formDemo.mockData.department'),
      },
    }
  },
  computed: {
    basicFormItems() {
      return [
        {
          key: 'username',
          label: this.$t('formDemo.fields.username'),
          type: 'input',
          placeholder: this.$t('formDemo.placeholders.username'),
          required: true,
          rules: [
            validators.required(this.$t('formDemo.validation.usernameRequired')),
            validators.username(this.$t('formDemo.validation.usernameFormat')),
          ],
        },
        {
          key: 'email',
          label: this.$t('formDemo.fields.email'),
          type: 'input',
          subType: 'email',
          placeholder: this.$t('formDemo.placeholders.email'),
          required: true,
          rules: [
            validators.required(this.$t('formDemo.validation.emailRequired')),
            validators.email(this.$t('formDemo.validation.emailFormat')),
          ],
        },
        {
          key: 'password',
          label: this.$t('formDemo.fields.password'),
          type: 'input',
          subType: 'password',
          placeholder: this.$t('formDemo.placeholders.password'),
          required: true,
          rules: [
            validators.required(this.$t('formDemo.validation.passwordRequired')),
            validators.strongPassword(this.$t('formDemo.validation.passwordFormat')),
          ],
        },
        {
          key: 'confirmPassword',
          label: this.$t('formDemo.fields.confirmPassword'),
          type: 'input',
          subType: 'password',
          placeholder: this.$t('formDemo.placeholders.confirmPassword'),
          required: true,
          rules: [
            validators.required(this.$t('formDemo.validation.confirmPasswordRequired')),
            validators.confirmPassword(
              'password',
              this.$t('formDemo.validation.confirmPasswordMatch'),
            ),
          ],
        },
        {
          key: 'gender',
          label: this.$t('formDemo.fields.gender'),
          type: 'radio',
          options: [
            { label: this.$t('formDemo.options.male'), value: 'male' },
            { label: this.$t('formDemo.options.female'), value: 'female' },
          ],
        },
        {
          key: 'hobbies',
          label: this.$t('formDemo.fields.hobbies'),
          type: 'checkbox',
          options: [
            { label: this.$t('formDemo.options.reading'), value: 'reading' },
            { label: this.$t('formDemo.options.sports'), value: 'sports' },
            { label: this.$t('formDemo.options.music'), value: 'music' },
          ],
          rules: [validators.arrayNotEmpty(this.$t('formDemo.validation.hobbiesRequired'))],
        },
        {
          key: 'agreeTerms',
          label: this.$t('formDemo.fields.agreeTerms'),
          type: 'switch',
          activeText: this.$t('formDemo.options.agreed'),
          inactiveText: this.$t('formDemo.options.notAgreed'),
        },
        {
          key: 'description',
          label: this.$t('formDemo.fields.description'),
          type: 'input',
          subType: 'textarea',
          placeholder: this.$t('formDemo.placeholders.description'),
          rules: [
            validators.required(this.$t('formDemo.validation.descriptionRequired')),
            validators.minLength(10, this.$t('formDemo.validation.descriptionMin')),
            validators.maxLength(200, this.$t('formDemo.validation.descriptionMax')),
          ],
        },
        {
          slot: 'customField',
        },
      ]
    },
    allFieldsItems() {
      return [
        {
          key: 'textInput',
          label: this.$t('formDemo.fields.textInput'),
          type: 'input',
          placeholder: this.$t('formDemo.placeholders.textInput'),
        },
        {
          key: 'textarea',
          label: this.$t('formDemo.fields.textarea'),
          type: 'input',
          subType: 'textarea',
          placeholder: this.$t('formDemo.placeholders.textarea'),
        },
        {
          key: 'email',
          label: this.$t('formDemo.fields.emailInput'),
          type: 'input',
          subType: 'email',
          placeholder: this.$t('formDemo.placeholders.emailInput'),
          rules: [validators.email()],
        },
        {
          key: 'password',
          label: this.$t('formDemo.fields.passwordInput'),
          type: 'input',
          subType: 'password',
          placeholder: this.$t('formDemo.placeholders.passwordInput'),
        },
        {
          key: 'number',
          label: this.$t('formDemo.fields.numberInput'),
          type: 'input',
          subType: 'number',
          placeholder: this.$t('formDemo.placeholders.numberInput'),
          rules: [
            validators.number(this.$t('formDemo.validation.numberFormat')),
            validators.range(1, 100, this.$t('formDemo.validation.numberRange')),
          ],
        },
        {
          key: 'singleSelect',
          label: this.$t('formDemo.fields.singleSelect'),
          type: 'select',
          placeholder: this.$t('formDemo.placeholders.select'),
          options: [
            { label: this.$t('formDemo.options.option1'), value: '1' },
            { label: this.$t('formDemo.options.option2'), value: '2' },
            { label: this.$t('formDemo.options.option3'), value: '3' },
          ],
        },
        {
          key: 'multipleSelect',
          label: this.$t('formDemo.fields.multipleSelect'),
          type: 'select',
          multiple: true,
          placeholder: this.$t('formDemo.placeholders.selectMultiple'),
          options: [
            { label: this.$t('formDemo.options.optionA'), value: 'a' },
            { label: this.$t('formDemo.options.optionB'), value: 'b' },
            { label: this.$t('formDemo.options.optionC'), value: 'c' },
          ],
        },
        {
          key: 'radio',
          label: this.$t('formDemo.fields.radio'),
          type: 'radio',
          options: [
            { label: this.$t('formDemo.options.option1'), value: '1' },
            { label: this.$t('formDemo.options.option2'), value: '2' },
          ],
        },
        {
          key: 'checkbox',
          label: this.$t('formDemo.fields.checkbox'),
          type: 'checkbox',
          options: [
            { label: this.$t('formDemo.options.optionA'), value: 'a' },
            { label: this.$t('formDemo.options.optionB'), value: 'b' },
            { label: this.$t('formDemo.options.optionC'), value: 'c' },
          ],
        },
        {
          key: 'switch',
          label: this.$t('formDemo.fields.switch'),
          type: 'switch',
          activeText: this.$t('formDemo.options.on'),
          inactiveText: this.$t('formDemo.options.off'),
        },
        {
          key: 'datepicker',
          label: this.$t('formDemo.fields.datepicker'),
          type: 'datepicker',
          placeholder: this.$t('formDemo.placeholders.datepicker'),
        },
        {
          key: 'cascader',
          label: this.$t('formDemo.fields.cascader'),
          type: 'cascader',
          placeholder: this.$t('formDemo.placeholders.cascader'),
          tip: this.$t('formDemo.tips.cascader'),
          options: [
            {
              label: this.$t('formDemo.options.zhejiang'),
              value: 'zhejiang',
              children: [
                { label: this.$t('formDemo.options.hangzhou'), value: 'hangzhou' },
                { label: this.$t('formDemo.options.ningbo'), value: 'ningbo' },
              ],
            },
            {
              label: this.$t('formDemo.options.jiangsu'),
              value: 'jiangsu',
              children: [
                { label: this.$t('formDemo.options.nanjing'), value: 'nanjing' },
                { label: this.$t('formDemo.options.suzhou'), value: 'suzhou' },
              ],
            },
          ],
        },
        {
          key: 'groupSelect',
          label: this.$t('formDemo.fields.groupSelect'),
          type: 'select',
          placeholder: this.$t('formDemo.placeholders.groupSelect'),
          tip: this.$t('formDemo.tips.groupSelect'),
          options: [
            {
              label: this.$t('formDemo.options.frontend'),
              options: [
                { label: 'Vue.js', value: 'frontend-vue' },
                { label: 'React', value: 'frontend-react' },
                { label: 'Angular', value: 'frontend-angular' },
              ],
            },
            {
              label: this.$t('formDemo.options.backend'),
              options: [
                { label: 'Node.js', value: 'backend-node' },
                { label: 'Python', value: 'backend-python' },
                { label: 'Java', value: 'backend-java' },
              ],
            },
          ],
        },
        {
          key: 'transfer',
          label: this.$t('formDemo.fields.transfer'),
          type: 'transfer',
          tip: this.$t('formDemo.tips.transfer'),
          data: [
            { key: '1', label: this.$t('formDemo.options.item1') },
            { key: '2', label: this.$t('formDemo.options.item2') },
            { key: '3', label: this.$t('formDemo.options.item3') },
            { key: '4', label: this.$t('formDemo.options.item4') },
            { key: '5', label: this.$t('formDemo.options.item5') },
          ],
          titles: [this.$t('formDemo.transfer.source'), this.$t('formDemo.transfer.target')],
          searchable: true,
        },
      ]
    },
    dynamicFormItems() {
      const items = [
        {
          key: 'userType',
          label: this.$t('formDemo.fields.userType'),
          type: 'select',
          placeholder: this.$t('formDemo.placeholders.userType'),
          options: [
            { label: this.$t('formDemo.options.personal'), value: 'personal' },
            { label: this.$t('formDemo.options.company'), value: 'company' },
          ],
          rules: [validators.required(this.$t('formDemo.validation.userTypeRequired'))],
        },
      ]

      if (this.dynamicFormData.userType === 'company') {
        items.push(
          {
            key: 'companyName',
            label: this.$t('formDemo.fields.companyName'),
            type: 'input',
            placeholder: this.$t('formDemo.placeholders.companyName'),
            required: true,
            rules: [
              validators.required(this.$t('formDemo.validation.companyNameRequired')),
              validators.minLength(2, this.$t('formDemo.validation.companyNameMin')),
            ],
          },
          {
            key: 'department',
            label: this.$t('formDemo.fields.department'),
            type: 'input',
            placeholder: this.$t('formDemo.placeholders.department'),
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
        this.$toast.success(this.$t('formDemo.messages.validateSuccess'))
      } else {
        this.$toast.error(this.$t('formDemo.messages.validateFailed'))
      }
    },
    resetForm() {
      this.$refs.basicForm.resetFields()
      this.$toast.info(this.$t('formDemo.messages.resetSuccess'))
    },
    handleBasicSubmit(data) {
      console.log('提交的表单数据:', data)
      this.$toast.success(this.$t('formDemo.messages.submitSuccess'))
    },
  },
}
</script>

<style scoped>
/* 额外样式 */
</style>
