<template>
  <div class="detaillogin">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>乐鸟登录系统</h1>
      <el-form-item label="手机号" prop="phoneNumber">
        <!-- <el-form-item label="手机号" prop="checkPass"> -->
        <el-input type="text" v-model="ruleForm2.phoneNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <div class="div_for">
          <router-link to="/forget">忘记密码？</router-link>
        </div>
        <div class="div_reg">
          还没有账号?请前往
          <router-link to="/register">注册</router-link>
        </div>
        <div class="clear"></div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: "detailLogin",
  data() {
    var validatePhoneNumber = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value) || value === "") {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        phoneNumber: "",
        password: ""
      },
      rules2: {
        phoneNumber: [{ validator: validatePhoneNumber, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 8, message: "请输入6-8位密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login: function(formName) {
      this.$refs[formName].validate(valid => {
        // 请求后端并跳转页面
        if (valid) {

    // 真实请求接口
          // let body = {username: this.ruleForm2.phoneNumber, password: this.ruleForm2.password,grant_type:"password"}
          // fetch('/oauth/token',{
          //   method:'POST',
          //   headers: {
          //       "Authorization":"Basic VGVzdFN5c3RlbTpjZThlMzgyYS04YzI1LTRmYmQtOWUzMy1hMGQ3M2UxMTEyMjI=",
          //       "Content-Type": "application/x-www-form-urlencoded" 
          //     },
          //   body:qs.stringify(body)
          //   }).then(res=>{
          //   console.log('这是请求成功的回调',res)
          //     if(res.data){
          //     // 将token储存到本地存储
          //     localStorage.setItem('token',res.data.access_token)
          //     // 将token存储到vuex
          //     // this.$store.commit('setToken',res.data.access_token);
          //     this.$store.dispatch('signIn',res.data.access_token);
          //     // 跳转页面到首页
          //     this.$router.push('/dashboard')
          //   }
          // }).catch(err => {
          //   console.log(err);
          // })

// 备份
     const params = {username: this.ruleForm2.phoneNumber, password: this.ruleForm2.password,grant_type:"password"}
          this.axios.post('/oauth/token',qs.stringify(params),{
            headers: {
                "Authorization":"Basic VGVzdFN5c3RlbTpjZThlMzgyYS04YzI1LTRmYmQtOWUzMy1hMGQ3M2UxMTEyMjI=",
                "Content-Type": "application/x-www-form-urlencoded" 
              }
            }).then(res=>{
            console.log(res)
              if(res.data){
              // 将token储存到本地存储
              localStorage.setItem('token',res.data.access_token)
              // 将token存储到vuex
              // this.$store.commit('setToken',res.data.access_token);
              this.$store.dispatch('signIn',res.data.access_token);
              // 跳转页面到首页
              this.$router.push('/dashboard')
            }
          }).catch(err => {
            console.log(err);
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="" scoped>
.detaillogin {
  width: 100%;
  height: 100%;
  /* background-color:blue; */
  background: url(../../../static/images/bg.jpg) no-repeat center center;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}
.detaillogin .el-form {
  width: 400px;
  height: auto;
  background-color: #fff;
  /* border: 1px solid #999; */
  padding: 20px 40px 15px 0px;
  border-radius: 10px;
}
.detaillogin h1 {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  padding: 20px 10px 20px 70px;
}
.detaillogin .div_reg,
.detaillogin .div_for {
  float: right;
}
.detaillogin .div_for {
  float: left;
}
.detaillogin .div_reg a,
.detaillogin .div_for a {
  color: blue;
}
</style>
