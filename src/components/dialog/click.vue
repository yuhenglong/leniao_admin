<template>
  <div class="click">
    <div @click.stop.prevent = "doClick($event)" style="color:yellow;">点击</div>
  </div>
</template>
<script>
import Bus from '@/store/bus.js'
export default {
  name:'click',
  methods:{
    doClick(event){
      Bus.$emit('getTarget',event.target);
    }
  }
}
</script>