<template>
  <div class="p-6">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Table 表格示例</h1>
      
      <CompTable 
        :columns="columns" 
        :data="tableData" 
        :striped="false" 
        :hoverable="true" 
        :selectable="true"
        max-height="500px"
        @sort="handleSort"
        @selection-change="handleSelectionChange"
      >
        <template #cell-action="{ row }">
          <div class="flex items-center">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-400 hover:underline" @click.prevent="handleEdit(row)">
              Edit
            </a>
            <a href="#" class="font-medium text-red-600 dark:text-red-400 hover:underline ms-3" @click.prevent="handleRemove(row)">
              Remove
            </a>
          </div>
        </template>
      </CompTable>
    </div>
  </div>
</template>

<script>
import CompTable from '@/components/Table/CompTable.vue';

export default {
  name: 'ViewNodeManagement',
  components: {
    CompTable
  },
  data() {
    return {
      columns: [
        { key: 'name', label: 'Product name' },
        { key: 'color', label: 'Color', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'action', label: 'Edit', align: 'right', srOnly: true }
      ],
      tableData: [
        { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
        { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
        { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
        { name: 'Google Pixel Phone', color: 'Gray', category: 'Phone', price: '$799' },
        { name: 'Apple Watch 5', color: 'Red', category: 'Wearables', price: '$999' },
        { name: 'Apple iMac', color: 'Silver', category: 'PC', price: '$2999' },
        { name: 'Apple AirPods', color: 'White', category: 'Accessories', price: '$399' },
        { name: 'iPad Pro', color: 'Gold', category: 'Tablet', price: '$699' },
        { name: 'Magic Keyboard', color: 'Black', category: 'Accessories', price: '$99' },
        { name: 'Apple TV 4K', color: 'Black', category: 'TV', price: '$179' },
        { name: 'AirTag', color: 'Silver', category: 'Accessories', price: '$29' }
      ]
    };
  },
  methods: {
    handleEdit(row) {
      this.$toast.info({
        title: 'Edit Product',
        message: `Editing: ${row.name}`,
        duration: 2000
      });
    },
    handleRemove(row) {
      this.$toast.danger({
        title: 'Remove Product',
        message: `Removing: ${row.name}`,
        duration: 2000
      });
    },
    handleSort({ key, order }) {
      this.$toast.info({
        title: 'Sort Changed',
        message: `Sorting by ${key} (${order})`,
        duration: 2000
      });
    },
    handleSelectionChange(selectedRows) {
      this.$toast.success({
        title: 'Selection Changed',
        message: `Selected ${selectedRows.length} items`,
        duration: 2000
      });
    }
  }
};
</script>
