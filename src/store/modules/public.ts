import { defineStore } from 'pinia'
import { piniaStore } from '../index'
import variables from '@/styles/export.module.scss'
import { MAIN_COLOR } from '@/constant'
import { generateColors } from '@/utils/theme'
import { useCache } from '@/hooks/useCache'

const { wsCache } = useCache()

const cssVars = { ...variables, ...generateColors(wsCache.get(MAIN_COLOR)) }

export const usePublicStore = defineStore({
  id: 'public',
  state: () => {
    return {
      cssVar: cssVars
    }
  },
  persist: {
    enabled: true
  },
  getters: {
    // 获取 css
    getCss(): any {
      return this.cssVar
    }
  }
})

export function usePublicStoreExternal() {
  return usePublicStore(piniaStore)
}