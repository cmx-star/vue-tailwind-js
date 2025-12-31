import Vue from "vue";
import CompToast from "./CompToast.vue";

const ToastConstructor = Vue.extend(CompToast);

let instance;
let instances = [];
let seed = 1;

const Toast = function (options) {
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }

  const id = "toast_" + seed++;
  const userOnClose = options.onClose;

  options.onClose = function () {
    Toast.close(id, userOnClose);
  };

  instance = new ToastConstructor();

  // 设置数据
  Object.keys(options).forEach((key) => {
    instance[key] = options[key];
  });

  instance.id = id;
  instance.visible = true; // 先设置为可见

  instance.$mount();
  document.body.appendChild(instance.$el);

  // 使用 nextTick 确保 DOM 已渲染
  instance.$nextTick(() => {
    // 计算垂直偏移量
    let verticalOffset = options.offset || 20;
    instances.forEach((item) => {
      verticalOffset += item.$el.offsetHeight + 16;
    });

    instance.$el.style.position = "fixed";
    instance.$el.style.top = verticalOffset + "px";
    instance.$el.style.left = "50%";
    instance.$el.style.transform = "translateX(-50%)";
    instance.$el.style.zIndex = 9999;
    instance.$el.style.minWidth = "300px";
    instance.$el.style.maxWidth = "500px";
  });

  instances.push(instance);

  return instance;
};

["success", "warning", "info", "danger", "dark"].forEach((type) => {
  Toast[type] = (options) => {
    if (typeof options === "string") {
      options = {
        message: options,
      };
    }
    options.type = type;
    return Toast(options);
  };
});

Toast.close = function (id, userOnClose) {
  const len = instances.length;
  let index = -1;
  let removedHeight;

  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === "function") {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }

  if (len <= 1 || index === -1 || index > instances.length - 1) return;

  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el;
    dom.style.top = parseInt(dom.style.top, 10) - removedHeight - 16 + "px";
  }
};

Toast.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Toast;
