<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-09 19:35:51
 * @Author: yuhenglong
 * @Description: 文件说明: 用户控制
 -->
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-tree
          :data="deptTree"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-aside>
      <el-main>
        <el-card shadow="never" :body-style="{ padding: '0px' }">
          <div slot="header">
            <el-row :gutter="10">
              <el-col :span="3">
                <el-input placeholder="用户名"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input placeholder="手机号码"></el-input>
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
                <el-button type="primary" icon="el-icon-search">查询</el-button>
              </el-col>
            </el-row>
            <br />
            <el-button size="medium" icon="el-icon-upload2" type="warning">导入</el-button>
            <el-button size="medium" icon="el-icon-download" type="primary">导出</el-button>
            <el-button size="medium" icon="el-icon-delete" type="danger">删除</el-button>
          </div>

          <el-table
            ref="table"
            border
            stripe
            highlight-current-row
            :data="users"
            style="width: 100%;"
          >
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机号码" prop="phoneNumber"></el-table-column>
            <el-table-column label="部门" prop="deptName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="updateUser(scope.row)" type="text">编辑</el-button>
                <el-button type="text" @click="remove(scope.row)">删除</el-button>
                <el-button type="text" @click="toogleExpand(scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column type="expand" width="1">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="手机号码">
                    <span>{{ props.row.phoneNumber }}</span>
                  </el-form-item>
                  <el-form-item label="性别">
                    <span v-if="props.row.sex == 1">女</span>
                    <span v-if="props.row.sex == 0">男</span>
                  </el-form-item>
                  <el-form-item label="部门">
                    <span>{{ props.row.deptName }}</span>
                  </el-form-item>
                  <el-form-item label="岗位">
                    <span
                      v-for="item in props.row.posts"
                      :key="item.index"
                    >{{ item.postName }}&nbsp;&nbsp;</span>
                  </el-form-item>
                  <el-form-item label="角色">
                    <span
                      v-for="item in props.row.roles"
                      :key="item.index"
                    >{{ item.roleName }}&nbsp;&nbsp;</span>
                  </el-form-item>
                  <el-form-item label="技能">
                    <span
                      v-for="item in props.row.skills"
                      :key="item.index"
                    >{{ item.skillName }}&nbsp;&nbsp;</span>
                  </el-form-item>
                </el-form>
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
      </el-main>
    </el-container>

    <el-dialog title="用户信息详情" :visible.sync="dialogVisible"></el-dialog>
  </div>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import qs from "qs";
