<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-08 14:18:22
 * @Author: yuhenglong
 * @Description: 文件说明: 表格列表组件
 -->
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
<template>
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "tableList",
  data() {
    return {
      currentPage4: 4,
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
      isCheckAll: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
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
