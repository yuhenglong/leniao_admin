<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-input v-model="inputName" placeholder="请输入部门名称"></el-input>
          </el-col>
          <el-col :span="3" class="plaHol">
            <el-select v-model="ComName" placeholder="所有">
              <el-option :label="'所有'" :value="-1"></el-option>
              <el-option :label="'正常'" :value="0"></el-option>
              <el-option :label="'失败'" :value="1"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              type="daterange"
              v-model="dateRange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-input v-model="input" placeholder="请输入内容" class="btn_input"></el-input>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :default-sort="{prop: 'sort', order: 'descending'}"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="公司名称" sortable width="180"></el-table-column>
        <el-table-column prop="sort" label="排序" sortable width="180"></el-table-column>
        <el-table-column prop="delFlag" label="状态" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="handEdit(scope.row)" type="warning" size="small">编辑</el-button>
            <el-button @click="handAdd(scope.row)" type="success" size="small">新增</el-button>
            <el-button @click="isDialog(scope.row)" type="danger" size="small">删除</el-button>
            <!-- <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pager.current"
        :page-size="pager.size"
        :total="pager.total"
        class="pagination text-right"
      ></el-pagination>
    </el-card>

    <el-dialog title="新增部门" :visible.sync="dialogVisible">
      <el-form :label-position="'right'" label-width="80px">
        <el-form-item label="部门名字">
          <!-- <el-input placeholder="请输入新增名字" v-model="DepartmentName"></el-input> -->
          <el-input v-model="DepartmentName" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="dialogEdit">
      <el-form :label-position="'right'" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editName"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editIndex"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <lnDialog v-bind:showDialog="isShow" @click="isDialog" @closeDialog="isDialog" @delete="handleDelete"></lnDialog>
  </div>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import qs from "qs";
import lnDialog from '@/components/dialog/lnDialog'
export default {
  name: "selfCreatedCompany",
  components:{
    lnDialog
  },
  data() {
    return {
      isShow:false,
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
      tableData: [],
      DepartmentName: "",
      Department: {
        companyId: "",
        name: "",
        createUser: "",
        topId: ""
      },
      delRow:''
    };
  },
  created() {
    this.getList();
  },

  methods: {
    isDialog(row){
      this.isShow = !this.isShow;
      this.delRow = row;
      console.log('这是isshow的值',this.isShow)
    },
    getList() {
      let obj = {
        // companyId:localStorage.getItem('companyId')
        // 这是王景的写死的公司ID
        companyId: "302364aauyhf401ats7c1113f55b2e49",
        delFlag: 0
      };
      this.axios.post("/dept/selectDept", qs.stringify(obj)).then(res => {
        if(res.data.status ==1){
          let subData = res.data.result;
          for(let i = 0;i<subData.length;i++){
            if(subData[i].delFlag == 0){
              subData[i].delFlag = "正常"
            }else{
              subData[i].delFlag = "删除"
            }
          }
          let tree = subData.filter(father => {
              let children = subData.filter(child => {
                return father.deptId === child.topId;
              });
              father.children = children;
              if (children.length === 0) {
                father.isChildren = false;
              } else {
                father.isChildren = true;
              }
              return father.topId == 0;
            });
            this.tableData = tree;
        }
      });
    },
    addSubmit() {
      this.Department.name = this.DepartmentName;
      console.log(this.Department);
      this.axios
        .post("/dept/insertDept", qs.stringify(this.Department))
        .then(res => {
          console.log(res);
          this.getList();
          this.DepartmentName = "";
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
      this.dialogEdit = true;
      this.editName = row.name;
      this.editIndex = row.sort;
      this.LnCompanyDept = row.deptId;
      this.companyId = row.companyId;
    },
    editConfirm() {
      const obj = {
        name: this.editName,
        sort: this.editIndex,
        deptId: this.LnCompanyDept,
        companyId: this.companyId
      };
      this.axios.post("/dept/updateDept", obj).then(res => {
        this.getList();
      });
      this.dialogEdit = false;
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map(item => item.userId);
    },
    remove() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
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
    handleDelete() {
      const params = {
        deptId: this.delRow.deptId
      };
      console.log('这是删除的当前行',params)
      this.axios.post("dept/deleteDept", qs.stringify(params)).then(res => {
        console.log(res);
      });
      this.getList();
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
</style>
