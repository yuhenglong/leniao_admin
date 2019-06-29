<!--
 * @Date: 2019-06-25 11:02:12
 * @LastEditTime: 2019-06-26 17:43:40
 * @Author: guobinggui
 * @Description: 文件说明: 部门管理
 -->
<template>
  <div>
			<div class="menu-header">
      <el-col style="padding-bottom:0px;width:100%;">
        <el-form :inline="true" class="fl" ref="filter" :model="filter">
          <el-form-item prop="postName">
            <el-input placeholder="请输入岗位名称" v-model.trim="filter.postName"></el-input>
          </el-form-item>
          <el-form-item prop="postCode">
            <el-input placeholder="请输入岗位代码" v-model.trim="filter.postCode"></el-input>
          </el-form-item>
					<el-form-item prop="status">
            <el-select v-model="filter.status" placeholder="所有">
              <el-option :label="'所有'" :value="-1"></el-option>
              <el-option :label="'正常'" :value="0"></el-option>
              <el-option :label="'禁用'" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="getPostList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" icon="el-icon-refresh" @click="resetForm('filter')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-dropdown trigger="click" class="fr">
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
        </el-dropdown>
      </el-col>
    </div>
		
		<el-card>
      <el-table
        :data="postDatas"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        default-expand-all
        :default-sort="{prop: 'sort', order: 'descending'}"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="postId" label="岗位编号" width="180"></el-table-column>
        <el-table-column prop="postName" label="岗位名称" width="180"></el-table-column>
        <el-table-column prop="postCode" label="岗位代码" width="180"></el-table-column>
        <el-table-column prop="postSort" label="显示顺序" sortable width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              @click="handEdit(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              size="small"
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

		<!-- 添加岗位窗口 -->
    <el-dialog title="添加岗位" :visible.sync="dialogVisible">
      <el-form :label-position="'right'" label-width="80px">
        <el-form-item label="岗位名字">
          <!-- <el-input placeholder="请输入新增名字" v-model="DepartmentName"></el-input> -->
          <el-input v-model="PostObj.postName" placeholder="请输入内容"></el-input>
        </el-form-item>
				<el-form-item label="岗位代码">
          <!-- <el-input placeholder="请输入新增名字" v-model="DepartmentName"></el-input> -->
          <el-input v-model="PostObj.postCode" placeholder="请输入内容"></el-input>
        </el-form-item>
				<el-form-item label="岗位排序">
          <!-- <el-input placeholder="请输入新增名字" v-model="DepartmentName"></el-input> -->
          <el-input v-model="PostObj.postSort" placeholder="请输入内容"></el-input>
        </el-form-item>
				<el-form-item label="岗位说明">
          <!-- <el-input placeholder="请输入新增名字" v-model="DepartmentName"></el-input> -->
          <el-input v-model="PostObj.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

		<!-- 编辑岗位窗口 -->
    <el-dialog title="编辑" :visible.sync="dialogEdit">
      <el-form :label-position="'right'" label-width="80px">
        <!-- <el-form-item label="上级部门">
          <el-input v-model=""></el-input>
        </el-form-item>-->
        <el-form-item label="岗位名称">
          <el-input v-model="EditPost.postName"></el-input>
        </el-form-item>
				<el-form-item label="岗位代码">
          <el-input v-model="EditPost.postCode"></el-input>
        </el-form-item>
				<el-form-item label="岗位排序">
          <el-input v-model="EditPost.postSort"></el-input>
        </el-form-item>
				<el-form-item label="岗位状态">
          <el-input v-model="EditPost.status"></el-input>
        </el-form-item>
				<el-form-item label="岗位描述">
          <el-input v-model="EditPost.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
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
			checkList: [
        "岗位名称",
        "岗位代码",
        "岗位编号",
        "显示顺序",
        "岗位状态",
				"创建时间"
      ],
      newObjArr: [
        { label: "岗位名称", prop: "postName" },
        { label: "岗位代码", prop: "postCode" },
        { label: "岗位编号", prop: "postId" },
        { label: "显示顺序", prop: "postSort" },
        { label: "岗位状态", prop: "status" },
        { label: "创建时间", prop: "createTime" }
			],
			newObjArrSub: [
        { label: "岗位编号", prop: "postId" },
        { label: "岗位名称", prop: "postName" },
        { label: "岗位代码", prop: "postCode" },
        { label: "显示顺序", prop: "postSort" },
        { label: "岗位状态", prop: "status" },
        { label: "创建时间", prop: "createTime" }
      ],
      inputName: "",
      input: "",
      industry: "",
      dialogVisible: false,
      dialogEdit: false,
      editName: "",
      editIndex: "",
      LnCompanyDept: "",
      companyId: "",
      state: null,
      ComName: "",
      delFlage: "",
      dateRange: null,
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
      pager: { current: 1, size: 10, total: 0, records: [] },
      postDatas: [],
      currentRow: null,
      DepartmentName: "",
      Department: {
        companyId: "",
        name: "",
        createUser: "",
        topId: ""
			},
			PostObj: {
        postCode: "",
        companyId: "302364aauyhf401ats7c1113f55b2e49",   // 死数据，后面改成localStorage.getItem('companyId')
        postName: "",
        postSort: "",
        remark: ""
			},
			EditPost: {
				companyId: '302364aauyhf401ats7c1113f55b2e49',     // 死数据，后面改成localStorage.getItem('companyId')
				postId: '',
				postName: '',
				postCode: '',
				postSort: '',
				status: '',
				remark: '',
			}
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
    ceshi(val) {
      console.log(val);
		},
		
		// 获取岗位列表
    getPostList() {
      let obj = {
        // companyId:localStorage.getItem('companyId')
        // 这是王景的写死的公司ID
				companyId: "302364aauyhf401ats7c1113f55b2e49",
				name: this.filter.postName,
				status: this.filter.status,
				postCode: this.filter.postCode
			};
			if(obj.status == -1) {
				obj.status = ''
			}
			// if(obj.status == "正常") {
			// 	obj.status = 0
			// } else if (obj.status == '禁用') {
			// 	obj.status = 1
			// } else {
			// 	obj.status = ''
			// }
      let that = this;
      this.axios
        .post("/post/findAll", qs.stringify(obj))
        .then(res => {
					console.log(res);   // 输出返回信息
					if(res.data.result == null) {
							return that.postDatas = []
						}
          if (res.data.status == 1) {
						// console.log(res);
						that.postDatas = res.data.result;
						let postArr = res.data.result
            for (let i = 0; i < postArr.length; i++) {
              if (postArr[i].status == 0) {
                postArr[i].status = "正常";
              } else {
                postArr[i].status = "禁用";
							}
						}
          }
        })
        .catch(err => {
          console.log(err);
        });
		},
		
		// 提交添加
    addSubmit() {
      // console.log(this.PostObj); // 输出PostObj对象
      this.axios
        .post("/post/insertPost", qs.stringify(this.PostObj))
        .then(res => {
          console.log(res);
          this.getPostList();
          this.PostObj = "";
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogVisible = false;
		},
		
    edit() {
      this.dialogVisible = true;
		},
		
    handEdit(row) {
			// console.log(row)   // 输出当前点击对象信息
      this.dialogEdit = true;
      this.EditPost.companyId = row.companyId;
      this.EditPost.postId = row.postId;
      this.EditPost.postName = row.postName;
      this.EditPost.postCode = row.postCode;
      this.EditPost.postSort = row.postSort;
			this.EditPost.status = row.status;
      this.EditPost.remark = row.remark;
		},
		// 编辑提交
    editConfirm() {
			let that = this
			if(this.EditPost.status == "正常") {
				this.EditPost.status = 0
			} else if(this.EditPost.status == "禁用"){
				this.EditPost.status = 1
			} else {
				alert("您输入的状态信息有误，请重新输入!")
			}
      this.axios.post("/post/updatePost", that.EditPost).then(res => {
				if(res.status == 301) {
					alert(res.data.message)
				}
				console.log(res)
        this.getPostList();
      });
      this.dialogEdit = false;
		},
		
    onSelectionChange(rows) {
      this.selectedRows = rows.map(item => item.userId);
		},
		
		// 删除提示
    remove() {
      this.$confirm("此操作将该岗位禁用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
    },
    onRemoveFile(file) {},
    handAdd(row) {
      this.Department = {
        companyId: row.companyId,
        createUser: row.createUser,
        topId: row.deptId
      };
      this.dialogVisible = true;
		},
		
		// 删除岗位
    handleDelete(row) {
      console.log(row);
      const params = {
        postId: row.postId
			};
			this.remove()
      this.axios.post("/post/deletePost", params).then(res => {
        console.log(res);
      });
      this.getPostList();
    },
    handleCurrentChange(val) {
      this.currentRow = val;
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
		this.getPostList()
	},
	
	// 计数器，动态渲染数据
  computed: {
    postList: {
      get: function() {
        return this.postDatas;
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
