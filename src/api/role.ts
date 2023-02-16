import request from '@/config/axios'

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request.get({ url: '/api/role/list' })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = (roleId: string | number) => {
  return request.get({ url: `/api/role/permission/${roleId}` })
}

/**
 * 为角色修改权限
 */
export const distributePermission = (data: any) => {
  return request.post({ url: '/api/role/distribute-permission', data })
}
