import { defineStore } from 'pinia'
import { login, getUserInfo as userInfo } from '@/api/sys'
import { piniaStore } from '../index'
import md5 from 'md5'
import { appMoudles } from '@/config/app'
import type { AppState } from '@/config/app'
import { useCache } from '@/hooks/useCache'
import { TOKEN, TIME_STAMP } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'

const { wsCache } = useCache()

export const useUserStore = defineStore({
  id: 'user',
  state: (): AppState => appMoudles,
  persist: {
    enabled: true , // 这个配置代表存储生效，而且是整个store都存储
  },
  getters: {
    // 获取 token
    getToken(): string {
      return this.token
    },
    // 获取用户信息
    getUserInfo(): any {
      return this.userInfo
    },
    getHasUerInfo(): boolean {
      return JSON.stringify(this.userInfo) !== '{}'
    }
  },
  actions: {
    /**
     * 登录
     * @param userInfo (用户名和密码)
     * @returns 
     */
    login(userInfo: LoginFormModule) {
      const { password, username } = userInfo
      return new Promise((resolve, reject) => {
        login({username, password:md5(password)}).then(res => {
          // 存 token
          this.token = res.token as unknown as string
          wsCache.set(TOKEN, res.token)
          // 保存登录时间
          setTimeStamp()
          // 跳转至首页
          router.push('/')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 退出登录
     */
    logout() {
      this.token = ''
      this.userInfo = {}
      wsCache.delete(TOKEN)
      wsCache.delete(TIME_STAMP)
      resetRouter()
      router.push('/login')
    },
    /**
     * 获取用户信息
     */
    async getuserInfo() {
      const res = await userInfo()
      this.userInfo = res
      return res
    }
  }
})

// 在components 外部使用 store 需要先创建 pinia
// https://pinia.esm.dev/core-concepts/outside-component-usage.html#single-page-applications
export function useUserStoreExternal() {
  return useUserStore(piniaStore)
}