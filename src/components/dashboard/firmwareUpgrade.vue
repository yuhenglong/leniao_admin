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
        <el-table-column property="deviceName" label="设备名称"></el-table-column>
        <el-table-column property="deviceNum" label="产品编号"></el-table-column>
        <el-table-column property="deviceVersion" label="设备版本"></el-table-column>
        <el-table-column property="serverVersion" label="服务器版本"></el-table-column>
        <el-table-column property="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </el-table-column>
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
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
        },{
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
        },{
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
        },{
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
        },{
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
        },{
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
        },{
          deviceName: "暗夜",
          deviceId: "ln8888",
          deviceNum: "001",
          serverVersion: '2.0.0.1',  // 服务器版本
          deviceVersion: '2.0.0.0',  // 当前设备版本
          status: '正常在线'
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
  right: 50px;
}
</style>
