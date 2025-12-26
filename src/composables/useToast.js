import { ref } from "vue";

const toastInstance = ref(null);

export function useToast() {
  const success = (message, duration = 3000) => {
    if (toastInstance.value) {
      toastInstance.value.success(message, duration);
    }
  };

  const error = (message, duration = 3000) => {
    if (toastInstance.value) {
      toastInstance.value.error(message, duration);
    }
  };

  const warning = (message, duration = 3000) => {
    if (toastInstance.value) {
      toastInstance.value.warning(message, duration);
    }
  };

  const info = (message, duration = 3000) => {
    if (toastInstance.value) {
      toastInstance.value.info(message, duration);
    }
  };

  return {
    success,
    error,
    warning,
    info,
  };
}

export function setToastInstance(instance) {
  toastInstance.value = instance;
}
