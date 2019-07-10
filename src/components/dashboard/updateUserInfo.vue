<!--
 * @Date: 2019-06-26 14:48:46
 * @LastEditTime: 2019-07-08 16:34:02
 * @Author: guobinggui
 * @Description: 文件说明: 修改用户页面
 -->
<template>
  <div>
    <h4>基本信息</h4>
    <hr>
    <el-form :model="appForm" :rules="rules" ref="appForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户姓名" prop="name">
        <span>{{ appForm.name }}</span>
      </el-form-item>
      <el-form-item label="手机号码" prop="phoneNumber">
        <span>{{ appForm.phoneNumber }}</span>
      </el-form-item>
      <!-- 岗位要调接口读数据 -->
      <el-form-item label="岗位" prop="posts">
        <el-select v-model="appForm.posts" multiple placeholder="请选择岗位" value-key="postId"> 
          <el-option
            v-for="item in postsList"
            :key="item.postId"
            :label="item.postName"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 角色要调接口读数据 -->
      <el-form-item label="角色" prop="roles">
        <el-checkbox-group v-model="appForm.roles">
          <el-checkbox
            v-for="item in rolesList"
            :key="item.roleId"
            :value="item.roleId"
            :label="item.roleName"
          >{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="归属部门" prop="deptId">
        <el-select v-model="appForm.deptId" placeholder="请选择部门">
          <el-option
            v-for="item in deptsList"
            :key="item.value"
            :label="item.deptName"
            :value="item.deptId"
          >{{ item.deptName }}</el-option>
        </el-select>
      </el-form-item>
      <!-- 技能要调接口读数据 -->
      <el-form-item label="技能" prop="skills">
        <el-checkbox-group v-model="appForm.skills">
          <el-checkbox
            v-for="item in skillsList"
            :key="item.skillId"
            :value="item.skillId"
            :label="item"
          >{{ item.skillName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="appForm.desc"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="consoleInfo">保存修改</el-button>
        <el-button @click="resetForm('appForm')" type="warning">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      appForm: {
        // companyId: localStorage.getItem("companyId"),
        // name: JSON.parse(localStorage.getItem("userInfo")).name,
        // userId: JSON.parse(localStorage.getItem("userInfo")).userId,
        // phoneNumber: JSON.parse(localStorage.getItem("userInfo")).phoneNumber,
        companyId: localStorage.getItem("companyId"),
        name: '',
        userId: '',
        phoneNumber: '',
        posts: [],
        skills: [],
        deptId: [],
        roles: [],
        // desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        dept: [
          { required: true, message: "请选择一个部门", trigger: "change" }
        ],
        skills: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个技能",
            trigger: "change"
          }
        ],
        posts: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个岗位",
            trigger: "change"
          }
        ],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ]
        // desc: [{ required: true, message: "请填写备注信息", trigger: "blur" }]
      },
      postsList: [],
      deptsList: [],
      skillsList: [],
      rolesList: [],
      findUserId: localStorage.getItem("findUserId")
    };
  },
  methods: {
    con(item) {
      console.log(item)
    },
    refresh() {
      this.$router.go(0);
    },
    consoleSkill() {
      console.log(this.appForm.skills)
    },
    consoleInfo() {
      console.log(JSON.stringify(this.appForm));
      let that = this;
      this.axios
        .post("/manage/updateUser", JSON.stringify(that.appForm),{
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.$router.replace('/dashboard/userControl')
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取公司岗位列表
    getCompanyPostsList() {
      let that = this;
      this.axios
        .post(
          "/post/findAll",
          qs.stringify({ companyId: that.appForm.companyId })
        )
        .then(res => {
          let postList = res.data.result
          for(let i = 0; i < postList.length; i++) {
            let postObj = {
              postId: postList[i].postId,
              postName: postList[i].postName
            }
            that.postsList.push(postObj)
          }
          // console.log("岗位:");
          // console.log(that.postsList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * @author: guobinggui
     * @description: 函数说明:获取公司部门列表
     * @param {type} 
     * @return: 
     */
    getCompanyDeptsList() {
      let that = this;
      this.axios
        .post(
          "/dept/selectDept",
          qs.stringify({ companyId: that.appForm.companyId })
        )
        .then(res => {
          // console.log("部门");
          // console.log(res);
          that.deptsList = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取当前用户信息
    getUserInfo() {
      let that = this;
      this.axios
        .get("/comUser/user/AllUser", {
          body: { userId: that.appForm.userId }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取技能列表
    getSkillList() {
      let that = this;
      this.axios
        .post(
          "/skill/skill/findById",
          qs.stringify({ companyId: that.appForm.companyId })
        )
        .then(res => {
          let skillList = res.data.result;
          for(let i = 0; i < skillList.length; i++) {
            let skillObj = { 
              skillId: skillList[i].id,
              skillName: skillList[i].name
            }
            that.skillsList.push(skillObj)
          }
          // console.log("技能");
          // console.log(that.skillsList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取角色列表
    getRoleList() {
      let that = this;
      this.axios
        .post(
          "/role/findAll",
          qs.stringify({ companyId: that.appForm.companyId })
        )
        .then(res => {
          let roleList = res.data.result;
          for(let i = 0; i < roleList.length; i++) {
            let roleObj = { 
              roleId: roleList[i].id,
              roleName: roleList[i].name
            }
            that.rolesList.push(roleObj)
          }
          // console.log("角色");
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // beforeCreate() {
  //   this.$router.replace('/dashboard/updateUserInfo')
  // },
  created() {
    // 页面渲染完成获取数据
    this.getCompanyPostsList();
    this.getCompanyDeptsList();
    this.getUserInfo();
    this.getSkillList();
    this.getRoleList();
    this.appForm.name = JSON.parse(localStorage.getItem("userInfo")).name,
    this.appForm.userId = JSON.parse(localStorage.getItem("userInfo")).userId,
    this.appForm.phoneNumber = JSON.parse(localStorage.getItem("userInfo")).phoneNumber
  },
  computed: {
    newAppForm: {
      get: function() {
        return this.appForm;
      }
    }
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
