/**
 * @desc 菜单相关API
 * @author maanpeng
 */
import httpRequest from "@/http/httpRequest";
import generatorConfig from "@/api/origin/config";

let customConfig = generatorConfig();

export const getMenuList = (payload) => {
  return httpRequest.get("/api/menu/list", payload, customConfig);
};

export const getMenuTree = (payload) => {
  return httpRequest.get("/api/menu/tree", payload, customConfig);
};

export const getMenuDetail = (payload) => {
  return httpRequest.get(`/api/menu/${payload}`, {}, customConfig);
};

export const createMenu = (payload) => {
  return httpRequest.post("/api/menu", payload, customConfig);
};

export const updateMenu = (id, payload) => {
  return httpRequest.put(`/api/menu/${id}`, payload, customConfig);
};

export const deleteMenu = (payload) => {
  return httpRequest.delete(`/api/menu/${payload}`, {}, customConfig);
};

