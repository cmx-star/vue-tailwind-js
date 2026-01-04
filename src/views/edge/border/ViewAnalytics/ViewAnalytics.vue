<template>
  <div class="p-6">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Form 表单示例</h1>
      
      <!-- 基础表单 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">基础表单</h2>
        <form @submit.prevent="handleSubmit">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <CompFormInput
              v-model="form.firstName"
              label="First name"
              placeholder="John"
              required
            />
            <CompFormInput
              v-model="form.lastName"
              label="Last name"
              placeholder="Doe"
              required
            />
            <CompFormInput
              v-model="form.company"
              label="Company"
              placeholder="Flowbite"
              required
            />
            <CompFormInput
              v-model="form.phone"
              type="tel"
              label="Phone number"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
            <CompFormInput
              v-model="form.website"
              type="url"
              label="Website URL"
              placeholder="flowbite.com"
              required
            />
            <CompFormInput
              v-model="form.visitors"
              type="number"
              label="Unique visitors (per month)"
              required
            />
          </div>
          
          <CompFormInput
            v-model="form.email"
            type="email"
            label="Email address"
            placeholder="john.doe@company.com"
            required
          />
          
          <CompFormInput
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="•••••••••"
            required
          />
          
          <CompFormInput
            v-model="form.confirmPassword"
            type="password"
            label="Confirm password"
            placeholder="•••••••••"
            required
          />
          
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                v-model="form.agree"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-white">
              I agree with the <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">terms and conditions</a>.
            </label>
          </div>
          
          <button
            type="submit"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </section>
      
      <!-- 禁用状态 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">禁用状态</h2>
        <div class="space-y-4">
          <CompFormInput
            value="Disabled input"
            disabled
            container-class="mb-4"
          />
          <CompFormInput
            value="Disabled readonly input"
            disabled
            readonly
          />
        </div>
      </section>
      
      <!-- 验证状态 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">验证状态</h2>
        <div class="space-y-4">
          <CompFormInput
            v-model="successInput"
            label="Your name"
            placeholder="Success input"
            state="success"
            helper-bold="Well done!"
            helper-text=" Some success message."
          />
          <CompFormInput
            v-model="errorInput"
            label="Your name"
            placeholder="Error input"
            state="error"
            helper-bold="Oh, snapp!"
            helper-text=" Some error message."
          />
        </div>
      </section>
      
      <!-- 带图标的输入框 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">带图标/前缀</h2>
        <div class="space-y-4">
          <CompFormInput
            v-model="emailInput"
            label="Your Email"
            placeholder="name@flowbite.com"
            prefix-icon="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            helper-text="We'll never share your details."
          />
          <CompFormInput
            v-model="websiteInput"
            label="Website"
            placeholder="flowbite.com"
            prefix-text="https://"
          />
        </div>
      </section>
      
      <!-- 文件上传 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">文件上传</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">拖拽上传</h3>
            <CompFileUpload variant="dropzone" @change="handleFileUpload" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">按钮上传</h3>
            <CompFileUpload variant="button" max-size="30MB" @change="handleFileUpload" />
          </div>
        </div>
      </section>
      
      <!-- 数字输入 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">数字输入</h2>
        <CompNumberInput
          v-model="quantity"
          label="Choose quantity:"
          :min="0"
          :max="99999"
          placeholder="999"
          helper-text="Please select a 5 digit number from 0 to 9."
        />
      </section>
      
      <!-- 验证码输入 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">验证码输入</h2>
        <CompCodeInput
          v-model="verificationCode"
          :length="6"
          helper-text="Please introduce the 6 digit code we sent via email."
          @complete="handleCodeComplete"
        />
      </section>
      
      <!-- 文本域 -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">文本域</h2>
        <CompTextarea
          v-model="message"
          label="Your message"
          :rows="4"
          placeholder="Write your thoughts here..."
        />
      </section>
      
      <!-- 复选框 -->
      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">复选框</h2>
        
        <!-- 基础复选框 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">基础样式</h3>
          <CompCheckbox
            :checked="checkbox1"
            label="Default checkbox"
            @change="checkbox1 = $event"
          />
          <CompCheckbox
            :checked="checkbox2"
            label="Checked state"
            @change="checkbox2 = $event"
          />
        </div>
        
        <!-- 禁用状态 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">禁用状态</h3>
          <CompCheckbox
            :checked="false"
            label="Disabled checkbox"
            disabled
          />
          <CompCheckbox
            :checked="true"
            label="Disabled checked"
            disabled
          />
        </div>
        
        <!-- 边框样式 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">边框样式</h3>
          <div class="space-y-2">
            <CompCheckbox
              :checked="checkbox3"
              label="Default checkbox"
              variant="bordered"
              @change="checkbox3 = $event"
            />
            <CompCheckbox
              :checked="checkbox4"
              label="Checked state"
              variant="bordered"
              @change="checkbox4 = $event"
            />
          </div>
        </div>
        
        <!-- 带描述 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">带描述</h3>
          <div class="space-y-2">
            <CompCheckbox
              :checked="checkbox5"
              variant="bordered"
              @change="checkbox5 = $event"
            >
              <p class="select-none w-full text-sm font-medium text-gray-900 dark:text-white">16GB unified memory</p>
              <p class="select-none text-sm text-gray-700 dark:text-gray-400">Seamlessly handle multitasking, large apps.</p>
            </CompCheckbox>
            <CompCheckbox
              :checked="checkbox6"
              variant="bordered"
              @change="checkbox6 = $event"
            >
              <p class="select-none w-full text-sm font-medium text-gray-900 dark:text-white">1TB SSD storage</p>
              <p class="select-none text-sm text-gray-700 dark:text-gray-400">Get ultra-fast storage with 1TB of SSD space</p>
            </CompCheckbox>
          </div>
        </div>
        
        <!-- 列表样式 -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">列表样式</h3>
          <ul class="select-none w-full text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:flex">
            <li class="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
              <CompCheckbox
                :checked="frameworks.vue"
                label="Vue JS"
                variant="list"
                @change="frameworks.vue = $event"
              />
            </li>
            <li class="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
              <CompCheckbox
                :checked="frameworks.react"
                label="React"
                variant="list"
                @change="frameworks.react = $event"
              />
            </li>
            <li class="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
              <CompCheckbox
                :checked="frameworks.angular"
                label="Angular"
                variant="list"
                @change="frameworks.angular = $event"
              />
            </li>
            <li class="w-full">
              <CompCheckbox
                :checked="frameworks.laravel"
                label="Laravel"
                variant="list"
                @change="frameworks.laravel = $event"
              />
            </li>
          </ul>
        </div>
      </section>
      
      <!-- 单选框 -->
      <section class="mt-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">单选框</h2>
        
        <!-- 基础单选框 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">基础样式</h3>
          <CompRadio
            :checked="radio1 === 'default'"
            value="default"
            name="default-radio"
            label="Default radio"
            @change="radio1 = $event"
          />
          <CompRadio
            :checked="radio1 === 'checked'"
            value="checked"
            name="default-radio"
            label="Checked state"
            @change="radio1 = $event"
          />
        </div>
        
        <!-- 禁用状态 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">禁用状态</h3>
          <CompRadio
            :checked="false"
            value="disabled1"
            name="disabled-radio"
            label="Disabled radio"
            disabled
          />
          <CompRadio
            :checked="true"
            value="disabled2"
            name="disabled-radio"
            label="Disabled checked"
            disabled
          />
        </div>
        
        <!-- 列表样式 -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">列表样式</h3>
          <ul class="select-none w-full text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:flex">
            <li class="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
              <CompRadio
                :checked="radio2 === 'license'"
                value="license"
                name="list-radio"
                label="Driver License"
                variant="list"
                @change="radio2 = $event"
              />
            </li>
            <li class="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
              <CompRadio
                :checked="radio2 === 'id'"
                value="id"
                name="list-radio"
                label="State ID"
                variant="list"
                @change="radio2 = $event"
              />
            </li>
            <li class="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
              <CompRadio
                :checked="radio2 === 'military'"
                value="military"
                name="list-radio"
                label="US Military"
                variant="list"
                @change="radio2 = $event"
              />
            </li>
            <li class="w-full">
              <CompRadio
                :checked="radio2 === 'passport'"
                value="passport"
                name="list-radio"
                label="US Passport"
                variant="list"
                @change="radio2 = $event"
              />
            </li>
          </ul>
        </div>
        
        <!-- 卡片样式 -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Choose technology:</h3>
          <ul class="select-none grid w-full gap-4 md:grid-cols-3">
            <li>
              <CompRadio
                :checked="technology === 'react'"
                value="react"
                name="technologies"
                label="React Js"
                description="A JavaScript library for building user interfaces."
                variant="card"
                @change="technology = $event"
              />
            </li>
            <li>
              <CompRadio
                :checked="technology === 'vue'"
                value="vue"
                name="technologies"
                label="Vue Js"
                description="An model–view front end JavaScript framework."
                variant="card"
                @change="technology = $event"
              />
            </li>
            <li>
              <CompRadio
                :checked="technology === 'angular'"
                value="angular"
                name="technologies"
                label="Angular"
                description="A TypeScript-based web application framework."
                variant="card"
                @change="technology = $event"
              />
            </li>
          </ul>
        </div>
      </section>
      
      <!-- 开关 -->
      <section class="mt-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">开关</h2>
        
        <div class="space-y-4">
          <CompToggle
            :checked="toggle1"
            label="Toggle me"
            @change="toggle1 = $event"
          />
          <CompToggle
            :checked="toggle2"
            label="Small toggle"
            size="sm"
            @change="toggle2 = $event"
          />
          <CompToggle
            :checked="toggle3"
            label="Large toggle"
            size="lg"
            @change="toggle3 = $event"
          />
          <CompToggle
            :checked="true"
            label="Disabled toggle"
            disabled
          />
        </div>
      </section>
      
      <!-- 范围滑块 -->
      <section class="mt-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">范围滑块</h2>
        
        <div class="space-y-6">
          <CompRange
            v-model="range1"
            label="Default range"
          />
          <CompRange
            v-model="range2"
            label="Range with value display"
            :show-value="true"
          />
          <CompRange
            v-model="range3"
            label="Custom range (0-200)"
            :min="0"
            :max="200"
            :step="10"
            :show-value="true"
          />
          <CompRange
            :value="50"
            label="Disabled range"
            disabled
          />
        </div>
      </section>
      
      <!-- 浮动标签输入框 -->
      <section class="mt-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">浮动标签输入框</h2>
        
        <div class="space-y-6">
          <CompFloatingInput
            v-model="floatingFilled"
            label="Floating filled"
            variant="filled"
            icon="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
          <CompFloatingInput
            v-model="floatingOutlined"
            label="Floating outlined"
            variant="outlined"
            icon="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
          <CompFloatingInput
            v-model="floatingStandard"
            label="Floating standard"
            variant="standard"
            icon="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewAnalytics',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        website: '',
        visitors: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false
      },
      successInput: '',
      errorInput: '',
      emailInput: '',
      websiteInput: '',
      quantity: 0,
      verificationCode: '',
      message: '',
      checkbox1: false,
      checkbox2: true,
      checkbox3: false,
      checkbox4: true,
      checkbox5: false,
      checkbox6: true,
      frameworks: {
        vue: false,
        react: false,
        angular: false,
        laravel: false
      },
      radio1: 'checked',
      radio2: '',
      technology: 'react',
      toggle1: false,
      toggle2: true,
      toggle3: false,
      range1: 50,
      range2: 30,
      range3: 100,
      floatingFilled: '',
      floatingOutlined: '',
      floatingStandard: ''
    };
  },
  methods: {
    handleSubmit() {
      this.$toast.success({
        title: 'Form Submitted',
        message: 'Form data has been submitted successfully!',
        duration: 2000
      });
    },
    handleFileUpload(files) {
      console.log('Files uploaded:', files);
    },
    handleCodeComplete(code) {
      this.$toast.success({
        title: 'Code Complete',
        message: `Verification code: ${code}`,
        duration: 2000
      });
    }
  }
};
</script>
