import dayjs from 'dayjs'

const dateFilter = (val: string | number | Date | dayjs.Dayjs | null | undefined, format = 'YYYY-MM-DD') => {
  if (!isNaN(val as number)) {
    val = parseInt(val as any)
  }

  return dayjs(val).format(format)
}

export default (app: any) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
