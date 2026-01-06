/**
 * @desc 角色相关API
 * @author maanpeng
 */
import httpRequest from '@/utils/request'

export const getRoleList = (payload) => {
  return httpRequest.get('/api/role/list', payload)
}

export const getRoleDetail = (payload) => {
  return httpRequest.get(`/api/role/${payload}`)
}

export const createRole = (payload) => {
  return httpRequest.post('/api/role', payload)
}

export const updateRole = (id, payload) => {
  return httpRequest.put(`/api/role/${id}`, payload)
}

export const deleteRole = (payload) => {
  return httpRequest.delete(`/api/role/${payload}`)
}

export const assignPermissions = (id, payload) => {
  return httpRequest.post(`/api/role/${id}/permissions`, payload)
}
