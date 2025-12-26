import axios from "axios";
import { storage } from "@/utils/storage";
import { useToast } from "@/composables/useToast";
import md5 from "js-md5";
import dayjs from "@/utils/dayjs";
import mockApi from "@/api/mock/";

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 自定义配置：不需要token的请求
    if (
      config.customConfig &&
      (config.customConfig.isNotNeedToken ||
        (config.customConfig.notNeedTokenUrl &&
          config.customConfig.notNeedTokenUrl.includes(config.url)))
    ) {
      return config;
    }

    // 添加 token（从customConfig中获取，如果没有则从storage获取）
    let token = null;
    if (
      config.customConfig &&
      config.customConfig.axiosConfig &&
      config.customConfig.axiosConfig.headers
    ) {
      token =
        config.customConfig.axiosConfig.headers.token ||
        config.customConfig.axiosConfig.headers.Authorization?.replace(
          "Bearer ",
          ""
        );
    }
    if (!token) {
      token = storage.get("token");
    }

    if (token) {
      // 根据请求类型添加token
      if (
        config.method === "post" ||
        config.method === "put" ||
        config.method === "patch"
      ) {
        if (
          config.headers["Content-Type"] &&
          config.headers["Content-Type"].includes("application/json")
        ) {
          // JSON格式，将token添加到请求体中
          try {
            const data =
              typeof config.data === "string"
                ? JSON.parse(config.data)
                : config.data || {};
            data.token = token;
            config.data = JSON.stringify(data);
          } catch (e) {
            // 如果解析失败，直接添加token到headers
            config.headers.Authorization = `Bearer ${token}`;
          }
        } else if (
          config.headers["Content-Type"] &&
          config.headers["Content-Type"].includes(
            "application/x-www-form-urlencoded"
          )
        ) {
          // Form格式，添加到form data中
          const formData = new URLSearchParams(config.data);
          formData.append("token", token);
          config.data = formData.toString();
        } else {
          // 其他格式，添加到headers
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        // GET请求，添加到params或headers
        if (config.params) {
          config.params.token = token;
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    // 自定义请求拦截器
    if (config.customConfig && config.customConfig.interceptorsReq) {
      config = config.customConfig.interceptorsReq.call(this, config);
    }

    // 添加时间戳防止缓存（仅GET请求）
    if (config.method === "get" && !config.customConfig?.disableTimestamp) {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 数据缓存处理
    if (response.config && response.config.headers && response.config.headers.cacheKey) {
      const res = response.data;
      if (res && (res.code === 200 || res.code === 0 || res.status === 0)) {
        localStorage.setItem(
          response.config.headers.cacheKey,
          JSON.stringify(res)
        );
        localStorage.setItem(
          response.config.headers.cacheKey + ":Time",
          dayjs().unix()
        );
      } else {
        localStorage.removeItem(response.config.headers.cacheKey);
        localStorage.removeItem(response.config.headers.cacheKey + ":Time");
      }
    }

    // 自定义响应拦截器
    if (
      response.config &&
      response.config.customConfig &&
      response.config.customConfig.interceptorsRes
    ) {
      return response.config.customConfig.interceptorsRes.call(this, response);
    }

    const res = response.data;

    // 根据实际后端接口调整
    // 支持多种返回格式：{ code: 200, data: {}, message: '' } 或 { status: 0, data: {}, info: '' }
    const code = res.code !== undefined ? res.code : res.status;
    const message = res.message || res.info || "请求失败";

    // 登录超时或token失效处理
    if (code === -9 || code === -15 || code === -14 || code === 401) {
      const toast = useToast();
      toast.error("登录已过期，请重新登录");
      storage.remove("token");
      storage.remove("userInfo");
      setTimeout(() => {
        window.location.href = "/#/login";
      }, 1000);
      return Promise.reject(new Error(message));
    }

    // 业务错误处理
    if (code !== 200 && code !== 0) {
      const toast = useToast();

      // 自定义配置：是否需要显示错误提示
      if (!response.config?.customConfig?.silentError) {
        toast.error(message);
      }

      return Promise.reject(new Error(message));
    }

    // 返回完整的响应对象（与参考项目一致）
    return res;
  },
  (error) => {
    console.error("Response error:", error);
    const toast = useToast();

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          toast.error("未授权，请重新登录");
          storage.remove("token");
          storage.remove("userInfo");
          setTimeout(() => {
            window.location.href = "/#/login";
          }, 1000);
          break;
        case 403:
          toast.error("拒绝访问");
          break;
        case 404:
          toast.error("请求的资源不存在");
          break;
        case 500:
          toast.error("服务器错误");
          break;
        case 502:
          toast.error("网关错误");
          break;
        case 503:
          toast.error("服务不可用");
          break;
        case 504:
          toast.error("网关超时");
          break;
        default:
          toast.error(data?.message || data?.info || `请求失败 (${status})`);
      }
    } else if (error.request) {
      toast.error("网络错误，请检查网络连接");
    } else {
      toast.error(error.message || "请求失败");
    }

    return Promise.reject(error);
  }
);

/**
 * 带缓存的请求处理
 * @param {string} url - 请求地址
 * @param {object} options - 请求参数
 * @param {number} cacheTime - 缓存时间（秒）
 * @returns {Promise}
 */
function getCachedData(url, options, cacheTime) {
  const cacheKey = md5(url + JSON.stringify(options));
  const cacheCreateTime = localStorage.getItem(cacheKey + ":Time");

  if (
    cacheCreateTime &&
    parseInt(dayjs().unix()) - parseInt(cacheCreateTime) < cacheTime
  ) {
    const cacheData = localStorage.getItem(cacheKey);
    if (cacheData) {
      try {
        return Promise.resolve(JSON.parse(cacheData));
      } catch (e) {
        // 缓存数据解析失败，清除缓存
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheKey + ":Time");
      }
    }
  } else {
    // 清除过期缓存
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheKey + ":Time");
  }

  return null;
}

