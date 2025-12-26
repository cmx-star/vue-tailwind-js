/**
 * @desc API配置检查
 * @author maanpeng
 */

// token失败的状态码
export const tokenFaildStatus = [];

// 不需要token的url
export const notNeedTokenUrl = [
  "/api/user/login",
  "/api/auth/refresh",
  "/api/user/regUser",
  "/api/user/loginByPhoneNumber",
];

// 需要xhr下载的url
export const downloadUrl = [];

