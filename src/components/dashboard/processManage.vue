<template>
  <div class="userManagement">
    <el-table style="width: 100%" :data="pager.records">
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <!-- <el-table-column prop="eid" width="200" label="编号"></el-table-column> -->
      <el-table-column prop="companyId" label="公司编号" width="120"></el-table-column>-->
      <el-table-column prop="name" label="工序名称" width="160"></el-table-column>
      <el-table-column prop="skill" label="所需技能" width="160"></el-table-column>
      <el-table-column align="right" width="550">
        <template slot="header">
          <el-col :span="100" class="toolbar" style="padding-bottom:0px;">
            <el-form :inline="true" :model="filters" @submit.native.prevent>
              <el-form-item>
                <el-input placeholder="请输入工序编号" v-model="filters.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="getUsers">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="dialogFormVisible = true">新增</el-button>
              </el-form-item>
            </el-form>
          </el-col>

          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹窗表格 -->
    <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
      <!-- Form -->
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="活动名称">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="sizeForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="sizeForm.type">
            <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
            <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
            <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="sizeForm.resource" size="medium">
            <el-radio border label="线上品牌商赞助"></el-radio>
            <el-radio border label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <!-- <template>
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </template>-->
    <!-- 分页功能 -->
    <div class="block">
      <span class="demonstration">完整功能</span>
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
import qs from 'qs'
export default {
  data() {
    return {
      search: "",
      filters: {
        name: ""
      },
      page: 1,
      users: [],
      dialogFormVisible: false,
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pager: {
        current: 1,
        pages: 2,
        size: 10,
        total: 0,
        searchCount: true,
        records: []
      }
    };
  },
  methods: {
    // 加载列表
    getUsers() {
      this.axios
        .post("/api/procedure/findList")
        .then(res => {
          this.$store.state.processManageData = res.data.result;
          console.log(this.$store.state.processManageData);
          this.pager = this.$store.state.processManageData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addUsers() {
      console.log("新增数据");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      // let params = { eId:row.eid }
      let params = { eId:row.eid }
      // let par = qs.stringfy(params)
      // console.log(params)
      this.axios.post("/api//procedure/del",JSON.stringify(params)).then(res => {
        console.log(params)
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleCurrentChange(val);
        }else{
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
      let _val = `${val}`;
      const action = {
        pageNum: parseInt(_val),
        size: this.pager.size
      };
      let that = this;
      this.axios.post("/api/procedure/findList", action).then(res => {
        that.pager = res.data.result;
      });
    },
    open(index, row) {
      this.$confirm("是否继续删除该工序?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          // 传递数据到后端删除
          this.handleDelete(index, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
</style>