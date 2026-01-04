import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// 递归搜索文件以检查全局唯一性
function findFileRecursive(dir, fileName) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const found = findFileRecursive(filePath, fileName);
      if (found) return found;
    } else if (file.toLowerCase() === fileName.toLowerCase()) {
      return filePath;
    }
  }
  return null;
}

/**
 * 格式化并获取合法的页面名称
 */
async function getUniquePageName(viewsRoot) {
  while (true) {
    let rawPageName = await question(
      "请输入页面名称 (例如: Settings, Dashboard): "
    );

    if (!rawPageName) {
      console.error("\x1b[31m%s\x1b[0m", "❌ 错误: 页面名称不能为空！");
      continue;
    }

    // 格式化名称：强制以 View 开头且首字母大写
    let pageName = rawPageName;
    if (!pageName.toLowerCase().startsWith("view")) {
      pageName = `View${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
    } else if (pageName.toLowerCase().startsWith("view")) {
      const suffix = pageName.slice(4);
      if (suffix) {
        pageName = `View${suffix.charAt(0).toUpperCase() + suffix.slice(1)}`;
      } else {
        pageName = "View";
      }
    }

    const fileName = `${pageName}.vue`;
    const existingPath = findFileRecursive(viewsRoot, fileName);

    if (existingPath) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `❌ 错误: 页面名称 "${fileName}" 已在项目中存在！`
      );
      console.error("\x1b[33m%s\x1b[0m", `位置: ${existingPath}`);
      console.log("\x1b[36m%s\x1b[0m", "请输入一个新的名称。");
    } else {
      return pageName;
    }
  }
}

async function createPage() {
  console.log("\x1b[36m%s\x1b[0m", "--- 页面创建脚本 (Enhanced V6) ---");

  const viewsRoot = path.resolve(__dirname, "../src/views");

  // 1. 输入主目录
  let mainDir = "";
  while (!mainDir) {
    mainDir = await question("请输入主目录 (例如: system, overview): ");
    if (!mainDir) {
      console.error("\x1b[31m%s\x1b[0m", "❌ 错误: 主目录不能为空！");
    }
  }

  // 2. 多级子目录循环
  let currentPathSegments = [mainDir];
  while (true) {
    const currentRelativePath = currentPathSegments.join("/");
    const hasSubDir = await question(
      `是否在 ${currentRelativePath} 下创建子目录？(Y/N, 默认 N): `
    );

    if (hasSubDir.toUpperCase() === "Y") {
      const subDir = await question("请输入子目录名称: ");
      if (subDir) {
        currentPathSegments.push(subDir);
      } else {
        console.error("\x1b[31m%s\x1b[0m", "❌ 错误: 子目录名称不能为空！");
      }
    } else {
      break;
    }
  }

  // 3. 获取不重复的页面名称
  const pageName = await getUniquePageName(viewsRoot);
  const fileName = `${pageName}.vue`;

  // 构建目标路径
  const targetDir = path.join(viewsRoot, ...currentPathSegments);
  const filePath = path.join(targetDir, fileName);
  const componentsDir = path.join(targetDir, "components");

  // 4. 创建目录 (递归)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log("\x1b[32m%s\x1b[0m", `📁 创建目录: ${targetDir}`);
  }

  // 5. 检查并补充 components 目录
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
    console.log(
      "\x1b[32m%s\x1b[0m",
      `📦 自动补充 components 目录: ${componentsDir}`
    );
  }

  // 6. 写入标准 Vue 模板内容 (包含完整 Options API)
  const template = `<template>
  <div class="p-6">
    <!-- 头部区域 -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CompIcon name="layout" :size="24" class="text-blue-600 dark:text-blue-400" />
          {{ title }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          当前页面的简短描述与操作引导
        </p>
      </div>
      <div class="flex gap-2">
        <button 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          @click="handlePrimaryAction"
        >
          主要操作
        </button>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div v-for="item in stats" :key="item.label" class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ item.label }}</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ item.value || '0.00' }}</div>
      </div>
    </div>

    <!-- 主展示区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">详细列表</h2>
        <div class="flex items-center gap-2">
           <!-- 工具栏插槽 -->
           <input 
             v-model="searchQuery"
             type="text" 
             placeholder="搜索关键词..."
             class="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
           />
        </div>
      </div>
      <div class="p-6">
        <div v-if="loading" class="flex flex-col items-center justify-center min-h-[300px]">
           <CompIcon name="loader-2" :size="32" class="animate-spin text-blue-600 mb-2" />
           <p class="text-gray-500">正在加载数据...</p>
        </div>
        <div v-else class="min-h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
          <p class="text-gray-500 dark:text-gray-400">暂无内容，请开始您的开发...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @name ${pageName}
 * @description 页面组件描述
 */
export default {
  name: '${pageName}',
  
  components: {
    // 注册局部组件
  },

  props: {
    // 接收父组件传参
  },

  data() {
    return {
      title: '${pageName.replace("View", "")}',
      loading: false,
      searchQuery: '',
      stats: [
        { label: '核心指标 A', value: '1,234' },
        { label: '关键转化 B', value: '85%' },
        { label: '活跃用户 C', value: '567' }
      ],
      tableData: [],
    };
  },

  computed: {
    /**
     * 计算属性示例
     */
    filteredData() {
      if (!this.searchQuery) return this.tableData;
      return this.tableData.filter(item => 
        JSON.stringify(item).toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },

  watch: {
    /**
     * 监听器示例
     */
    searchQuery(newVal, oldVal) {
      console.log('搜索词变更:', newVal);
      // 处理搜索防抖等逻辑
    }
  },

  // --- 生命周期钩子 ---
  
  created() {
    // 组件实例被创建，属性已绑定，DOM 未挂载
  },

  mounted() {
    // DOM 已挂载，可以进行异步数据请求
    this.fetchData();
  },

  beforeDestroy() {
    // 实例销毁前，清理定时器、解绑事件等
  },

  methods: {
    /**
     * 获取页面初始数据
     */
    async fetchData() {
      this.loading = true;
      try {
        console.log('${pageName} 请求数据...');
        // await api.getData();
      } catch (error) {
        console.error('加载失败:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 处理主要操作
     */
    handlePrimaryAction() {
      alert('触发主要操作');
    }
  },
};
</script>

<style scoped>
/* 页面专属样式，建议使用原子类 TailwindCSS */
</style>
`;

  fs.writeFileSync(filePath, template);
  console.log("\x1b[32m%s\x1b[0m", `✔ 成功创建标准页面文件: ${filePath}`);

  rl.close();
}

createPage().catch((err) => {
  console.error("\x1b[31m%s\x1b[0m", "❌ 发生错误:");
  console.error(err);
  rl.close();
});
