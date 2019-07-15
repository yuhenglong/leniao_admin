<template>
  <div class="themeManage">
    <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="主题名称">
        <el-input v-model="formInline.user" placeholder="主题名称"></el-input>
      </el-form-item>
      <el-form-item label="主题编号">
        <el-select v-model="formInline.region" placeholder="主题编号">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="themeTable">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      stripe
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column property="themeName" label="主题名称"></el-table-column>
      <el-table-column property="theId" label="主题ID"></el-table-column>
      <el-table-column property="theNum" label="主题编号"></el-table-column>
      <el-table-column property="create" label="创建人"></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          themeName: "暗夜",
          theId: "ln8888",
          theNum: "001",
          create: "gbg"
        },
        {
          themeName: "暗夜",
          theId: "ln8888",
          theNum: "001",
          create: "gbg"
        },
        {
          themeName: "暗夜",
          theId: "ln8888",
          theNum: "001",
          create: "gbg"
        },
        {
          themeName: "暗夜",
          theId: "ln8888",
          theNum: "001",
          create: "gbg"
        },
        {
          themeName: "暗夜",
          theId: "ln8888",
          theNum: "001",
          create: "gbg"
        },
        {
          themeName: "暗夜",
          theId: "ln8888",
          theNum: "001",
          create: "gbg"
        }
      ],
      currentRow: null,
      formInline: {
        user: "",
        region: ""
      }
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.search {
  position: relative;
  height: 55px;
}
.demo-form-inline {
  position: absolute;
  right: 0;
}
</style>
