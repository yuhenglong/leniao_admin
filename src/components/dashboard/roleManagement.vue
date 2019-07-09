<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-09 19:52:42
 * @Author: yuhenglong
 * @Description: 文件说明: 角色管理
 -->
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="角色名称：">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="权限字符：">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="formInline.region" placeholder="所有">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="onSearch">搜索</el-button>
        <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table_yu">
      <div class="tableList">
        <template>
          <!-- 下拉列表选项 -->
          <el-dropdown trigger="click" class="fr mar_top">
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
        </template>

        <el-button icon="el-icon-refresh" size="mini" class="icon_reload fr" @click="refresh"></el-button>
        <!-- 表格 -->
        <template>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <template v-for="(item,index) in newObjArr">
              <el-table-column :prop="item.prop" :label="item.label" width="160" :key="index"></el-table-column>
            </template>
            <el-table-column align="right" width="550" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="onEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
                <el-button type="success" @click="dataPermission()" icon="el-icon-check">数据权限</el-button>
                <el-button type="warning" @click="assigningUsers()" icon="el-icon-user-solid">分配用户</el-button>
                <el-button type="danger" @click="del(scope.row)" icon="el-icon-delete-solid">删除</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="角色名称" width="120"></el-table-column>
            <el-table-column prop="roleKey" label="权限字符" width="120"></el-table-column>
            <el-table-column prop="roleSort" label="显示顺序" width="120"></el-table-column>
            <el-table-column prop="status" label="角色状态" width="120"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
            <el-table-column label="操作">
              <el-button type="primary" @click="onEdit()" icon="el-icon-edit">编辑</el-button>
              <el-button type="primary" @click="dataPermission()" icon="el-icon-check">数据权限</el-button>
              <el-button type="primary" @click="assigningUsers()" icon="el-icon-user-solid">分配用户</el-button>
              <el-button type="primary" @click="del()" icon="el-icon-delete-solid">删除</el-button>
            </el-table-column>-->
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection()" id="choseBtn">全选当前</el-button>
          </div>
        </template>
        <!-- 分页功能 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.current"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pager.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pager.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="新增用户" :visible.sync="dialogVisible">
      <el-form :label-position="'right'" label-width="80px">
        <el-form-item label="角色编号">
          <el-input placeholder="请输入编号" v-model="row.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input placeholder="请输入" v-model="row.name"></el-input>
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input placeholder="请输入" v-model="row.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input placeholder="请输入" v-model="row.roleSort"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-input placeholder="请输入" v-model="row.status"></el-input>
=======
<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-input placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="手机号码"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="state" placeholder="用户状态">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker type="daterange" v-model="dateRange" align="right" unlink-panels range-separator="至" start-placeholder="注册开始日期" end-placeholder="注册结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
        <br>
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
        <el-button size="medium" icon="el-icon-upload2">导入</el-button>
        <el-button size="medium" icon="el-icon-download">导出</el-button>
        <el-button size="medium" icon="el-icon-delete">删除</el-button>
      </div>
      <el-table :data="pager.records" style="width: 100%" stripe highlight-current-row v-loading="" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column label="手机号码" width="150">
          <template slot-scope="scope">
            {{ '+' + scope.row.nation + ' ' + scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="电子邮件" width="200"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100"></el-table-column>
        <el-table-column label="出生日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.birthday | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" :type="'success'">已启用</el-tag>
            <el-tag v-if="!scope.row.enabled" :type="'danger'">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.createDate | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="最后登陆日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.signInDate | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" size="small" @click="edit()">编辑</el-button>
            <el-button type="text" size="small" @click="remove()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="pager.current" :page-size="pager.size" :total="pager.total" class="pagination text-right"></el-pagination>
    </el-card>

    <el-dialog title="新增用户" :visible.sync="dialogVisible">
      <el-form :label-position="'right'" label-width="80px">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" placeholder="再次确认密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="test" class="input-with-select">
            <el-select v-model="test1" slot="prepend" placeholder="国际码" style="width:90px;">
              <el-option label="+86" value="86"></el-option>
              <el-option label="+80" value="80"></el-option>
              <el-option label="+88" value="88"></el-option>
              <el-option label="+202" value="202"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="test1" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="true"></el-option>
            <el-option label="女" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="test" align="right" type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload :data="{bucketName:bucketName}" :on-remove="onRemoveFile" list-type="picture-card"><i class="el-icon-plus"></i></el-upload>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
<<<<<<< HEAD
        <el-button type="primary" @click="confirm()">确 定</el-button>
=======
        <el-button type="primary">确 定</el-button>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      </div>
    </el-dialog>
  </div>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
<<<<<<< HEAD
import qs from 'qs'
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
export default {
  name: "userControl",
  data() {
    return {
      dialogVisible: false,
      state: null,
      dateRange: null,
<<<<<<< HEAD
      user: "",
      region: "",
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
<<<<<<< HEAD
      formInline: {
        user: "",
        region: ""
      },
      pager: { current: 1, size: 10, total: 0, records: [] },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      row:{
        id:'',
        name:'',
        roleKey:'',
        roleSort:'',
        status:''
      },
      value1: "",
      value2: "",
      currentPage4: 1,
      checkList: [
        "角色编号",
        "角色名称",
        "权限字符",
        "显示顺序",
        "角色状态",
        "创建时间"
      ],
      newObjArr: [
        { label: "角色编号", prop: "id" },
        { label: "角色名称", prop: "name" },
        { label: "权限字符", prop: "roleKey" },
        { label: "显示顺序", prop: "roleSort" },
        { label: "角色状态", prop: "status" },
        { label: "创建时间", prop: "createTime" }
      ],
      newObjArrSub: [
        { label: "角色编号", prop: "id" },
        { label: "角色名称", prop: "name" },
        { label: "权限字符", prop: "roleKey" },
        { label: "显示顺序", prop: "roleSort" },
        { label: "角色状态", prop: "status" },
        { label: "创建时间", prop: "createTime" }
      ],
      isCheckAll: true,
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios.get("/comapi/role/myCompanyRole").then(res => {
        console.log("这是返回的数据", res);
        if (res.data.status == 1) {
          this.tableData = res.data.result.records;
          this.pager.current = res.data.result.pages;
          this.pager.size = res.data.result.size;
          this.pager.total = res.data.result.total;
        }
      });
    },
    confirm(){
      let newToken = "Bearer " + localStorage.getItem("token");
      fetch('/comapi/role',{
        method:'PUT',
        mode:'cors',
        headers:{
          Authorization: newToken,
          "Content-Type":'application/json'
        },
        body:JSON.stringify({
          body:this.row
        })
      }).then(res => {
        console.log(res)
      })
    },
    del(row){
      let that = this;
      const url = '/comapi/role/' + row.id;
      this.axios.delete(url).then(res =>{
        console.log('删除',res)
        this.getList();
      })
    },
    query() {},
    onSearch() {},
    reset() {},
    onEdit(row) {
      this.dialogVisible = true;
      console.log(row);
      this.row.id = row.id;
      this.row.name = row.name;
      this.row.roleKey = row.roleKey;
      this.row.roleSort = row.roleSort;
      this.row.status = row.status;
=======
      pager: { current: 1, size: 10, total: 0, records: [] }
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
    
    },
    edit() {
      this.dialogVisible = true;
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
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
<<<<<<< HEAD
    onRemoveFile(file) {},
    refresh() {
      console.log("刷新页面");
    },
    toggleSelection() {
      let cbtn = document.getElementById("choseBtn");
      if (this.isCheckAll == true) {
        cbtn.innerHTML = "取消全选";
      } else {
        cbtn.innerHTML = "全选";
      }
      this.isCheckAll = !this.isCheckAll;
      let newRows = this.tableData;
      newRows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeArr(val) {
      console.log(val);
      const arr = this.newObjArrSub.filter(item => {
        return val.indexOf(item.label) > -1;
      });
      this.newObjArr = arr;
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.tableList {
  margin-top: 10px;
  .fr {
    float: right;
  }
  .mar_top {
    margin-top: 6px;
    margin-left: 10px;
  }
  .icon_reload:hover {
    cursor: pointer;
  }
  .block {
    margin-top: 10px;
  }
}
.lab_div {
  width: 150px;
  text-align: center;
  margin: 10px 0;
}
</style>
=======
    onRemoveFile(file) {
      
    }
  }
};
</script>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
