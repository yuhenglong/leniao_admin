import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('@/components/loginRegister/login')
const register = () => import('@/components/loginRegister/register')
import forget from '@/components/loginRegister/forget'
import setpass from '@/components/loginRegister/setpass'
import dashboard from '@/components/dashboard/dashboard'
import leniao from '@/components/dashboard/leniao'
import UserControl from '@/components/dashboard/UserControl'
import User from '@/components/dashboard/User'

// 引入 vuex中store
import store from '@/store/store'


Vue.use(Router)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/setpass',
      component: setpass
    },
    {
      path: '/forget',
      component: forget
    },
    {
      path: '/dashboard',
      component: dashboard,
      name: 'dashboard',
      children: [
        {
          path: '/',
          name: 'leniao',
          component: leniao
        }, {
          path: '/dashboard/leniao',
          component: leniao
        },
        {
          path: '/dashboard/UserControl',
          component: UserControl
        }, {
          path: '/dashboard/User',
          component: User
        }]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  const isAllow = to.path == "/login" || to.path == "/register" ||to.path == "/forget"||to.path == "/setpass";
  if (isAllow) {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router