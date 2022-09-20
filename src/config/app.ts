import { useCache } from '@/hooks/useCache'
import { TOKEN } from '@/constant'

const { wsCache } = useCache()


export interface AppState {
  token: string // token
  userInfo: any // 用户信息
  hasUserInfo: boolean // 是否存在用户信息
}

export const appMoudles:AppState = {
  token: wsCache.get(TOKEN) || '',
  userInfo: {},
  hasUserInfo: false
}
