<!--
 * @Date: 2019-06-26 14:48:46
 * @LastEditTime: 2019-06-27 16:08:38
 * @Author: guobinggui
 * @Description: 文件说明: 修改用户页面
 -->
<template>
  <div>
    <h4>基本信息</h4>
    <hr>

  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      appForm: {
        userName: localStorage.getItem('userName'),
        phoneNumber: '15888888888',
        email: "ry@163.com",
        sex: '男',
        region: "",
        delivery: false,
        skill: [],
        resource: "",
        desc: "",
        posts: [],
        role: []
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        skill: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个技能",
            trigger: "change"
          }
        ],
        posts: [
          {
            required: true,
            message: "请至少选择一个岗位",
            trigger: "change"
          }
        ],
        role: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请填写备注信息", trigger: "blur" }]
      },
      postList: [],
      companyId: localStorage.getItem('companyId'),
      userId: localStorage.getItem('userId')
    };
  },
  methods: {
    pro(ms){
      return new Promise((resolve,reject) =>{
        setTimeout(resolve,ms,'done');
      });
    },
    diaoyong(){
      this.pro(2000).then((value) =>{
        console.log(value);
      })
    }
  },
  created(){
    this.diaoyong()
  }
};
</script>

<style>
h4 {
  color: skyblue;
}
form {
  color: #000;
}
</style>
