// https://cn.vuejs.org/guide/typescript/options-api.html#augmenting-global-properties
import dayjs from 'dayjs'

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      dateFilter(
        val: string | number | Date | dayjs.Dayjs | null | undefined,
        format = 'YYYY-MM-DD'
      ): string
    }
  }
}

export {}
