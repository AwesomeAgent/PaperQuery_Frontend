import { RouteRecordRaw } from 'vue-router'

import pdfInfo from '@/views/pdf/pdfInfo.vue' // 静态导入

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: Array<RouteRecordRaw> = [
  // 首页
  {
    path: '/',
    redirect: '/login',
  },
  // 登录界面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  // 主页
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/home',
        redirect: '/home/dashboard',
      },
      // 控制台页面
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
      },
      // 知识库页面
      {
        path: 'library',
        component: () => import('@/views/library/library.vue'),
      },
      // 知识页面
      {
        path: 'knowledge/:knowledgeID',
        name: 'knowledge',
        component: () => import('@/views/library/knowledge.vue'),
      },
      {
        path: 'pdfInfo/:knowledgeID/:documentID',
        name: 'pdfInfo',
        component: pdfInfo,
      },
    ],
  },
  // 知识页面

  // 404页面
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

export default routes
