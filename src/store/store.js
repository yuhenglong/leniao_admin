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
    // 公司的ID
    companyId:null
}

const mutations = {
    setToken(state,newToken){
        state.token = newToken
    },
    setMenusData(state,MenusData){
        state.MenusData = MenusData
    },
    getPersonList(state,newPersonList){
        state.personList = newPersonList
    },
    setCompanyId(state,newCompanyId){
        state.companyId = newCompanyId
    }
}

const actions = {
    // 登出
    signOut({ commit,state }){
        commit('setToken','')
        commit('setMenusData',[])
        localStorage.removeItem('token')
    },
    // 用户数据信息列表
    getPersonList({ commit,state }){
        commit('setPersonList',state)
    },
    // 设置用户的companyId
    setCompanyId({commit,state }){
        commit('setCompanyId',state)
    },
    setToken({ commit,state}){
        commit('setToken',state)
    }
}

// 测试
const getters = {
    vipUsers:state => state.MenusData.filter( v =>{
        return v.roleSort == 1;
    })
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store;
