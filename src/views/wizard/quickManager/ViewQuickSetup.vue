<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.quickSetup") }}
      </h1>
    </div>

    <!-- 快速配置向导 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="space-y-6">
        <!-- 步骤指示器 -->
        <div class="flex items-center justify-between mb-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center flex-1"
          >
            <div class="flex flex-col items-center flex-1">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                  step.completed
                    ? 'bg-green-500 text-white'
                    : step.active
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
                ]"
              >
                <svg
                  v-if="step.completed"
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                :class="[
                  'mt-2 text-sm font-medium',
                  step.active
                    ? 'text-primary-600 dark:text-primary-400'
                    : step.completed
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400',
                ]"
              >
                {{ step.title }}
              </span>
            </div>
            <div
              v-if="index < steps.length - 1"
              :class="[
                'h-0.5 flex-1 mx-2',
                step.completed
                  ? 'bg-green-500'
                  : 'bg-gray-200 dark:bg-gray-700',
              ]"
            ></div>
          </div>
        </div>

        <!-- 步骤内容 -->
        <div class="min-h-[400px]">
          <!-- 步骤 1: 基本信息 -->
          <div v-if="currentStep === 0" class="space-y-4">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              基本信息配置
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  系统名称
                </label>
                <input
                  type="text"
                  v-model="config.systemName"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请输入系统名称"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  管理员邮箱
                </label>
                <input
                  type="email"
                  v-model="config.adminEmail"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
          </div>

          <!-- 步骤 2: 网络配置 -->
          <div v-if="currentStep === 1" class="space-y-4">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              网络配置
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  IP 地址
                </label>
                <input
                  type="text"
                  v-model="config.ipAddress"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="192.168.1.1"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  子网掩码
                </label>
                <input
                  type="text"
                  v-model="config.subnetMask"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="255.255.255.0"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  网关
                </label>
                <input
                  type="text"
                  v-model="config.gateway"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="192.168.1.1"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  DNS 服务器
                </label>
                <input
                  type="text"
                  v-model="config.dns"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="8.8.8.8"
                />
              </div>
            </div>
          </div>

          <!-- 步骤 3: 安全设置 -->
          <div v-if="currentStep === 2" class="space-y-4">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              安全设置
            </h2>
            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  管理员密码
                </label>
                <input
                  type="password"
                  v-model="config.password"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请输入密码"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  确认密码
                </label>
                <input
                  type="password"
                  v-model="config.confirmPassword"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请再次输入密码"
                />
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="config.enableFirewall"
                  class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >启用防火墙</label
                >
              </div>
            </div>
          </div>

          <!-- 步骤 4: 完成 -->
          <div v-if="currentStep === 3" class="text-center py-12">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              配置完成！
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              系统已按照您的配置完成初始化
            </p>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div
          class="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            上一步
          </button>
          <div v-else></div>
          <button
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style="background-color: var(--color-primary-600)"
            onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
            onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
          >
            下一步
          </button>
          <button
            v-else
            @click="finishSetup"
            class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style="background-color: var(--color-primary-600)"
            onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
            onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
          >
            完成配置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "@/composables/useToast";

const toast = useToast();

const currentStep = ref(0);

const steps = computed(() => [
  {
    title: "基本信息",
    completed: currentStep.value > 0,
    active: currentStep.value === 0,
  },
  {
    title: "网络配置",
    completed: currentStep.value > 1,
    active: currentStep.value === 1,
  },
  {
    title: "安全设置",
    completed: currentStep.value > 2,
    active: currentStep.value === 2,
  },
  {
    title: "完成",
    completed: currentStep.value > 3,
    active: currentStep.value === 3,
  },
]);

const config = ref({
  systemName: "",
  adminEmail: "",
  ipAddress: "",
  subnetMask: "",
  gateway: "",
  dns: "",
  password: "",
  confirmPassword: "",
  enableFirewall: true,
});

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const finishSetup = () => {
  toast.success("配置已保存！");
};
</script>
