import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('@/components/loginRegister/login')
const register = () => import('@/components/loginRegister/register')
import forget from '@/components/loginRegister/forget'
import setpass from '@/components/loginRegister/setpass'
import dashboard from '@/components/dashboard/dashboard'
import leniao from '@/components/dashboard/leniao'
import UserControl from '@/components/dashboard/UserControl'
const roleManagement = () => import('@/components/dashboard/roleManagement')
const userManagement = () => import('@/components/dashboard/userManagement')
const processManage = () => import('@/components/dashboard/processManage')
const onlineUser = () => import('@/components/dashboard/onlineUser')
const regularService = () => import('@/components/dashboard/regularService')
const dataMonitoring = () => import('@/components/dashboard/dataMonitoring')
const serviceMonitoring = () => import('@/components/dashboard/serviceMonitoring')
const formBuilding = () => import('@/components/dashboard/formBuilding')
const systemInterface = () => import('@/components/dashboard/systemInterface')
const codeGeneration = () => import('@/components/dashboard/codeGeneration')

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
      children: [
        {
          path: '/',
          name: 'leniao',
          component: leniao
        }, {
          path: '/dashboard/leniao',
          component: leniao
        }, {
          path: '/dashboard/UserControl',
          component: UserControl
        },{
          path: '/dashboard/userManagement',
          component: userManagement
        },{
          path: '/dashboard/processManage',
          component: processManage
        }, {
          path: '/dashboard/roleManagement',
          component: roleManagement
        }, {
          path: '/dashboard/onlineUser',
          component: onlineUser
        }, {
          path: '/dashboard/regularService',
          component: regularService
        }, {
          path: '/dashboard/dataMonitoring',
          component: dataMonitoring
        }, {
          path: '/dashboard/serviceMonitoring',
          component: serviceMonitoring
        }, {
          path: '/dashboard/formBuilding',
          component: formBuilding
        },{
          path: '/dashboard/systemInterface',
          component: systemInterface
        }, {
          path: '/dashboard/codeGeneration',
          component: codeGeneration
        }]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  const isAllow = to.path == "/login" || to.path == "/register" || to.path == "/forget" || to.path == "/setpass";
  if (isAllow) {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router