/**
 * @desc 账户相关API
 * @author maanpeng
 */
import httpRequest from "@/http/httpRequest";
import generatorConfig from "@/api/origin/config";

let customConfig = generatorConfig();

export const getAccountList = (payload) => {
  return httpRequest.get("/api/account/list", payload, customConfig);
};

export const getAccountDetail = (payload) => {
  return httpRequest.get(`/api/account/${payload}`, {}, customConfig);
};

export const createAccount = (payload) => {
  return httpRequest.post("/api/account", payload, customConfig);
};

export const updateAccount = (id, payload) => {
  return httpRequest.put(`/api/account/${id}`, payload, customConfig);
};

export const deleteAccount = (payload) => {
  return httpRequest.delete(`/api/account/${payload}`, {}, customConfig);
};

export const resetPassword = (id, payload) => {
  return httpRequest.put(`/api/account/${id}/password`, payload, customConfig);
};

export const assignRoles = (id, payload) => {
  return httpRequest.post(`/api/account/${id}/roles`, payload, customConfig);
};

