/**
 * @desc 账户相关API
 * @author maanpeng
 */
import httpRequest from '@/utils/request'

export const getAccountList = (payload) => {
  return httpRequest.get('/api/account/list', payload)
}

export const getAccountDetail = (payload) => {
  return httpRequest.get(`/api/account/${payload}`)
}

export const createAccount = (payload) => {
  return httpRequest.post('/api/account', payload)
}

export const updateAccount = (id, payload) => {
  return httpRequest.put(`/api/account/${id}`, payload)
}

export const deleteAccount = (id) => {
  return httpRequest.delete(`/api/account/${id}`)
}

export const resetPassword = (id, payload) => {
  return httpRequest.put(`/api/account/${id}/password`, payload)
}

export const assignRoles = (id, payload) => {
  return httpRequest.post(`/api/account/${id}/roles`, payload)
}
