import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import layout from '@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import { useUserStoreExternal } from '@/store/modules/user'

export const asyncRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

/**
 * 私有路由
 */
export const privateRoutes: Array<RouteRecordRaw> = asyncRoutes

/**
 * 共有路由
 */
export const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export function resetRouter() {
  const useUserStore = useUserStoreExternal()
  if (useUserStore.getUserInfo?.permission?.menus) {
    const menus = useUserStore.getUserInfo.permission.menus
    menus.forEach((menu: any) => {
      router.removeRoute(menu)
    })
  }
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
