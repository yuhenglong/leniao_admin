<!--
 * @Date: 2019-07-04 09:57:48
 * @LastEditTime: 2019-07-09 10:30:36
 * @Author: guobinggui
 * @Description: 文件说明: 查找公司进行绑定
 -->
<template>
  <div>
    <template>
      <el-form :inline="true" :model="filter">
        <el-form-item>
          <el-input placeholder="请输入公司名称" v-model="filter.name"></el-input>
        </el-form-item>
        <el-cascader
          v-model="filter.industrys"
          :options="lnindustrysList"
          :props="defaultOptions"
          @change="handleChange"
        ></el-cascader>
        <el-form-item>
          <el-button type="primary" @click="getCompanysList">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template>
      <el-table :data="companysList" stripe style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="numberId" label="公司编号"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="iname" label="所属行业"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="apply(scope.row)">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="入职申请表" :visible.sync="dialogFormVisible">
      <el-form :model="applyForm">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <span>{{ applyForm.name }}</span>
        </el-form-item>
        <el-form-item label="申请人" :label-width="formLabelWidth">
          <span>{{ applyForm.userName }}</span>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="applyForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <span v-if="applyForm.sex == 0">男</span>
          <span v-if="applyForm.sex == 1">女</span>
        </el-form-item>
        <el-form-item label="意向岗位" :label-width="formLabelWidth">
          <el-input v-model="applyForm.postRemark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="applyForm.addContext" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="applyForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitApply">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      filter: {
        name: "",
        industry: ""
      },
      industrys: [],
      companysList: [],
      lnindustrysList: [],
      defaultOptions: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        children: "children"
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      applyForm: {
        companyId: "",
        name: "",
        userName: "",
        userId: localStorage.getItem("userId"),
        phone: "",
        sex: "",
        postRemark: "",
        addContext: "",
        iname: ""
      },
    };
  },
  methods: {
    /**
     * @author: guobinggui
     * @description: 函数说明: 获取公司列表
     * @param {type}
     * @return:
     */
    getCompanysList() {
      this.axios
        .post("/bind/findCompany", qs.stringify(this.filter))
        .then(res => {
          console.log(res);
          this.companysList = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 获取行业列表
     * @param {type}
     * @return:
     */
    getlnindustrysList() {
      this.axios
        .post("/bind/lnindustryAll")
        .then(res => {
          // console.log(res);
          this.lnindustrysList = res.data.result;
          this.tree(this.lnindustrysList);
          // console.log("树");
          // console.log(this.lnindustrysList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleChange() {
      // this.filter.industry = this.industrys.pop()
      console.log(this.filter.industry);
    },

    /**
     * @author: guobinggui
     * @description: 函数说明: 树形结构
     * @param {type}
     * @return:
     */
    tree(list) {
      let industryTemp = list;
      // 以id为键，当前对象为值，存入一个新的对象中
      let industryObj = {};
      for (let i in industryTemp) {
        industryObj[industryTemp[i].id] = industryTemp[i];
      }
      return industryTemp.filter(father => {
        // 把当前节点的所有子节点找到
        let childArr = industryTemp.filter(
          child => father.id === child.parentId
        );
        childArr.length > 0 ? (father.children = childArr) : "";
        // 只返回第一级数据；如果当前节点的fatherId不为空，但是在父节点不存在，也为一级数据
        return father.parentId === 0 || !industryObj[father.parentId];
      });
    },

    /**
     * @author: guobinggui
     * @description: 函数说明: 获取当前用户信息
     * @param {type} 
     * @return: 
     */
    getUserInfo() {
      let that = this;
      this.axios
        .get("/comUser/user/myInfo")
        .then(res => {
          console.log('用户', res);
          let user = res.data.result
          this.applyForm.userName = user.name
          this.applyForm.userId = user.userId
          this.applyForm.phone = user.phonenumber
          this.applyForm.sex = user.sex
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 申请公司
     * @param {type}
     * @return:
     */
    apply(row) {
      console.log(row);
      this.applyForm.companyId = row.companyId
      this.applyForm.name = row.name
      // this.getCompanyPostsList(row.companyId);
      // this.getCompanyDeptsList(row.companyId);
      // this.getSkillList(row.companyId);
      this.dialogFormVisible = true
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 提交申请
     * @param {type} 
     * @return: 
     */
    submitApply() {
      let application = {
        userId: this.applyForm.userId,
        companyId: this.applyForm.companyId,
        userName: this.applyForm.userName,
        phone: this.applyForm.phone,
        postRemark: this.applyForm.postRemark,
        addContext: this.applyForm.addContext
      }
      this.axios
        .post('/Applicant/intoApplicant', JSON.stringify(application), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res)
          this.dialogFormVisible = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCompanysList();
    this.getlnindustrysList();
    this.getUserInfo();

  }
  // computed: {
  // 	newIndustry: {
  // 		get: function() {
  // 			return this.filter.industry = this.industrys.pop()
  // 		}
  // 	}
  // }
};
</script>