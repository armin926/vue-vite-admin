import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import type { App } from 'vue'

const piniaStore = createPinia()
piniaStore.use(piniaPersist)

export const setupStore = (app: App<Element>) => {
  app.use(piniaStore)
}
export { piniaStore }
