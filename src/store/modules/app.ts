import { defineStore } from 'pinia'
import { piniaStore } from '../index'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      sidebarOpened: true
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
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})

export function useAppStoreExternal() {
  return useAppStore(piniaStore)
}