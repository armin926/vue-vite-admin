import { useI18n } from '@/hooks/useI18n'

const { t } = useI18n()

export const validatePassword = () => {
  return (_rule: any, value: string | any[], callback: (arg0: Error | undefined) => void) => {
    if (value.length < 6) {
      callback(new Error(t('login.passwordRule')))
    } else {
      callback(undefined)
    }
  }
}
