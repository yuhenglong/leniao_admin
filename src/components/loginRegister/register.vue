<template>
  <div class="register">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <h1>乐鸟系统注册</h1>
      <el-form-item label prop="phonenumber">
        <el-input
          type="text"
          v-model="ruleForm.phonenumber"
          auto-complete="off"
          placeholder="请输入正确手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          auto-complete="off"
          placeholder="再次确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item label prop="code">
        <el-input
          type="code"
          v-model="ruleForm.code"
          auto-complete="off"
          placeholder="请输入验证码"
          class="auth_code"
        ></el-input>
        <el-button type="primary" @click="getCode('ruleForm')" class="get_code">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="el-button el-button--primary next" @click="submitForm('ruleForm')">下一步</el-button>
        <!-- <router-link to="/setpass" class="el-button el-button--primary next">下一步</router-link> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qs from "qs";
export default {
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        phonenumber: "",
        password: "",
        code: "",
        checkPass: ""
      },
      rules: {
        phoneNumber: [{ validator: validatePhoneNumber, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 8, message: "请输入6-8位密码", trigger: "blur" }
        ]
      }
      // subpass:''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/user/reg", qs.stringify(this.ruleForm))
            .then(res => {
              console.log(res);
              if (res.data.status == 301) {
                this.$message({
                  type: "info",
                  message: "设置密码成功，3s后即将回到登录页"
                });
                setTimeout(() => {
                  this.$router.push("/login");
                }, 3000);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode(phoneNum) {
      let url = "/user/code/" + this.ruleForm.phonenumber;
      console.log(url)
      this.axios
        .get(url, this.ruleForm)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="" scoped>
  .register {
  width: 100%;
  height: 100%;
  background: url(../../../static/images/bg.jpg) no-repeat center center;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}
.register .el-form {
  width: 300px;
  height: auto;
  background-color: #fff;
  /* border: 1px solid #999; */
  padding: 20px 70px 15px;
  border-radius: 10px;
}
.register h1 {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  padding: 20px 10px 20px;
}
.register .div_reg,
.register .div_for {
  float: right;
}
.register .div_for {
  float: left;
}
.register .div_reg a,
.register .div_for a {
  color: blue;
}
.el-form-item {
  width: 300px;
}
.register .next {
  width: 100%;
}
.register .auth_code {
  float: left;
  width: 170px;
}
.register .get_code {
  float: right;
}
</style>