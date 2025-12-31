import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VeeValidate, { Validator } from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import Toast from "./components/Toast/toast.js";
import "./styles/index.css";
import "uplot/dist/uPlot.min.css";

// 配置 vee-validate 中文错误消息
const dictionary = {
  zh_CN: {
    messages: {
      _default: (field) => `${field}格式不正确`,
      required: (field) => `${field}是必填项`,
      email: (field) => `${field}必须是有效的邮箱地址`,
      min: (field, [length]) => `${field}至少需要${length}个字符`,
      confirmed: (field, [targetField]) => `${field}必须与${targetField}匹配`,
    },
    attributes: {
      firstName: "名字",
      lastName: "姓氏",
      email: "邮箱地址",
      phone: "电话号码",
      username: "用户名",
      password: "密码",
      confirmPassword: "确认密码",
    },
  },
};

Validator.localize("zh_CN", dictionary.zh_CN);
Validator.locale = "zh_CN";

// 自定义密码确认验证规则 - 使用 is 规则
Validator.extend("is", {
  getMessage: (field, params, data) => {
    // 获取字段的中文名称
    const fieldName = data.attribute || dictionary.zh_CN.attributes[field] || field || "字段";
    return `${fieldName}必须与密码匹配`;
  },
  validate: (value, [targetValue]) => {
    // 直接比较值与目标值（targetValue 是 formData.password 的值）
    if (targetValue !== undefined && targetValue !== null) {
      return value === String(targetValue);
    }
    return false;
  },
});

Vue.use(VeeValidate, {
  errorBagName: "errors",
  fieldsBagName: "fields",
  delay: 0,
  locale: "zh_CN",
});

// 使用插件
Vue.use(VueRouter);
Vue.use(Vuex);

// 注册 Toast 到 Vue 原型
Vue.prototype.$toast = Toast;

// 创建 Vue 实例
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
