import { useUserStoreExternal } from '@/store/modules/user'

function checkPermission(el: { parentNode: { removeChild: (arg0: any) => any } }, binding: { value: any }) {
  // 获取绑定的值，此处为权限
  const { value } = binding
  const useUserStore = useUserStoreExternal()
  // 获取所有的功能指令
  const points = useUserStore.getUserInfo.permission.points
  // 当传入的指令集为数组时
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = points.some((point: any) => {
      return value.includes(point)
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // eslint-disabled-next-line
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  // 在绑定元素的父组件被挂载后调用
  mounted(el: { parentNode: { removeChild: (arg0: any) => any } }, binding: { value: any }) {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  update(el: { parentNode: { removeChild: (arg0: any) => any } }, binding: { value: any }) {
    checkPermission(el, binding)
  }
}
