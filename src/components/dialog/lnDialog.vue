<template>
  <div class='lnDialog' v-show='isShow'>
    <div class="dia_header"></div>
    <div class="detail ov">
      <p>确定删除？</p>
      <el-button type='primary' class='fl' @click='cancel()'>取消</el-button>
      <el-button type='warning' class='fr' @click='confirm()'>确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name:'lnDialog',
  data(){
    return{
      isShow:true
    }
  },
  methods:{
    cansel(){
      this.isShow = false;
    },
    confirm(){

    }
  }
}
</script>
<style lang="scss" scoped>
  .lnDialog{
    position:absolute;
    left:50%;
    top:50%;
    margin-top:-90px;
    margin-left:-250px;
    z-index:999;
    width:500px;
    height:180px;
    // border-radius:15px;
    .dia_header{
      background-color: yellow;
      width:100%;
      height:30px;
      // border-radius:15px 15px 0 0;
    }
    .detail{
      border-radius:15px;
      height:150px;
      width:100%;
      background-color:#fff;
      padding:30px 20px 20px;
      box-sizing:border-box;
      p{
        font-size:24px;
        text-align:center;
        color:#666;
        margin-bottom:30px;
      }
    }
    .fl{
      float:left;
    }
    .fr{
      float:right;
    }
    .ov{
      overflow:hidden;
    }
  }
</style>