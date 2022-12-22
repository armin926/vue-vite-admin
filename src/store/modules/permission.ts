import { defineStore } from 'pinia'
import { piniaStore } from '../index'
import { publicRoutes, privateRoutes } from '@/router'

// 专门处理权限路由的模块
export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      // 路由表：初始拥有静态路由表
      routes: publicRoutes
    }
  },
  persist: {
    enabled: true
  },
  actions: {
    /**
     * 增加路由
     */
    setRoutes(newRoutes: any) {
      // 永远在静态路由的基础上增加新路由
      this.routes = [...publicRoutes, ...newRoutes]
    },
    /**
     * 根据权限筛选路由
     */
    filterRoutes(menus: any[]) {
      const routes = []
      // 路由权限匹配
      
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      this.setRoutes(routes)
      return routes
    }
  }
})

export function usePermissionSotreExternal() {
  return usePermissionStore(piniaStore)
}