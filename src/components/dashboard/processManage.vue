<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 10:00:15
 * @Author: yuhenglong
 * @Description: 文件说明: 工序管理
 -->
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
<template>
  <div class="processManage">
    <template>
      <el-col style="padding-bottom:0px;width:100%;">
        <el-form :inline="true" :model="filters" @submit.native.prevent class="fl">
          <el-form-item>
            <el-input placeholder="请输入名称" v-model.trim="filters.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="inquire">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="dialogFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>

        <!-- 下拉列表选项 -->
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
    </template>

    <el-table style="width: 100%" :data="pager.records">
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <template v-for="(item,index) in newObjArr">
        <el-table-column :prop="item.prop" :label="item.label" width="160" :key="index"></el-table-column>
      </template>
      <el-table-column align="right" width="550" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹窗表格 -->
    <el-dialog title="新增工序" :visible.sync="dialogFormVisible">
      <!-- Form -->
      <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
        <el-form-item label="工序名称:">
          <el-input v-model="sizeForm.name" class="addInput"></el-input>
        </el-form-item>
        <!-- <el-form-item label="公司编号:">
          <el-input v-model="sizeForm.companyId" class='addInput'></el-input>
        </el-form-item>-->
        <el-form-item label="工序所需技能:">
          <el-input v-model="sizeForm.skill" class="addInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑工序" :visible.sync="dialogCompile">
      <!-- Form -->
      <el-form ref="form" :model="editForm" label-width="100px" size="mini">
        <el-form-item label="工序名称:">
          <el-input v-model="editForm.name" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="工序所需技能:">
          <el-input v-model="editForm.skill" class="addInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCompile = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

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
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";

export default {
  data() {
    return {
      search: "",
      filters: {
        name: ""
      },
      checkList: ["公司编号", "工序名称", "所需技能"],
      newObjArr: [
        { label: "公司编号", prop: "companyId" },
        { label: "工序名称", prop: "name" },
        { label: "所需技能", prop: "skill" }
      ],
      newObjArrSub: [
        { label: "公司编号", prop: "companyId" },
        { label: "工序名称", prop: "name" },
        { label: "所需技能", prop: "skill" }
      ],
      page: 1,
      // 当前页面
      ym_val: null,
      users: [],
      dialogFormVisible: false,
      dialogCompile: false,
      sizeForm: {
        name: "",
        companyId: this.$store.state.companyId,
        skill: ""
      },
      editForm: {
        name: "",
        skill: ""
      },
      pager: {
        current: 1,
        pages: 2,
        size: 10,
        total: 0,
        searchCount: true,
        records: []
      },
      editEid: null
    };
  },
  methods: {
    // 加载列表
    getUsers() {
      // 原先的请求
      this.axios
        .post("/api/procedure/findList")
        .then(res => {
          this.$store.state.processManageData = res.data.result;
          this.pager = this.$store.state.processManageData;
        })
    },
    // 改变数组
    changeArr(val) {
      console.log(val);
      const arr = this.newObjArrSub.filter(item => {
        return val.indexOf(item.label) > -1;
      });
      this.newObjArr = arr;
    },
    // 暂未用到
    addUsers() {
      console.log("新增数据");
    },
    // 打开编辑弹窗
    openEdit(row) {
      console.log(row);
      this.dialogCompile = true;
      this.editEid = row.eid;
      this.editForm.name = row.name;
      this.editForm.skill = row.skill;
    },
    handleEdit() {
      // 编辑工序
      let params = {
        eId: this.editEid,
        name: this.editForm.name,
        skill: this.editForm.skill
      };
      this.axios
        .post("/api/procedure/update", qs.stringify(params))
        .then(res => {
          const action = {
            pageNum: parseInt(this.ym_val),
            size: this.pager.size
          };
          let that = this;
          this.axios.post("/api/procedure/findList", action).then(res => {
            that.pager = res.data.result;
          });
          this.dialogCompile = false;
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
        });
      this.editForm.name = "";
      this.editForm.skill = "";
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      let params = { eId: row.eid };
      this.axios.post("/api/procedure/del", qs.stringify(params)).then(res => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleCurrentChange(that.ym_val);
        } else {
          this.$message({
            type: "info",
            message: "删除失败!"
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.ym_val = val;
      // this.ym_val = `${val}`;
      const action = {
        pageNum: parseInt(this.ym_val),
        size: this.pager.size
      };
      let that = this;
      this.axios
        .post("/api/procedure/findList", qs.stringify(action))
        .then(res => {
          that.pager = res.data.result;
        });
    },
    open(index, row) {
      this.$confirm("是否继续删除该工序?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
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
    handleCommit() {
      let that = this;
      this.axios
        .post("/api/procedure/add", qs.stringify(this.sizeForm))
        .then(res => {
          console.log(res);
          this.handleCurrentChange(that.ym_val);
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },
    proChe() {
      console.log(!this.proChecked);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    inquire() {
      const action = { name: this.filters.name };
      this.axios
        .post("/api/procedure/findList", qs.stringify(action))
        .then(res => {
          console.log(res);
          this.$store.state.processManageData = res.data.result;
          this.pager = this.$store.state.processManageData;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUsers();
  },
  computed: {}
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

.processManage .fl {
  float: left;
}
.processManage .fr {
  float: right;
}
.processManage .el-form--inline {
  width: 800px;
  clear: both;
}
.lab_div {
  width: 150px;
  text-align: center;
  margin: 10px 0;
}
</style>