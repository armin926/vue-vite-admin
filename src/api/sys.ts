import request from '@/config/axios'

const base_url = '/api/sys'
/**
 * 登录
 */
export const login = (data: LoginFormModule): Promise<IResponse> => {
  return request.post({ url: `${base_url}/login`, data })
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request.get({ url: `${base_url}/profile` })
}
