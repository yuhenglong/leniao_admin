<template>
  <div class="forget">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"  
      class="demo-ruleForm"
    >
      <h1>找回密码</h1>
      <el-form-item label="" prop="phoneNumber">
        <el-input type="text" v-model="ruleForm.phoneNumber" auto-complete="off" placeholder="请输入正确手机号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="auth_code">
        <el-input type="auth_code" v-model="ruleForm.auth_code" auto-complete="off" placeholder="请输入验证码" class="auth_code"></el-input>
        <el-button type="primary" @click="submitForm('ruleForm')" class="get_code">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/setpass" class="el-button el-button--primary next">下一步</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePhoneNumber = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value)) || value ==="") {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        phoneNumber: "",
        auth_code: ""
      },
      rules: {
        phoneNumber: [{ validator: validatePhoneNumber, trigger: "blur" }],
        auth_code: [{ validator: validatePass, trigger: "blur" },
        { min:6,max:8,message:'请输入6-8位密码',trigger:'blur'}],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="" scoped>
.forget {
  width: 100%;
  height: 100%;
  background: url(../../../static/images/bg.jpg) no-repeat center center;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}
.forget .el-form {
  width: 300px;
  height: auto;
  background-color: #fff;
  /* border: 1px solid #999; */
  padding: 20px 70px 15px;
  border-radius: 10px;
}
.forget h1 {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  padding: 20px 10px 20px;
}
.forget .div_reg, .forget .div_for{
  float:right;
}
.forget .div_for{
  float:left;
}
.forget .div_reg a, .forget .div_for a{
  color: blue;
}
.el-form-item{
  width:300px;
}
.forget .next{
  width:100%;
}
.forget .auth_code{
  float:left;
  width:170px;
}
.forget .get_code{
  float:right;
}
</style>