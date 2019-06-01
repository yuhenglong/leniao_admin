<template>
  <div id="app">
    dadadasd
    <!-- <router-view/> -->
    <!-- <FooterBar v-if="isShow"/> -->
  </div>
</template>
<!--
<script>
// import FooterBar from '@/components/common/FooterBar'
// import config from './config/index.js'
export default {
  name: 'App',
  components:{
    // FooterBar:FooterBar
  },
  data(){
    return {
    }
  },
  computed:{
     isShow(){
       return this.$store.getters.isShow;
     }
  },
  watch:{
      $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
          console.log(to)
        if(to.name=='book'||to.name=='my'){ // to.name来获取当前所显示的页面，从而控制该显示或隐藏footerBar组件
           this.$store.dispatch('showFooter') // 利用派发全局state.showFooter的值来控制        }else{
           this.$store.dispatch('hideFooter')
        }else{
           this.$store.dispatch('hideFooter')
        }
      }
  }
}
</script>-->