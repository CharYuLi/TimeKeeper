import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/',        name: 'Home',   component: () => import('../pages/index/index.vue') },
  { path: '/points',  name: 'Points',   component: () => import('../pages/points/points.vue') },
  { path: '/logs',    name: 'Logs',   component: () => import('../pages/logsPage/logs.vue') },
  { path: '/profile', name: 'Profile',   component: () => import('../pages/profile/profile.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})