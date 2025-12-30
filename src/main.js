import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router/origin";
import i18n from "./lang";
import VCalendar from "v-calendar";

// 导入样式
import "./styles/index.css";
import "v-calendar/style.css";

// 创建应用
const app = createApp(App);

// 使用插件
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VCalendar, {});

// 挂载应用
app.mount("#app");
