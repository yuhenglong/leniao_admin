import Mock from 'mockjs' // 引入mockjs
// 返回的是一个对象
const signIn = () => ({
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzMDMyODY2MywiaWF0IjoxNTI5NzIzODYzfQ.cgmhRgLhy8P0U2l1oLhZqHwlsetp4tUGWjxaDRjHq2uKYOKSveZikhsl_r1drbNQ8lg8ErviShknFVgo-nXg1g"
});

const queryUserAuthority = () =>({
  menuData:[{
  menuId: '0',
  link: 'leniao',
  icon: 'el-icon-menu',
  menuName: '主页',
    children: [
        {
            childId: '0-1',
            childName: '了解乐鸟',
            childLink:'/dashboard/leniao'
        }
    ]
  },
  {
    menuId: '1',
    link: 'UserControl',
    icon: 'el-icon-setting',
    menuName: '系统管理',
    children: [
        {
            childId: '1-1',
            childName: '用户管理',
            childLink:'/dashboard/UserControl'
        },
        {
            childId: '1-2',
            childName: '角色管理',
            childLink:'/dashboard/User'
        }
    ]
  }]

})

Mock.mock('/data/index', 'post', signIn) // 根据数据模板生成token模拟数据
Mock.mock('/user/queryUserAuthority', 'get', queryUserAuthority) // 根据数据模板生成menus模拟数据
