import Vue from 'vue'
import Router from 'vue-router'
const detailLogin = () => import('@/components/loginRegister/detailLogin')
const register = () => import('@/components/loginRegister/register')
import forget from '@/components/loginRegister/forget'
import setpass from '@/components/loginRegister/setpass'
import dashboard from '@/components/dashboard/dashboard'
import leniao from '@/components/dashboard/leniao'
import userControl from '@/components/dashboard/userControl'
import switchTempalte from '@/components/dashboard/switchTempalte'
import equipmentMan from '@/components/dashboard/equipmentMan'
const roleManagement = () => import('@/components/dashboard/roleManagement')
const userManagement = () => import('@/components/dashboard/userManagement')
const processManage = () => import('@/components/dashboard/processManage')
const productManage = () => import('@/components/dashboard/productManage')
const onlineUser = () => import('@/components/dashboard/onlineUser')
const regularService = () => import('@/components/dashboard/regularService')
const dataMonitoring = () => import('@/components/dashboard/dataMonitoring')
const serviceMonitoring = () => import('@/components/dashboard/serviceMonitoring')
const formBuilding = () => import('@/components/dashboard/formBuilding')
const systemInterface = () => import('@/components/dashboard/systemInterface')
const codeGeneration = () => import('@/components/dashboard/codeGeneration')
const createCompany = () => import('@/components/dashboard/createCompany')
const selfCreatedCompany = () => import('@/components/dashboard/selfCreatedCompany')
const divisionManagement = () => import('@/components/dashboard/divisionManagement')
const orderDataManagement = () => import('@/components/dashboard/orderDataManagement')
const menu = () => import('@/components/dashboard/menu')
const postManage = () => import('@/components/dashboard/postManage')
const bindCompany = () => import('@/components/dashboard/bindCompany')
const updateUser = () => import('@/components/dashboard/updateUser')

// 引入 vuex中store
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: detailLogin
    },
    {
      path: '/detailLogin',
      component: detailLogin
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
          path: '/dashboard/userControl',
          component: userControl
        },{
          path: '/dashboard/userManagement',
          component: userManagement
        },{
          path: '/dashboard/processManage',
          component: processManage
        },{
          path: '/dashboard/productManage',
          component: productManage
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
        },{
          path: '/dashboard/createCompany',
          component: createCompany
        },{
          path: '/dashboard/selfCreatedCompany',
          component: selfCreatedCompany
        },{
          path: '/dashboard/divisionManagement',
          component: divisionManagement
        },{
          path: '/dashboard/codeGeneration',
          component: codeGeneration
        },{
          path: '/dashboard/orderDataManagement',
          component: orderDataManagement
        }, {
          path: '/dashboard/menu',
          component: menu
        }, {
          path: '/dashboard/post',
          component: postManage
        }, {
          path: '/dashboard/bind',
          component: bindCompany
        }, {
          path: '/dashboard/switchTempalte',
          component: switchTempalte
        },
        {
          path: '/dashboard/equipmentMan',
          component: equipmentMan
        }, {
          path: '/dashboard/updateUser',
          component: updateUser
        }]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  const isAllow = to.path == "/detailLogin" || to.path == "/register" || to.path == "/forget" || to.path == "/setpass";
  if (isAllow) {
    next()
  } else {
    isLogin ? next() : next('/detailLogin')
  }
})

export default router