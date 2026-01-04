import httpRequest from '@/http/httpRequest'
import { loginMock, menuMock } from '../mock'

export const login = (data) => {
  return httpRequest.post('/api/login', data, {
    mock: true,
    mockResponse: loginMock,
  })
}

export const getMenuList = () => {
  return httpRequest.get(
    '/api/menu/list',
    {},
    {
      mock: true,
      mockResponse: menuMock,
    },
  )
}
