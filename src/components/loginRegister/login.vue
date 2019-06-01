<template>
  <div class="login">
    <detailLogin/>
  </div>
</template>

<script>
import detailLogin from '@/components/loginRegister/detailLogin.vue'
export default {
  name: 'login',
  data () {
    return {
    
    }
  },
  components:{
    detailLogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  width:100%;
  height:100%;
  background: url(../../../static/images/bg.jpg) no-repeat center center;
}
</style>
