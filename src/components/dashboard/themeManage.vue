<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="themeName" label="主题名称"></el-table-column>
      <el-table-column property="theId" label="主题ID"></el-table-column>
      <el-table-column property="theNum" label="主题编号"></el-table-column>
      <el-table-column property="create" label="创建人"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          themeName: '暗夜',
          theId: 'ln8888',
          theNum: '001',
          create: 'gbg'
        }, {
          themeName: '暗夜',
          theId: 'ln8888',
          theNum: '001',
          create: 'gbg'
        }, {
          themeName: '暗夜',
          theId: 'ln8888',
          theNum: '001',
          create: 'gbg'
        }, {
          themeName: '暗夜',
          theId: 'ln8888',
          theNum: '001',
          create: 'gbg'
        }, {
          themeName: '暗夜',
          theId: 'ln8888',
          theNum: '001',
          create: 'gbg'
        }, {
          themeName: '暗夜',
          theId: 'ln8888',
          theNum: '001',
          create: 'gbg'
        }, ],
        currentRow: null
      }
    },

    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>