/**
 * @desc 角色相关API
 * @author maanpeng
 */
import httpRequest from '@/http/httpRequest'
import generatorConfig from '@/api/origin/config'

let customConfig = generatorConfig()

export const getRoleList = (payload) => {
  return httpRequest.get('/api/role/list', payload, customConfig)
}

export const getRoleDetail = (payload) => {
  return httpRequest.get(`/api/role/${payload}`, {}, customConfig)
}

export const createRole = (payload) => {
  return httpRequest.post('/api/role', payload, customConfig)
}

export const updateRole = (id, payload) => {
  return httpRequest.put(`/api/role/${id}`, payload, customConfig)
}

export const deleteRole = (payload) => {
  return httpRequest.delete(`/api/role/${payload}`, {}, customConfig)
}

export const assignPermissions = (id, payload) => {
  return httpRequest.post(`/api/role/${id}/permissions`, payload, customConfig)
}
