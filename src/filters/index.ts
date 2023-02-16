import dayjs from 'dayjs'
import { App } from 'vue'

const dateFilter = (
  val: string | number | Date | dayjs.Dayjs | null | undefined,
  format = 'YYYY-MM-DD'
) => {
  let value = val
  if (!isNaN(val as number)) {
    value = parseInt(val as any)
  }

  return dayjs(value).format(format)
}

export default (app: App) => {
  const ap = app
  ap.config.globalProperties.$filters = {
    dateFilter
  }
}
