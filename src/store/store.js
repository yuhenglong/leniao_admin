import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
// 引入vuex
Vue.use(Vuex);

const state = {
    // token
    token:null,
    // 菜单列表
    MenusData: [],
    // 个人信息列表
    personList:[]
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
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store;
