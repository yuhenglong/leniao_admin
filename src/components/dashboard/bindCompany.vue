<template>
<!--
 * @Date: 2019-06-26 09:29:48
 * @LastEditTime: 2019-06-26 17:36:17
 * @Author: guobinggui
 * @Description: 文件说明: 绑定公司页面
 -->
  <div>
			<div class="menu-header">
      <el-col style="padding-bottom:0px;width:100%;">
        <el-form :inline="true" class="fl" ref="filter" :model="filter">
					<el-form-item prop="status">
            <el-select v-model="filter.status" placeholder="审批状态">
              <el-option :label="'等待审批'" :value="'0'"></el-option>
              <el-option :label="'审批通过'" :value="'1'"></el-option>
              <el-option :label="'审核不通过'" :value="'2'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="getApplicantList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" icon="el-icon-refresh" @click="resetForm('filter')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-dropdown trigger="click" class="fr">
          <span class="el-dropdown-link">
            <i class="el-icon-s-grid"></i>
            列表筛选
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="checkList" @change="changeArr">
              <div class="lab_div" v-for="(item,index) in newObjArrSub" :key="index">
                <el-checkbox :label="item.label"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-col>
    </div>
		
		<el-card>
      <el-table
        :data="applicantDatas"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        default-expand-all
        :default-sort="{prop: 'sort', order: 'descending'}"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="addContext" label="内容" width="180"></el-table-column>
        <el-table-column prop="createTime" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="assessor" label="处理人" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column prop="createTime" label="处理时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <router-link to="updateUser" tag="i"><el-button @click="agreeApp(scope.row)" type="primary" size="small" icon="el-icon-edit">同意</el-button></router-link>
            <router-view></router-view>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="rejectApp(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <lnDialog></lnDialog>
  </div>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import qs from "qs";
import lnDialog from "@/components/dialog/lnDialog";
export default {
  name: "selfCreatedCompany",
  components: {
    lnDialog
  },
  props: ["isShow"],
  data() {
    return {
			filter: {
				postName: '',
				postCode: '',
				status: ''
			},
      inputName: "",
      input: "",
      industry: "",
      dialogVisible: false,
      dialogEdit: false,
      editName: "",
      editIndex: "",
      LnCompanyDept: "",
      companyId: "",
      applicantDatas: []
    };
  },
  created() {
    this.getList();
  },
  filters: {
    actState: function(value) {
      return 22;
    }
  },
  methods: {
		// 获取岗位列表
    getApplicantList() {
      let obj = {
        // companyId:localStorage.getItem('companyId')
        // 这是王景的写死的公司ID
				companyId: "302364aauyhf401ats7c1113f55b2e49",
				status: this.filter.status || 0
      };

			// if(obj.status == "审批通过") {
			// 	obj.status = '1'
			// } else if (obj.status == '审批不通过') {
			// 	obj.status = '2'
			// } else {
			// 	obj.status = '等待审批'
			// }
      let that = this;
      this.axios
        .post("/Applicant/findAll", qs.stringify(obj))
        .then(res => {
					console.log(res);   // 输出返回信息
					if(res.data.result == null) {
							return that.applicantDatas = []
						}
          if (res.data.status == 1) {
						// console.log(res);
						that.applicantDatas = res.data.result;
						let applicantArr = res.data.result
            for (let i = 0; i < applicantArr.length; i++) {
              if (applicantArr[i].status == "0") {
                applicantArr[i].status = "审批中";
              } else if(applicantArr[i].status == "1"){
                applicantArr[i].status = "审核通过";
							} else {
                applicantArr[i].status = "审核不通过";
              }
						}
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    // 审核通过
    agreeApp(row) {
      console.log(row)
      // let appDatas = {
      //   companyId: row.companyId,
      //   userId: row.userId,
      //   userName: row.userName
      // }
      localStorage.setItem('userId', row.userId)
      localStorage.setItem('userName', row.userName)
    },

    // 审核不通过
		rejectApp(row) {
      console.log(row);
      let rejApp = {
        companyId: row.companyId,
        id: row.id
      }
      let that = this
      this.axios
        .post('/Applicant/decline', qs.stringify(rejApp))
        .then(res => {
          console.log(res)
          that.getApplicantList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    
		// 重置表单
		resetForm(ref) {
      this.$refs[ref].resetFields();
		},

		changeArr(val) {
      console.log(val);
      const arr = this.newObjArrSub.filter(item => {
        return val.indexOf(item.label) > -1;
      });
      this.newObjArr = arr;
		}
  },
  created() {
		this.getApplicantList()
	},
	
	// 计数器，动态渲染数据
  computed: {
    postList: {
      get: function() {
        return this.getApplicantList();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.btn_input {
  width: 250px;
  margin-right: 10px;
}
.plaHol {
  input::-webkit-input-placeholder {
    color: red;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: red;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: red;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
  }
}
.fr {
	float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.processManage .fl{
  float:left;
}
.processManage .fr{
  float:right;
}
.processManage .el-form--inline{
  width:800px;
  clear:both;
}
.lab_div{
  width:150px;
  text-align:center;
  margin:10px 0;
}
</style>