/**
 * 封装请求方法，支持自定义配置
 */
const httpRequest = {
  /**
   * GET请求
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {function|object} customConfig - 自定义配置（函数或对象）
   * @returns {Promise}
   */
  get(url, params = {}, customConfig = {}) {
    // 如果customConfig是函数，调用它获取配置
    const config =
      typeof customConfig === "function" ? customConfig(url) : customConfig;

    // mock api（开发环境）
    if (import.meta.env.DEV) {
      const ret = mockApi(url);
      if (ret) {
        // mock 数据需要经过响应拦截器处理，所以创建一个模拟的 response 对象
        const mockResponse = {
          data: ret,
          config: {
            customConfig: config,
            headers: {}, // 确保 headers 存在，避免访问 undefined
          },
        };
        // 手动调用响应拦截器
        return request.interceptors.response.handlers[0].fulfilled(mockResponse);
      }
    }

    return request({
      method: "get",
      url,
      params,
      customConfig: config,
    });
  },

  /**
   * POST请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {function|object} customConfig - 自定义配置（函数或对象）
   * @returns {Promise}
   */
  post(url, data = {}, customConfig = {}) {
    // 如果customConfig是函数，调用它获取配置
    const config =
      typeof customConfig === "function" ? customConfig(url) : customConfig;

    // mock api（开发环境）
    if (import.meta.env.DEV) {
      const ret = mockApi(url);
      if (ret) {
        // mock 数据需要经过响应拦截器处理，所以创建一个模拟的 response 对象
        const mockResponse = {
          data: ret,
          config: {
            customConfig: config,
            headers: {}, // 确保 headers 存在，避免访问 undefined
          },
        };
        // 手动调用响应拦截器
        return request.interceptors.response.handlers[0].fulfilled(mockResponse);
      }
    }

    // 缓存处理
    if (data._cacheTime) {
      const cachedData = getCachedData(url, data, data._cacheTime);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
    }

    // 自定义事件：请求前拦截
    if (config.beforeRequest) {
      const result = config.beforeRequest.apply(this, arguments);
      if (result !== undefined && result !== null) {
        return Promise.resolve(result);
      }
    }

    const axiosConfig = {
      method: "post",
      url,
      data,
      customConfig: config,
    };

    // 设置缓存key
    if (data._cacheTime) {
      const cacheKey = md5(url + JSON.stringify(data));
      axiosConfig.headers = {
        ...axiosConfig.headers,
        cacheKey,
      };
      // 移除缓存时间参数，避免发送到服务器
      const { _cacheTime, ...requestData } = data;
      axiosConfig.data = requestData;
    }

    // 合并自定义的axiosConfig
    if (config.axiosConfig) {
      Object.assign(axiosConfig, config.axiosConfig);
    }

    return request(axiosConfig).then((res) => {
      // 自定义事件：请求后处理
      if (config.afterRequest) {
        const result = config.afterRequest.apply(this, [...arguments, res]);
        if (result !== undefined) {
          return result;
        }
      }
      return res;
    });
  },

  /**
   * PUT请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {function|object} customConfig - 自定义配置（函数或对象）
   * @returns {Promise}
   */
  put(url, data = {}, customConfig = {}) {
    const config =
      typeof customConfig === "function" ? customConfig(url) : customConfig;
    return request({
      method: "put",
      url,
      data,
      customConfig: config,
    });
  },

  /**
   * DELETE请求
   * @param {string} url - 请求地址
   * @param {object} params - 请求参数
   * @param {function|object} customConfig - 自定义配置（函数或对象）
   * @returns {Promise}
   */
  delete(url, params = {}, customConfig = {}) {
    const config =
      typeof customConfig === "function" ? customConfig(url) : customConfig;
    return request({
      method: "delete",
      url,
      params,
      customConfig: config,
    });
  },

  /**
   * PATCH请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求数据
   * @param {function|object} customConfig - 自定义配置（函数或对象）
   * @returns {Promise}
   */
  patch(url, data = {}, customConfig = {}) {
    const config =
      typeof customConfig === "function" ? customConfig(url) : customConfig;
    return request({
      method: "patch",
      url,
      data,
      customConfig: config,
    });
  },
};

export default httpRequest;
