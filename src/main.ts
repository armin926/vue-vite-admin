import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import './styles/index.scss'
import 'virtual:svg-icons-register' // 引入注册脚本
import SvgIcon from '@/components/SvgIcon.vue' // 引入组件
import './permission' // 登录鉴权
// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus/index'
const setupApp = async () => {
  const app = await createApp(App)
  // store
  setupStore(app)

  // 创建路由
  setupRouter(app)

  setupElementPlus(app)
  
  app.component('svg-icon', SvgIcon)

  
  app.mount('#app')
}

setupApp()
