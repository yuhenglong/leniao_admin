<template>
  <div class='queryDetails'>
    <div>{{ newList.templateName }}</div>
    
  </div>
</template>
<script>
export default {
  props:['listDetails','index'],
  data(){
    return {

    }
  },
  methods:{
  
  },
  computed:{
    newList(){
      let obj = {};
      let obj2 = this.listDetails[this.index];
      console.log(Object.assign(obj,obj2))
      return Object.assign(obj,obj2)
    }
  }
}
</script>
<style lang="scss">
  .queryDetails{
    width:800px;
  }
</style>