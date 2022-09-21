import { useI18n } from '@/hooks/useI18n'



export function generateTitle(title: string) {
  const { t } = useI18n()
  
  return t('route.' + title)
}