import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { config } from './config'
import { useUserStoreExternal } from '@/store/modules/user'
import { isCheckTimeout } from '@/utils/auth'


const { result_code, request_timeout } = config

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEPATH,
  timeout: request_timeout
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const useStore = useUserStoreExternal()
  // 添加 icode（30天需要重新获取一次）
  if(config && config.headers) {
    config.headers['icode'] = '10BEC321FEFD6ADB'
    
    if(useStore.getToken) {
      if(isCheckTimeout()) {
        // token超时，自动退出登录
        useStore.logout()
        return Promise.reject(new Error('token 失效,请重新登录'))
      }
      // 如果 token 存在，注入token
      config.headers['Authorization'] = `Bearer ${useStore.getToken}`
    }
  }
  return config
}, (error:AxiosError) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse<any>) => {
  const { message, data, code } = response.data
  const useStore = useUserStoreExternal()
  // 根据 code 值判断是否成功
  if (code === result_code) {
    return data
  } else if(code === 401) {
    // token 超时
    useStore.logout()
  } else {
    ElMessage({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
}, (error:AxiosError) => {
  ElMessage({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

export default service