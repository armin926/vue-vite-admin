import { defineStore } from 'pinia'
import { piniaStore } from '../index'
import { useCache } from '@/hooks/useCache'
import { localeModules, elLocaleMap } from '@/config/locale'
import type { LocaleState } from '@/config/locale'
import { LANG } from '@/constant'

const { wsCache } = useCache()

export const useLocaleStore = defineStore({
  id: 'locales',
  state: (): LocaleState => localeModules,
  persist: {
    enabled: true
  },
  getters: {
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap
    }
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
      wsCache.set(LANG, localeMap?.lang)
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(piniaStore)
}
