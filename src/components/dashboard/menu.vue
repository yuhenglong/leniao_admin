<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 09:59:07
 * @Author: yuhenglong
 * @Description: 文件说明: menu列表页面
 -->
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
<template>
  <div>
    <!-- 搜索栏 -->
    <div class="menu-header">
      <el-col style="padding-bottom:0px;width:100%;">
        <el-form :inline="true" class="fl" ref="filter" :model="filter">
          <el-form-item prop="name">
            <el-input placeholder="请输入菜单名称" v-model.trim="filter.name"></el-input>
          </el-form-item>
          <el-form-item prop="menuId">
            <el-input placeholder="请输入菜单Id" v-model.trim="filter.menuId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="queryMenus()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" icon="el-icon-close" @click="resetForm('filter')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 下拉框 -->
        <el-dropdown trigger="click" class="fr">
          <span class="el-dropdown-link">
            <i class="el-icon-s-grid"></i>
            列表筛选
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="checkList">
              <div class="lab_div" v-for="(item,index) in newObjArrSub" :key="index">
                <el-checkbox :label="item.label"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
    <!-- 主体 -->
    <div class="menu-container">
      <el-table
        :data="menuDatas"
        style="width: 100%;margin-bottom: 20px;"
        row-key="menuId"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180"></el-table-column>
        <el-table-column prop="orderNum" label="排序" width="180"></el-table-column>
        <el-table-column prop="url" label="跳转地址"></el-table-column>
        <el-table-column prop="menuType" label="菜单类型"></el-table-column>
        <el-table-column prop="ename" label="菜单标识"></el-table-column>
        <el-table-column prop="delFlag" label="状态"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" value-format="yyyy-MM-dd"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" value-format="yyyy-MM-dd"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete"  circle @click="open(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加菜单弹窗 -->
    <el-dialog title="新增菜单" :visible.sync="dialogFormVisible">
      <!-- Form -->
      <el-form ref="form" :model="menuForm" label-width="100px" size="mini">
        <el-form-item label="菜单名称:" prop="name">
          <el-input v-model="menuForm.name" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="菜单标识:" prop="ename">
          <el-input v-model="menuForm.ename" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="父级编号:" prop="parentId">
          <el-input v-model="menuForm.parentId" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="orderNum">
          <el-input v-model="menuForm.orderNum" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="跳转URL:" prop="url">
          <el-input v-model="menuForm.url" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型:" prop="menuType">
          <el-input v-model="menuForm.menuType" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="图标:" prop="icon">
          <el-input v-model="menuForm.icon" class="addInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCommit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑菜单弹窗 -->
    <el-dialog title="编辑菜单" :visible.sync="dialogEditForm">
      <!-- Form -->
      <el-form ref="form" :model="editMenuForm" label-width="100px" size="mini">
        <el-form-item label="菜单名称:">
          <el-input v-model="editMenuForm.name" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="菜单标识:">
          <el-input v-model="editMenuForm.ename" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="父级编号:">
          <el-input v-model="editMenuForm.parentId" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="editMenuForm.orderNum" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="跳转URL:">
          <el-input v-model="editMenuForm.url" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型:">
          <el-input v-model="editMenuForm.menuType" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="图标:">
          <el-input v-model="editMenuForm.icon" class="addInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditCommit">确 定</el-button>
        <el-button @click="dialogEditForm = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { get } from "http";
// import request from './'
import qs from "qs";
export default {
  data() {
    return {
      value: "",
      filter: {
        name: "",
        menuType: "",
        menuId: ""
      },
      // 添加menu表单数据
      menuForm: {
        name: "", // 菜单名称
        ename: "", // 菜单标识
        parentId: "", // 父级菜单ID
        orderNum: "", //
        url: "", // 菜单名称
        menuType: "", // 菜单名称
        icon: "" // 菜单名称
      },
      checkList: [
        "菜单名称",
        "排序",
        "跳转地址",
        "菜单类型",
        "菜单标识",
        "操作"
      ],
      newObjArr: [
        { label: "菜单名称", prop: "name" },
        { label: "排序", prop: "orderNum" },
        { label: "跳转地址", prop: "url" },
        { label: "菜单类型", prop: "munrType" },
        { label: "菜单标识", prop: "ename" }
      ],
      newObjArrSub: [
        { label: "菜单名称", prop: "name" },
        { label: "排序", prop: "orderNum" },
        { label: "跳转地址", prop: "url" },
        { label: "菜单类型", prop: "munrType" },
        { label: "菜单标识", prop: "ename" }
      ],
      dialogFormVisible: false,

      page: 1,
      pager: {
        current: 1,
        pages: 2,
        size: 10,
        total: 0,
        searchCount: true,
        records: []
      },
      menuDatas: [],
      result: "",
      dialogEditForm: false,
      editMenuForm: {
        menuId: "",
        name: "",
        ename: "",
        parentId: "",
        orderNum: "",
        url: "",
        menuType: "",
        icon: ""
      },
      newMenusArr: [],
      firMenus: []
    };
  },
  methods: {
    // 获取菜单
    getMenus() {
      let params = new URLSearchParams();
      console.log(localStorage.getItem('token'))
      this.axios
        .get("/comapi/companyUser/myCompanyMenu")
        .then(res => {
          this.menuDatas = res.data.result;
          this.result = res.data.result;
          this.$store.state.MenusList = res.data.result;
          this.pager = this.$store.state.MenusList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeArr(val) {
      console.log(val);
      const arr = this.newObjArrSub.filter(item => {
        return val.indexOf(item.label) > -1;
      });
      this.newObjArr = arr;
    },
    restForm(refname) {
      this.$refs[refname].resetFields();
    },

    // 提交表单
    handleCommit() {
      console.log(this.menuForm);
      let that = this;
      this.axios
        .post(
          "/comapi/menu",
          { body: that.menuForm },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          }
        )
        .then(res => {
          console.log(res);
          this.getMenus();
          this.resetForm("form");
        })
        .catch(err => {
          console.log(qs.stringify(that.menuForm));
          console.log(err);
        });
      this.dialogFormVisible = false;
    },

    // 编辑菜单
    handleEdit(row) {
      this.dialogEditForm = true;
      console.log(row);
      (this.editMenuForm.menuId = row.menuId),
        (this.editMenuForm.name = row.name),
        (this.editMenuForm.ename = row.ename),
        (this.editMenuForm.parentId = row.parentId),
        (this.editMenuForm.orderNum = row.orderNum),
        (this.editMenuForm.url = row.url),
        (this.editMenuForm.menuType = row.menuType),
        (this.editMenuForm.icon = row.ico);
    },

    // 编辑菜单提交
    handleEditCommit() {
      let that = this;
      console.log(this.editMenuForm);
      this.axios
        .put(
          "/comapi/menu",
          { body: that.editMenuForm },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogEditForm = false;
      this.getMenus();
    },

    // 删除菜单
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      // let delMenus = []
      // delMenus.append(row.menuId)
      // let params = { setParam: [row.menuId] };
      this.axios
        .delete("/comapi/menu", {
          headers: {
            Authorization: "Bearer " + localStorage.token
          },
          data: { setParam: [row.menuId] }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: "删除失败!"
            });
          }
          this.getMenus();
        });
    },

    open(index, row) {
      this.$confirm(
        "删除该菜单可能会删除该菜单下的子级菜单，是否继续删除该菜单?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }
      )
        .then(() => {
          this.handleDelete(index, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 查询菜单
    queryMenus() {
      let that = this;
      let query = { name: this.filter.name, menuId: this.filter.menuId}
      console.log(query)
      this.axios
        .get("/comapi/menu/myCompanyMenu/",{
          headers: {
            Authorization: "Bearer" + localStorage.token
          }
        },JSON.stringify({"body": query}))
        .then(res => {
          console.log(res);
          this.menuDatas = res.data.result;
          this.result = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 重置表单
    resetForm(ref) {
      this.$refs[ref].resetFields();
    },

    // 树形结构
    tree(index) {
      let tree = this.newMenusArr[index].menus.filter(father => {
        let children = this.newMenusArr[index].menus.filter(child => {
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
    },

    getCom() {
      this.axios
        .get('/comapi/companyUser/myCompany')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  // 钩子函数: 进入页面直接调用 getMenus() 方法渲染页面
  created() {
    this.getMenus();
    this.getCom();
  },

  // 计数器，动态渲染数据
  computed: {
    myMenus: {
      get: function() {
        return this.menuDatas;
      }
    }
  }
};
</script>
<style lang="" scoped>
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

.menuManage .fl {
  float: left;
}
.menuManage .fr {
  float: right;
}
.menuManage .el-form--inline {
  width: 800px;
  clear: both;
}
.lab_div {
  width: 150px;
  text-align: center;
  margin: 10px 0;
}
.menu-header {
  padding: 10px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>