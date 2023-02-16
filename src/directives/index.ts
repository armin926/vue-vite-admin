import permission from './permission'
import type { App } from 'vue'

export default (app: App<Element>) => {
  app.directive('permission', permission)
}
