import { useCache } from '@/hooks/useCache'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { LANG } from '@/constant'

const { wsCache } = useCache()

export const elLocaleMap: { [key: string]: any } = {
  'zh-CN': zhCn,
  en: en
}
export interface LocaleState {
  currentLocale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}

export const localeModules: LocaleState = {
  currentLocale: {
    lang: wsCache.get(LANG) || 'zh-CN',
    elLocale: elLocaleMap[wsCache.get(LANG) || 'zh-CN']
  },
  // 多语言
  localeMap: [
    {
      lang: 'zh-CN',
      name: '简体中文'
    },
    {
      lang: 'en',
      name: 'English'
    }
  ]
}