import { resolve } from 'url';
import { setTimeout } from 'timers';
export default {
  name: "userControl",
  data() {
    return {
      dialogVisible: false,
      state: null,
      dateRange: null,
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
      pager: { current: 1, size: 10, total: 0, records: [] },
      companyId: localStorage.getItem("companyId"),
      users: [],
      newDeptsArr: [],
      firDepts: [],
      deptsArr: [],
      zdcommand: 0,
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      userInfo: [],
      deptTree: []
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    /**
     * @author: guobinggui
     * @description: 函数说明:查询当前公司所有用户
     * @param {type}
     * @return:
     */
    // 查询公司所有用户
    queryAllUsers() {
      let that = this;
      this.axios
        .post("/manage/findAll", qs.stringify({ companyId: that.companyId }))
        .then(res => {
          // console.log("----------------------------------")
          console.log(res);
          that.users = res.data.result;
          // console.log(that.users)
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * @author: guobinggui
     * @description: 函数说明:按条件查询当前公司用户
     * @param {type}
     * @return:
     */
    queryUser() {
      let that = this;
      let queryObj = {
        companyId: that.companyId
      };
    },

    /**
     * @author: guobinggui
     * @description: 函数说明:
     * @param {type}
     * @return:
     */
    queryAllDepts() {
      let that = this;
      this.axios
        .post("/dept/selectDept", qs.stringify({ companyId: that.companyId, delFlag: 0 }))
        .then(res => {
          console.log('res', res)
          if (res.data.status == 1) {
            // this.$store.commit("setDeptsData", res.data.result);
            // this.deptsArr = this.$store.state.deptsData;
            // this.newDeptsArr = this.deptsArr;
            // this.tree(this.zdcommand);
            // this.newDeptsArr = res.data.result;
            // this.tree(this.newDeptsArr);
          }
          this.newDeptsArr = res.data.result;
          this.deptTree = this.tree(this.newDeptsArr, 0);
          // console.log("樹");
          // console.log(this.newDeptsArr);
          // console.log("部门");
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 后台数据转树形结构
     * @param {type}
     * @return:
     */
    // tree(list) {
    //   let deptTemp = list;
    //   // 以id为键，当前对象为值，存入一个新的对象中
    //   let deptObj = {};
    //   for (let i in deptTemp) {
    //     deptObj[deptTemp[i].id] = deptTemp[i];
    //   }
    //   return deptTemp.filter(father => {
    //     // 把当前节点的所有子节点找到
    //     let childArr = deptTemp.filter(child => father.deptId === child.topId);
    //     childArr.length > 0 ? (father.children = childArr) : "";
    //     // 只返回第一级数据；如果当前节点的fatherId不为空，但是在父节点不存在，也为一级数据
    //     return father.topId === null || !deptObj[father.topId];
    //   });
    // },
  tree(data, pid) {
      const result = []
      let temp = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].topId == pid) {
          const obj = data[i]
          temp = this.tree(data, data[i].deptId)
          if (temp.length > 0) {
            obj.children = temp
          }
          result.push(obj)
        }
      }
      // console.log("result", result)
      return result
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 根据部门查找用户
     * @param {type} 
     * @return: 
     */
    handleNodeClick(data) {
      let that = this;
      this.axios
        .post(
          "/manage/findAll",
          qs.stringify({
            companyId: that.companyId,
            deptId: data.deptId
          })
        )
        .then(res => {
          this.users = res.data.result;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map(item => item.userId);
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 删除用户
     * @param {type} 
     * @return: 
     */
    remove(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.axios
          .post('/manage/deleteUser', qs.stringify({
            companyId: this.companyId,
            userId: row.userId
          }))
          .then(res => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.queryAllUsers()
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(() => {

      });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 获取当前用户的详细信息
     * @param {type} 
     * @return: 
     */
    async detail(row) {
      console.log("row1", row);
      await this.axios
        .post(
          "/manage/detail",
          qs.stringify({
            companyId: localStorage.getItem('companyId'),
            userId: row.userId
          })
        )
        .then(res => {
          // console.log('********', res)
          row.posts = [...new Set(res.data.result.post)];
          row.roles = [...new Set(res.data.result.role)];
          row.skills = [...new Set(res.data.result.skill)];
          localStorage.setItem("userInfo", JSON.stringify(row))
          // console.log('********', row)
        })
        .catch(err => {
          console.log(err);
        });
    },
    onRemoveFile(file) {},
    handleCheck(row) {
      const $table = this.$refs.table;

      $table.toggleRowExpansion(row);
      $table.toggleRowSelection(row);
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 详情点击事件，
     * @param {type} 
     * @return: 
     */
    toogleExpand(row) {
      // 设置一个标志
      if (!row.flag) {
        row.flag = true;
        this.detail(row);
      }
      let $table = this.$refs.table;
      this.users.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
        }
      });
      $table.toggleRowExpansion(row);
    },
    async updateUser(row) {
      await this.detail(row).then(() => {
        this.$router.replace('/dashboard/updateUserInfo')
      })
      // setTimeout(this.$router.replace('/dashboard/updateUserInfo'),2000)
    }
  },
  created() {
    this.queryAllUsers();
  },
  mounted() {
    this.queryAllDepts();
  },
  computed: {
    usersList: {
      get: function() {
        return this.users;
      }
    }
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
