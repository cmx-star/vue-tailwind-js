/**
 * @desc 菜单相关API
 * @author maanpeng
 */
import httpRequest from '@/utils/request'

export const getMenuList = (payload) => {
  return httpRequest.get('/api/menu/list', payload)
}

export const getMenuTree = (payload) => {
  return httpRequest.get('/api/menu/tree', payload)
}

export const getMenuDetail = (payload) => {
  return httpRequest.get(`/api/menu/${payload}`)
}

export const createMenu = (payload) => {
  return httpRequest.post('/api/menu', payload)
}

export const updateMenu = (id, payload) => {
  return httpRequest.put(`/api/menu/${id}`, payload)
}

export const deleteMenu = (payload) => {
  return httpRequest.delete(`/api/menu/${payload}`)
}
