<template>
  <div class="show" style="color:blue;">显示</div>
</template>
<script>
import Bus from "@/store/bus.js";
export default {
  data() {
    return {
      resa: ""
    };
  },
  methods: {
    getList() {
      return new Promise((resolve,reject) =>{
  
      })
      const url ="/comapi/company/switch/" + "302364aauyhf401ats7c1113f55b2e41";
      this.axios.get(url).then(res => {
        console.log("这是XX", res);
        this.resa = res.data.status;
      });
    },
    getPro() {
      return new Promise((resolve,reject) =>{
        resolve();
      })
    },
    promis: async function() {
      let text = await this.getList();
      // let text = await this.getPro(this.getList());
      console.log("这是text", this.resa);
    }
  },
  created() {
    // Bus.$on("getTarget", target => {
    //   console.log(target);
    // });
    this.promis();
  }
};
</script>
