import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { useCache } from '@/hooks/useCache'

const { wsCache } = useCache()

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return wsCache.get(TIME_STAMP)
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  wsCache.set(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  var currentTime = Date.now()
  // 缓存时间
  var timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}