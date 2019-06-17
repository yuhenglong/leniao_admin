import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
// 引入vuex
Vue.use(Vuex);

// 处理后端返回的对象

const state = {
    // token
    token:null,
    // 菜单列表
    MenusData: [],
    // 个人信息列表
    personList:[],
    // 订单数据
    orderData:null,
    // 工序管理
    processManageData:null,
    // 产品管理
    productManageData:null,
    // 角色管理
    roleManageData:null,
    // 公司的ID
    companyId:null
}

const getters = {
    UpdateCompanyId:(state) =>{
        console.log(state.companyId)
        return {
            companyId:state.companyId
        }
    }
}

const mutations = {
    setToken(state,newToken){
        state.token = newToken;
        console.log('已设置token')
    },
    setMenusData(state,MenusData){
        state.MenusData = MenusData
    },
    getPersonList(state,newPersonList){
        state.personList = newPersonList
    },
    setCompanyId(state,newCompanyId){
        console.log('这是mutations')
        state.companyId = newCompanyId
        console.log('这是state',newCompanyId)
        console.log('这是state',state.companyId)
    },
    setRoleManage(state,newRoleData){
        state.roleManageData = newRoleData;
    }
}

const actions = {
    // 登出
    signOut({ commit}){
        commit('setMenusData',[])
        localStorage.removeItem('token')
    },
    // 用户数据信息列表
    getPersonList({ commit,state }){
        commit('setPersonList',state)
    },
    // 设置用户的companyId
    setCompanyId({commit,state }){
        console.log('这是actions')
        commit('setCompanyId',state)
    },
    signIn({commit,state}){
        commit('setToken',state)
    },
    setRoleList({ commit,state }){
        commit('setRoleManage',state)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store;
