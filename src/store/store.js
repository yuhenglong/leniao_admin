import Vue from 'vue';
import Vuex from 'vuex';
// import 
import _ from 'lodash';
// 引入vuex
Vue.use(Vuex);

// 处理后端返回的对象

const state = {
    // token
    token: null,
    // 菜单列表
    MenusData: [],
    // 个人信息列表
    personList: [],
    // 订单数据
    orderData: null,
    // 工序管理
    processManageData: null,
    // 产品管理
    productManageData: null,
    // 角色管理
    roleManageData: null,
    // 公司的ID
    companyId: null,
    // tab 
    visitedviews: [
        {
            'title': '工序管理',
            'path': '/dashboard/processManage'
        }, {
            'title': '产品管理',
            'path': '/dashboard/productManage'
        }]
}

const getters = {
    UpdateCompanyId: (state) => {
        return {
            companyId: state.companyId
        }
    },
    visitedviews: state => state.visitedviews
}

const mutations = {
    setToken(state, newToken) {
        state.token = newToken;
        console.log('已设置token')
    },
    setMenusData(state, MenusData) {
        state.MenusData = MenusData
    },
    getPersonList(state, newPersonList) {
        state.personList = newPersonList
    },
    setCompanyId(state, newCompanyId) {
        state.companyId = newCompanyId
    },
    setRoleManage(state, newRoleData) {
        state.roleManageData = newRoleData;
    },
    ADD_VISITED_VIEWS: (state, view) => {//打开新页签--添加路由数据的方法      if(state.visitedviews.some(v=>v.path==view.path))return;
        state.visitedviews.push({
            name: view.name,
            path: view.path,
            title: view.meta.title || 'no-title'
        })
    },
    DEL_VISITED_VIEWS: (state, view) => {//关闭页签--删除路由数据的方法
        for (let [i, v] of state.visitedviews.entries()) {
            if (v.path == view.path) {
                state.visitedviews.splice(i, 1)
                break
            }
        }
    }
}

const actions = {
    // 登出
    signOut({ commit }) {
        commit('setMenusData', [])
        localStorage.removeItem('token')
    },
    // 用户数据信息列表
    getPersonList({ commit, state }) {
        commit('setPersonList', state)
    },
    // 设置用户的companyId
    setCompanyId({ commit, state }) {
        commit('setCompanyId', state)
    },
    signIn({ commit, state }) {
        commit('setToken', state)
    },
    setRoleList({ commit, state }) {
        commit('setRoleManage', state)
    },
    addVisitedViews({ commit }, view) {//通过解构赋值得到commit方法
        commit('ADD_VISITED_VIEWS', view)//去触发ADD_VISITED_VIEWS，并传入参数
    },
    delVisitedViews({ commit, state, view }) {
        //删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
        //commit('DEL_VISITED_VIEWS',view)
        return new Promise((resolve) => {//resolve方法：未来成功后回掉的方法
            commit('DEL_VISITED_VIEWS', view);
            resolve([...state.visitedviews]);
        })
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store;
