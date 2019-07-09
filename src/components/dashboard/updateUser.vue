<!--
 * @Date: 2019-06-26 14:48:46
<<<<<<< HEAD
 * @LastEditTime: 2019-07-08 10:02:13
=======
 * @LastEditTime: 2019-06-27 16:08:38
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
 * @Author: guobinggui
 * @Description: 文件说明: 修改用户页面
 -->
<template>
  <div>
    <h4>基本信息</h4>
<<<<<<< HEAD
    <hr />
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
            :key="item.value"
            :label="item"
            :value="item"
          >{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="归属部门" prop="deptId">
        <!-- <el-select v-model="appForm.deptId" placeholder="请选择部门">
          <el-option
            v-for="item in deptTree"
            :key="item.value"
            :label="item.deptName"
            :value="item.deptId"
          >{{ item.deptName }}</el-option>
        </el-select> -->
        <el-cascader v-model="selDeptId" :options="deptTree" :props="defaultOptions"></el-cascader>
      </el-form-item>
      <!-- 技能要调接口读数据 -->
      <el-form-item label="技能" prop="skills">
        <el-checkbox-group v-model="appForm.skills">
          <el-checkbox
            v-for="item in skillsList"
            :key="item.skillId"
            :value="item.skillId"
            :label="item"
            @change="consoleJson"
          >{{ item.skillName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="appForm.desc"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="consoleInfo">立即创建</el-button>
        <el-button @click="resetForm('appForm')" type="warning">取消</el-button>
      </el-form-item>
    </el-form>
=======
    <hr>

>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      appForm: {
<<<<<<< HEAD
        companyId: localStorage.getItem("companyId"),
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("userName"),
        phoneNumber: localStorage.getItem("phoneNumeber"),
        posts: [],
        roles: [],
        deptId: "",
        skills: []
        // desc: ""
=======
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
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
<<<<<<< HEAD
        dept: [
          { required: true, message: "请选择一个部门", trigger: "change" }
        ],
        skills: [
=======
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        skill: [
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
          {
            type: "array",
            required: true,
            message: "请至少选择一个技能",
            trigger: "change"
          }
        ],
        posts: [
          {
<<<<<<< HEAD
            type: "array",
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
            required: true,
            message: "请至少选择一个岗位",
            trigger: "change"
          }
        ],
<<<<<<< HEAD
        roles: [
=======
        role: [
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
<<<<<<< HEAD
        ]
        // desc: [{ required: true, message: "请填写备注信息", trigger: "blur" }]
      },
      postsList: [],
      deptsList: [],
      skillsList: [],
      rolesList: [],
      deptTree: [],
      selDeptId: [],
      defaultOptions: {
        expandTrigger: "hover",
        value: "deptId",
        label: "deptName",
        children: "children"
      },
    };
  },
  methods: {
    consoleJson() {
      console.log(this.appForm.skills);
    },
    consoleInfo() {
      this.appForm.deptId = this.selDeptId.pop()
      console.log(JSON.stringify(this.appForm));
      let that = this;
      this.axios
        .post("/manage/bind", JSON.stringify(that.appForm), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.$router.replace("/dashboard/bind");
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 转树形结构
     * @param {type}
     * @return:
     */
    tree(data, pid) {
      const result = [];
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].topId == pid) {
          const obj = data[i];
          temp = this.tree(data, data[i].deptId);
          if (temp.length > 0) {
            obj.children = temp;
          }
          result.push(obj);
        }
      }
      console.log("result", result);
      return result;
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
          let postList = res.data.result;
          for (let i = 0; i < postList.length; i++) {
            let postObj = {
              postId: postList[i].postId,
              postName: postList[i].postName
            };
            that.postsList.push(postObj);
          }
          console.log("岗位:");
          console.log(that.postsList);
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
          qs.stringify({ companyId: that.appForm.companyId, delFlag: 0 })
        )
        .then(res => {
          console.log("部门");
          that.deptsList = res.data.result;
          this.deptTree = this.tree(this.deptsList, 0);
          console.log(this.deptTree);
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
          for (let i = 0; i < skillList.length; i++) {
            let skillObj = {
              skillId: skillList[i].id,
              skillName: skillList[i].name
            };
            that.skillsList.push(skillObj);
          }
          console.log("技能");
          console.log(that.skillsList);
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
          for (let i = 0; i < roleList.length; i++) {
            let roleObj = {
              roleId: roleList[i].id,
              roleName: roleList[i].name
            };
            that.rolesList.push(roleObj);
          }
          console.log("角色");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // created() {
  //   this.getCompanyPostsList()
  // },
  mounted() {
    // 页面渲染完成获取数据
    this.getCompanyPostsList();
    this.getCompanyDeptsList();
    this.getUserInfo();
    this.getSkillList();
    this.getRoleList();
=======
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
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
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
