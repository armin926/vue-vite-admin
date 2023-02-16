declare type LoginFormModule = {
  username: string
  password: string
}

declare type Nullable<T> = T | null

declare type KeyOfMap<T> = keyof T

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'

declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

declare interface AxiosConfig {
  params?: any
  data?: any
  url?: string
  method?: AxiosMethod
  headersType?: string
  responseType?: AxiosResponseType
}

declare interface IResponse<T = any> {
  token(TOKEN: string, token: any): unknown
  code: string
  data: T extends any ? T : T & any
  msg: string
}

declare type LocaleType = 'zh-CN' | 'en'

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>
