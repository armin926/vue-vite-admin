import { defineStore } from 'pinia'
import { piniaStore } from '../index'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      sidebarOpened: true // 侧边导航栏是否收缩
    }
  },
  persist: {
    enabled: true
  },
  getters: {
    getSidebarOpened(): boolean {
      return this.sidebarOpened
    }
  },
  actions: {
    /**
     * 侧边栏收缩
     */
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})

export function useAppStoreExternal() {
  return useAppStore(piniaStore)
}
