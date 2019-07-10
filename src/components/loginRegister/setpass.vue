<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 10:13:33
 * @Author: yuhenglong
 * @Description: 文件说明: 设置密码
 -->
<template>
  <div class="setpass">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
    <h1>设置密码</h1>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" class="sure">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type:'info',
            message:'设置密码成功，3s后即将回到登录页'
          })
          setTimeout(() =>{
            this.$router.push('/login');
          },3000)
          // setTimeout((function(){
          //   console.log(this);
          //   this.$router.push('/login');
          // }).bind(this),3000)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="" scoped>

.setpass {
  width: 100%;
  height: 100%;
  background: url(../../../static/images/bg.jpg) no-repeat center center;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}
.setpass .el-form {
  width: 400px;
  height: auto;
  background-color: #fff;
  padding: 20px 40px 15px 0px;
  border-radius: 10px;
}
.setpass h1 {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  padding: 20px 10px 20px 70px;
}
.setpass .div_reg, .setpass .div_for{
  float:right;
}
.setpass .div_for{
  float:left;
}
.setpass .div_reg a, .setpass .div_for a{
  color: blue;
}
.setpass .sure{
  width:100%;
}
</style>