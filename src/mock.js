import Mock from 'mockjs' // 引入mockjs
// 返回的是一个对象
// 返回token对象
const signIn = () => ({
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzMDMyODY2MywiaWF0IjoxNTI5NzIzODYzfQ.cgmhRgLhy8P0U2l1oLhZqHwlsetp4tUGWjxaDRjHq2uKYOKSveZikhsl_r1drbNQ8lg8ErviShknFVgo-nXg1g"
});

// 返回menus的列表
const queryUserAuthority = () => ({
  menuData: [
    {
    menuId: '0',
    link: 'leniao',
    icon: 'el-icon-menu',
    menuName: '主页',
    children: [
      {
        childId: '0-1',
        childName: '了解乐鸟',
        childLink: '/dashboard/leniao'
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
        childLink: '/dashboard/UserControl'
      },
      {
        childId: '1-2',
        childName: '角色管理',
        childLink: '/dashboard/userManagement'
      }
    ]
  },
  {
    menuId: '2',
    link: 'onlineUser',
    icon: 'el-icon-setting',
    menuName: '系统监控',
    children: [
      {
        childId: '2-1',
        childName: '在线用户',
        childLink: '/dashboard/onlineUser'
      },
      {
        childId: '2-2',
        childName: '定时服务',
        childLink: '/dashboard/regularService'
      },
      {
        childId: '2-3',
        childName: '数据监控',
        childLink: '/dashboard/dataMonitoring'
      },
      {
        childId: '2-4',
        childName: '服务监控',
        childLink: '/dashboard/serviceMonitoring'
      }
    ]
  },
  {
    menuId: '3',
    link: 'formBuilding',
    icon: 'el-icon-setting',
    menuName: '系统工具',
    children: [
      {
        childId: '3-1',
        childName: '表单构建',
        childLink: '/dashboard/formBuilding'
      },
      {
        childId: '3-2',
        childName: '系统接口',
        childLink: '/dashboard/systemInterface'
      },
      {
        childId: '3-3',
        childName: '代码生成',
        childLink: '/dashboard/codeGeneration'
      }
    ]
  }]

})

// 返回的是查询列表数据
const personList = () => ({
  personList:[{
    index: 0,
    date: "2016-05-02",
    sex: "男",
    age: "12",
    birth: "9-11",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    index: 0,
    date: "2016-05-02",
    sex: "男",
    age: "12",
    birth: "9-11",
    name: "留小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    index: 0,
    date: "2016-05-02",
    sex: "男",
    age: "12",
    birth: "9-11",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    index: 0,
    date: "2016-05-02",
    sex: "男",
    age: "12",
    birth: "9-11",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    index: 0,
    date: "2016-05-02",
    sex: "男",
    age: "12",
    birth: "9-11",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  }]
})


Mock.mock('/data/index', 'post', signIn) // 根据数据模板生成token模拟数据
Mock.mock('/user/queryUserAuthority', 'get', queryUserAuthority) // 根据数据模板生成menus模拟数据
Mock.mock('/user/list', 'post', personList) // 根据数据模板生成personList模拟数据
