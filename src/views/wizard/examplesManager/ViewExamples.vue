<template>
  <div class="space-y-6">
    <div class="card p-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        组件示例
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        展示新创建的组件使用方法
      </p>
    </div>

    <!-- 日期选择器示例 -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        日期选择器组件 (CompDatePicker)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CompDatePicker
          v-model="dateValue"
          label="日期选择"
          mode="date"
        />
        <CompDatePicker
          v-model="timeValue"
          mode="time"
          label="时间选择"
        />
        <CompDatePicker
          v-model="datetimeValue"
          mode="dateTime"
          label="日期时间选择"
        />
      </div>
      <div class="mt-4">
        <CompDatePicker
          v-model="dateRangeValue"
          label="日期范围选择"
          mode="date"
          range
        />
      </div>
      <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <strong>当前值：</strong><br>
          日期: {{ dateValue || '未选择' }}<br>
          时间: {{ timeValue ? JSON.stringify(timeValue) : '未选择' }}<br>
          日期时间: {{ datetimeValue || '未选择' }}<br>
          日期范围: {{ dateRangeValue && dateRangeValue.start && dateRangeValue.end ? `${formatDate(dateRangeValue.start, 'YYYY-MM-DD')} - ${formatDate(dateRangeValue.end, 'YYYY-MM-DD')}` : '未选择' }}
        </p>
      </div>
    </div>

    <!-- Select 组件示例 -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        下拉选择组件 (CompSelect)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CompSelect
          v-model="selectValue"
          :options="selectOptions"
          label="单选"
          placeholder="请选择..."
        />
        <CompSelect
          v-model="multiSelectValue"
          :options="selectOptions"
          label="多选"
          multiple
          placeholder="请选择多个选项..."
        />
        <CompSelect
          v-model="searchableSelectValue"
          :options="selectOptions"
          label="可搜索"
          searchable
          search-placeholder="搜索选项..."
        />
      </div>
      <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <strong>当前值：</strong><br>
          单选: {{ selectValue || '未选择' }}<br>
          多选: {{ Array.isArray(multiSelectValue) ? multiSelectValue.join(', ') : '未选择' }}<br>
          可搜索: {{ searchableSelectValue || '未选择' }}
        </p>
      </div>
    </div>

    <!-- 表单示例 -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        完整表单示例
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CompBaseInput
            v-model="formData.name"
            label="姓名"
            placeholder="请输入姓名"
            required
          />
          <CompSelect
            v-model="formData.gender"
            :options="genderOptions"
            label="性别"
            placeholder="请选择性别"
            required
          />
          <CompDatePicker
            v-model="formData.birthday"
            label="生日"
            placeholder="请选择生日"
          />
          <CompSelect
            v-model="formData.city"
            :options="cityOptions"
            label="城市"
            placeholder="请选择城市"
            searchable
          />
        </div>
        <div class="flex justify-end gap-3 pt-4">
          <CompBaseButton type="secondary" @click="handleReset">
            重置
          </CompBaseButton>
          <CompBaseButton type="primary" native-type="submit">
            提交
          </CompBaseButton>
        </div>
      </form>
      <div v-if="formResult" class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p class="text-sm text-green-800 dark:text-green-300">
          {{ formResult }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CompDatePicker from '@/components/CompDatePicker/CompDatePicker.vue';
import CompSelect from '@/components/CompSelect/CompSelect.vue';
import CompBaseInput from '@/components/CompBaseInput/CompBaseInput.vue';
import CompBaseButton from '@/components/CompBaseButton/CompBaseButton.vue';
import { formatDate } from '@/utils/dayjs';

// 日期选择器数据
const dateValue = ref(null);
const timeValue = ref(null);
const datetimeValue = ref(null);
const dateRangeValue = ref(null);

// Select 数据
const selectValue = ref('');
const multiSelectValue = ref([]);
const searchableSelectValue = ref('');

const selectOptions = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' },
  { label: '选项 4', value: '4' },
  { label: '选项 5', value: '5' }
];

// 表单数据
const formData = ref({
  name: '',
  gender: '',
  birthday: null,
  city: ''
});

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '其他', value: 'other' }
];

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' }
];

const formResult = ref('');

const handleSubmit = () => {
  formResult.value = `表单提交成功！数据：${JSON.stringify(formData.value, null, 2)}`;
  console.log('表单数据:', formData.value);
};

const handleReset = () => {
  formData.value = {
    name: '',
    gender: '',
    birthday: null,
    city: ''
  };
  formResult.value = '';
};
</script>

