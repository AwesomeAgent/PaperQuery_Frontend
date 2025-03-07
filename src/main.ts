import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import { store } from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './input.css'

// 全局样式
import 'virtual:uno.css'
import '@/styles/var.less'
import '@/styles/mixin.less'
import '@/styles/global.less'
import './assets/index.css'

// 创建 Pinia 实例
const pinia = createPinia()
/**
 * Pinia 支持功能扩展，例如本地持久化功能
 *
 * 在命令行运行 `npm i pinia-plugin-persistedstate` 安装持久化插件
 * 在本文件里导入 `import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'`
 * 取消注释下方的这行 `pinia.use` 代码启用插件，并根据文档对单个 Store 启用配置
 *
 * @see https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 */
// pinia.use(piniaPluginPersistedstate)

createApp(App)
  // .use(pinia) // 启用 Pinia
  .use(store)
  .use(pinia)
  .use(router) // 启用 Vue Router
  .use(ElementPlus) // 启用 Element Plus
  .mount('#app')
