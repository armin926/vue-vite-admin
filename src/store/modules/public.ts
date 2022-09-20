import { defineStore } from 'pinia'
import { piniaStore } from '../index'
import variables from '@/styles/export.module.scss'

export const usePublicStore = defineStore({
  id: 'public',
  state: () => {
    return {
      cssVar: variables
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