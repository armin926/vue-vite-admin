import router from './router'
import { useNProgress } from '@/hooks/useNProgress'
import { useCache } from '@/hooks/useCache'
import { TOKEN } from '@/constant'
import { useUserStoreExternal } from '@/store/modules/user'

const { wsCache } = useCache()

const useStore = useUserStoreExternal()

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
        await useStore.getuserInfo()
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