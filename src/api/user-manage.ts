import request from '@/config/axios'

/**
 * 获取所有角色
 */
export const getUserManageList = (params: any) => {
  return request.get({ url: '/api/user-manage/list', params })
}

/**
 * 获取指定用户角色
 */
export const userRoles = (id: number | string) => {
  return request.get({ url: `/api/user-manage/role/${id}`})
}

/**
 * 分用户分配角色
 */
export const updateRole = (id: any, roles: any) => {
  return request.post({ url: `/api/user-manage/update-role/${id}`, data: {roles} })
}