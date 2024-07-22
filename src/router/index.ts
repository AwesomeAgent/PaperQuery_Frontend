import { createRouter, createWebHistory } from 'vue-router'
import progress from '@bassist/progress'
import routes from './routes'

// 从环境变量中获取应用名称
const APP_NAME = import.meta.env.VITE_APP_NAME

// 配置进度条
progress.configure({ showSpinner: false })
progress.setColor('var(--c-brand)')

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition ? savedPosition : { top: 0, left: 0 }
  },
})

// 导航守卫
router.beforeEach((to, from, next) => {
  progress.start()

  // 从本地存储中获取用户登录状态
  const loggedIn = localStorage.getItem('token')
  // 检测用户是否登录 如果未登录则跳转到登录页面
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    console.log('未登录')
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to) => {
  const { title } = to.meta
  document.title = title ? `${title} - ${APP_NAME}` : APP_NAME
  progress.done()
})

export default router
