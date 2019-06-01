import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';
// 引入vuex
Vue.use(Vuex);

const state = {
    // token
    token:null,
    // 菜单列表
    menus: []
}

const mutations = {
    setToken(state,newToken){
        state.token = newToken
        console.log("这是请求后的",state.token)
    },
    setMenus(state,newMenus){
        state.menus = newMenus
        console.log('这是请求menu后的',state.menus)
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store;
