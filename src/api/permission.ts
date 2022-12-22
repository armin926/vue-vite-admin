import request from '@/config/axios'

/**
 * 获取所有权限
 */
export const permissionList = () => {
  return request.get({ url: '/api/permission/list' })
}
