<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-15 11:17:35
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
    <el-dialog title="修改角色" :visible.sync="dialogVisible">
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
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            :data="firMenus"
            show-checkbox
            node-key="menuId"
            :props="defaultProps"
            :default-expanded-keys="[]"
            :default-checked-keys="checkedList"
            @getCurrentNode="getCurrentNode"
            ref="tree"
          ></el-tree>
                      <!-- @check-change="getCheckedNodes(true)" -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
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
import qs from "qs";
import { log } from "util";
export default {
  name: "userControl",
  data() {
    return {
      ls_companyId: "",
      dialogVisible: false,
      state: null,
      dateRange: null,
      user: "",
      region: "",
      userId: "",
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
      formInline: {
        user: "",
        region: ""
      },
      checkedList:[],
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
      row: {
        id: "",
        name: "",
        roleKey: "",
        roleSort: "",
        status: ""
      },
      params_two: "",
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
      firMenus: [],
      tableData: [],
      treeArray: "",
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    setCheckedKeys(keys, leafOnly) {
      console.log(keys, leafOnly);
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    getCheckedNodes(){
      console.log(this.$ref.tree)
    },
    handleNodeClick(data) {
      console.log(data);
    },
    getCurrentNode(a, b, c) {
      console.log(a, b, c);
    },
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
    getMenu() {},
    /**
     * @author: guobinggui
     * @description: 函数说明: 提交修改请求
     * @param {type} 
     * @return: 
     */
    confirm() {
      let newToken = "Bearer " + localStorage.getItem("token");
      fetch("/comapi/role", {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: newToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ body: this.row })
      }).then(res => {
        console.log(res);
      });
      // 获取树形组件的选中项
      console.log(
        "这是选中的tree",
        // this.$refs.tree.getCheckedNodes(false, true)
        this.$refs.tree.getCheckedNodes()
      );
      // let menuIdArr = this.$refs.tree.getCheckedNodes(false, true);
      let menuIdArr = this.$refs.tree.getCheckedNodes();
      let menuDetailArr = [];
      for (let i = 0; i < menuIdArr.length; i++) {
        menuDetailArr.push(menuIdArr[i].menuId);
      }
      const params = {
        params:{
            roleId: this.row.id,
        },
        setParam: menuDetailArr,
        companyId:this.ls_companyId
      };
      console.log("这是params", params);
      this.axios.post("/comapi/bind/roleBindMenu", JSON.stringify(params),{
        headers:{
            "Content-Type":"application/json;charset=UTF-8"
          }
      }).then(res => {
        console.log("这是返回给后端的树", res);
        if(res.data.status ==1){
          this.dialogVisible = false;
          this.$message('权限设置已经成功！！');
        }
      });

    },
    del(row) {
      let that = this;
      const url = "/comapi/role/" + row.id;
      this.axios.delete(url).then(res => {
        console.log("删除", res);
        this.getList();
      });
    },
    query() {},
    onSearch() {},
    reset() {},
    getMenuTree() {
      const params = {
        // access_token: localStorage.getItem("token"),
        companyId: this.ls_companyId,
        userId: this.userId,
        params:{
          roleId:this.row.id
        }
      };
      // 这是旧的menu树形结构
      // this.axios
      //   .post("/comapi/menu/myCompanyMenu", qs.stringify(params))
      //   .then(res => {
      //     console.log('这是check的信息',res)
      //     if (res.data.status == 1) {
      //       this.tree(res.data.result);
      //     }
      //   });
      // 这是最新的menu结构

      this.axios
        .post("/comapi/menu/comMenuAndRoleMenus",JSON.stringify(params),{
          headers:{
            "Content-Type":"application/json;charset=UTF-8"
          }
        })
        .then(res => {
          console.log('这是最新的check的信息',res)
          if (res.data.status == 1) {
            this.checkedList = res.data.result.rMenuIds;
            this.tree(res.data.result.menuAll);
          }
        });
    },
    tree(arr) {
      let tree = arr.filter(father => {
        let children = arr.filter(child => {
          return father.menuId === child.parentId;
        });
        father.children = children;
        if (children.length === 0) {
          father.isChildren = false;
        } else {
          father.isChildren = true;
        }
        return father.parentId == 0;
      });
      this.firMenus = tree;
      console.log("这是过滤树", tree);
    },
    getUserId() {
      this.axios.get("/comUser/user/myInfo").then(res => {
        console.log("这是UserId数据", res);
        this.userId = res.data.result.userId;
        this.getMenuTree(this.userId);
      });
    },
    onEdit(row) {
      this.dialogVisible = true;
      console.log(row);
      this.row.id = row.id;
      this.row.name = row.name;
      this.row.roleKey = row.roleKey;
      this.row.roleSort = row.roleSort;
      this.row.status = row.status;
      this.ls_companyId = row.companyId;
      const promiseObj = new Promise(this.getUserId);
      promiseObj.then(this.getMenuTree);
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
  }
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