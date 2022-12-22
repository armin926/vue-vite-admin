import router from './router'
import { useNProgress } from '@/hooks/useNProgress'
import { useCache } from '@/hooks/useCache'
import { TOKEN } from '@/constant'
import { useUserStoreExternal } from '@/store/modules/user'
import { usePermissionSotreExternal } from '@/store/modules/permission'

const { wsCache } = useCache()

const useStore = useUserStoreExternal()

const usePermission = usePermissionSotreExternal()

const { start, done } = useNProgress()
// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  start()
  if (wsCache.get(TOKEN)) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if(!useStore.getHasUerInfo) {
        const { permission } = await useStore.getuserInfo()
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await usePermission.filterRoutes(permission.menus)
        
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 没有 token 情况下可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach((to) => {
  done() // 结束Progress
})