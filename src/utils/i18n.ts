import { useI18n } from '@/hooks/useI18n'
import { watch } from 'vue'
import { useLocaleStoreWithOut } from '@/store/modules/locale'

export function generateTitle(title: string) {
  const { t } = useI18n()
  
  return t('route.' + title)
}

export function watchSwitchLang(...cbs: any[]) {
  const useLocaleStore = useLocaleStoreWithOut()
  const language = useLocaleStore.getCurrentLocale.lang
  watch(() => language, () => {
    cbs.forEach(cb => cb(language))
  })
}