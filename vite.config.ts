import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfigExport } from 'vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'
const root = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport =>{
  let env
  const isBuild = command === 'build'
  if(!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  
  const proxyPath = `${env.VITE_API_BASEPATH}`
  
  // 转为正则表达式
  const regExpPath = new RegExp(`^${proxyPath}`)
  
  return {
    base: '/',
    plugins: [
      vue(),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [{
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/es/components/${name.substring(3)}/style/css`
          }
        }]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(root, 'src/icons/svg')],
        // 指定 symbolId 格式
        symbolId: 'icon-[name]',
        // 压缩
        svgoOptions: true
      })
    ],
    server: {
      open: true,
      proxy: {
        [proxyPath]: {
          target: 'https://api.imooc-admin.lgdsunday.club/',
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(regExpPath, '')
          }
        }
      }
    },
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      // css 预处理器
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variables.module.scss";',
          javascriptEnabled: true
        }
      }
    }
  }

}
