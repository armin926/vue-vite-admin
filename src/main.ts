import { createApp } from 'vue'
// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import './styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:svg-icons-register' // 引入注册脚本
import SvgIcon from '@/components/SvgIcon.vue' // 引入组件
import './permission' // 登录鉴权
// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus/index'
// filter
import installFilter from '@/filters'
import installDirective from '@/directives'
const setupApp = async () => {
  const app = createApp(App)

  await setupI18n(app)
  // store
  setupStore(app)

  // 创建路由
  setupRouter(app)

  setupElementPlus(app)

  installFilter(app)

  installDirective(app)

  app.component('svg-icon', SvgIcon)

  app.mount('#app')
}

setupApp()
