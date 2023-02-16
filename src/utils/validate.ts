/**
 * 判断是否为外部资源
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
