import { defineStore } from 'pinia'
import { piniaStore } from '../index'
import { useCache } from '@/hooks/useCache'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/export.module.scss'

const { wsCache } = useCache()

const useThemeStore = defineStore({
  id: 'theme',
  state: () => {
    return {
      mainColor: wsCache.get(MAIN_COLOR) || DEFAULT_COLOR,
      variables
    }
  },
  persist: {
    enabled: true
  },
  getters: {
    getMainColor(): string {
      return this.mainColor
    },
    getVariables(): any {
      return this.variables
    }
  },
  actions: {
    // 设置主题色
    setMainColor(newColor: string) {
      this.mainColor = newColor

      wsCache.set(MAIN_COLOR, newColor)
    }
  }
})

export function useThemeStoreExternal() {
  return useThemeStore(piniaStore)
}
