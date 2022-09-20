export const validatePassword = () => {
  return (_rule: any, value: string | any[], callback: (arg0: Error | undefined) => void) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback(undefined)
    }
  }
}