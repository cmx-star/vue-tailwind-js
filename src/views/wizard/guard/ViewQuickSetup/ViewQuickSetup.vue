<template>
  <div class="p-6">
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        快速设置向导
      </h1>

      <!-- 水平步骤条 -->
      <div class="mb-8">
        <CompStepper
          :steps="steps"
          :current-step="currentStep"
          layout="vertical"
        />
      </div>

      <!-- 表单内容区 -->
      <form @submit.prevent="handleNext" novalidate>
        <!-- Step 1: 基本信息 -->
        <div v-show="currentStep === 0" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            基本信息
          </h2>

          <div class="grid gap-6 md:grid-cols-2">
            <CompFormInput
              v-model="formData.firstName"
              label="First Name"
              placeholder="John"
              :state="errors.firstName ? 'error' : 'default'"
              :helper-text="errors.firstName"
              required
              @blur="validateField('firstName')"
              @input="validateField('firstName')"
            />
            <CompFormInput
              v-model="formData.lastName"
              label="Last Name"
              placeholder="Doe"
              :state="errors.lastName ? 'error' : 'default'"
              :helper-text="errors.lastName"
              required
              @blur="validateField('lastName')"
              @input="validateField('lastName')"
            />
          </div>

          <CompFormInput
            v-model="formData.email"
            type="email"
            label="Email Address"
            placeholder="john.doe@example.com"
            :state="errors.email ? 'error' : 'default'"
            :helper-text="errors.email"
            required
            @blur="validateField('email')"
            @input="validateField('email')"
          />

          <CompFormInput
            v-model="formData.phone"
            type="tel"
            label="Phone Number"
            placeholder="123-456-7890"
            :state="errors.phone ? 'error' : 'default'"
            :helper-text="errors.phone"
            @blur="validateField('phone')"
            @input="validateField('phone')"
          />
        </div>

        <!-- Step 2: 账户设置 -->
        <div v-show="currentStep === 1" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            账户设置
          </h2>

          <CompFormInput
            v-model="formData.username"
            label="Username"
            placeholder="johndoe"
            :state="errors.username ? 'error' : 'default'"
            :helper-text="errors.username"
            required
            @blur="validateField('username')"
            @input="validateField('username')"
          />

          <CompFormInput
            v-model="formData.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :state="errors.password ? 'error' : 'default'"
            :helper-text="errors.password"
            required
            @blur="validateField('password')"
            @input="validateField('password')"
          />

          <CompFormInput
            v-model="formData.confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            :state="errors.confirmPassword ? 'error' : 'default'"
            :helper-text="errors.confirmPassword"
            required
            @blur="validateField('confirmPassword')"
            @input="validateField('confirmPassword')"
          />

          <div class="space-y-4">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              选择角色
            </h3>
            <CompRadio
              :checked="formData.role === 'admin'"
              value="admin"
              name="role"
              label="管理员"
              @change="formData.role = $event"
            />
            <CompRadio
              :checked="formData.role === 'user'"
              value="user"
              name="role"
              label="普通用户"
              @change="formData.role = $event"
            />
            <CompRadio
              :checked="formData.role === 'guest'"
              value="guest"
              name="role"
              label="访客"
              @change="formData.role = $event"
            />
          </div>
        </div>

        <!-- Step 3: 配置通知和偏好 -->
        <div v-show="currentStep === 2" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            配置通知和偏好
          </h2>

          <div class="space-y-4">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              通知设置
            </h3>
            <CompCheckbox
              :checked="formData.notifications.email"
              label="Email 通知"
              @change="formData.notifications.email = $event"
            />
            <CompCheckbox
              :checked="formData.notifications.sms"
              label="短信通知"
              @change="formData.notifications.sms = $event"
            />
            <CompCheckbox
              :checked="formData.notifications.push"
              label="推送通知"
              @change="formData.notifications.push = $event"
            />
          </div>

          <div class="space-y-4">
            <CompToggle
              :checked="formData.darkMode"
              label="启用暗色模式"
              @change="formData.darkMode = $event"
            />
            <CompToggle
              :checked="formData.twoFactor"
              label="启用双因素认证"
              @change="formData.twoFactor = $event"
            />
          </div>

          <CompTextarea
            v-model="formData.bio"
            label="个人简介"
            :rows="4"
            placeholder="介绍一下自己..."
          />
        </div>

        <!-- Step 4: 所有信息确认 -->
        <div v-show="currentStep === 3" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            所有信息确认
          </h2>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                基本信息
              </h3>
              <p class="text-gray-900 dark:text-white">
                {{ formData.firstName }} {{ formData.lastName }}
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                {{ formData.email }}
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                {{ formData.phone }}
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                账户
              </h3>
              <p class="text-gray-900 dark:text-white">
                用户名: {{ formData.username }}
              </p>
              <p class="text-gray-900 dark:text-white">
                角色: {{ getRoleLabel(formData.role) }}
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                偏好
              </h3>
              <p class="text-gray-900 dark:text-white">
                暗色模式: {{ formData.darkMode ? "是" : "否" }}
              </p>
              <p class="text-gray-900 dark:text-white">
                双因素认证: {{ formData.twoFactor ? "是" : "否" }}
              </p>
              <p class="text-gray-900 dark:text-white">
                通知:
                {{
                  Object.entries(formData.notifications)
                    .filter(([k, v]) => v)
                    .map(([k]) => k)
                    .join(", ") || "无"
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button
            type="button"
            :disabled="currentStep === 0"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handlePrevious"
          >
            上一步
          </button>

          <button
            type="submit"
            class="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            {{ currentStep === steps.length - 1 ? "完成" : "下一步" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CompStepper from "@/components/Stepper/CompStepper.vue";
import CompFormInput from "@/components/Form/CompFormInput.vue";
import CompTextarea from "@/components/Form/CompTextarea.vue";
import CompCheckbox from "@/components/Form/CompCheckbox.vue";
import CompRadio from "@/components/Form/CompRadio.vue";
import CompToggle from "@/components/Form/CompToggle.vue";
import {
  validateStep,
  validateField as validateFieldUtil,
  createRules,
} from "@/utils/validator.js";
import Schema from "async-validator";

export default {
  name: "ViewQuickSetup",
  components: {
    CompStepper,
    CompFormInput,
    CompTextarea,
    CompCheckbox,
    CompRadio,
    CompToggle,
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        { title: "基本信息", subtitle: "填写您的个人信息" },
        { title: "账户设置", subtitle: "设置用户名和密码" },
        { title: "配置通知和偏好", subtitle: "配置通知和偏好" },
        { title: "所有信息确认", subtitle: "所有信息确认" },
      ],
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "user",
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
        darkMode: false,
        twoFactor: false,
        bio: "",
      },
      errors: {},
    };
  },
  methods: {
    validateField(fieldName) {
      // 清除当前字段的错误
      this.$set(this.errors, fieldName, "");

      // 只验证当前步骤的字段
      if (
        this.currentStep === 0 &&
        !["firstName", "lastName", "email", "phone"].includes(fieldName)
      ) {
        return;
      }
      if (
        this.currentStep === 1 &&
        !["username", "password", "confirmPassword"].includes(fieldName)
      ) {
        return;
      }

      const rules = createRules(this.currentStep, this.formData);
      if (!rules[fieldName]) {
        return;
      }

      const validator = new Schema({ [fieldName]: rules[fieldName] });
      validator.validate(
        { [fieldName]: this.formData[fieldName] },
        (errors) => {
          if (errors && errors.length > 0) {
            this.$set(this.errors, fieldName, errors[0].message);
          } else {
            this.$set(this.errors, fieldName, "");
          }
        }
      );
    },
    async handleNext() {
      try {
        await validateStep(this.currentStep, this.formData);
        // 验证成功，清除错误
        this.errors = {};

        if (this.currentStep === this.steps.length - 1) {
          this.handleSubmit();
        } else {
          this.currentStep++;
        }
      } catch (errors) {
        // 验证失败，显示错误
        const newErrors = {};
        errors.forEach((error) => {
          newErrors[error.field] = error.message;
        });
        this.errors = { ...this.errors, ...newErrors };
      }
    },
    handlePrevious() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    handleSubmit() {
      this.$toast.success({
        title: "设置完成",
        message: "您的账户已成功创建！",
        duration: 3000,
      });

      // 重置表单
      setTimeout(() => {
        this.currentStep = 0;
        this.formData = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          username: "",
          password: "",
          confirmPassword: "",
          role: "user",
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          darkMode: false,
          twoFactor: false,
          bio: "",
        };
        this.errors = {};
      }, 1500);
    },
    getRoleLabel(role) {
      const labels = {
        admin: "管理员",
        user: "普通用户",
        guest: "访客",
      };
      return labels[role] || role;
    },
  },
};
</script>
