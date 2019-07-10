<template>
  <el-table
    ref="singleTable"
    :data="recordCompanyList"
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column property="companyName" label="公司名称"></el-table-column>
    <el-table-column property="status" label="状态"></el-table-column>
  </el-table>
</template>

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

<script>
import qs from "qs";
export default {
  data() {
    return {
      recordCompanyList: []
    };
  },
  methods: {
    getRecordCompanyList() {
      // fetch('/comapi/myCompany')
      //   .then(res => {
      //     console.log(res)
      //   })
      this.axios
        .get(
          "/comapi/companyUser/record",
          qs.stringify({
            body: {}
          })
        )
        .then(res => {
					console.log(res);
					this.recordCompanyList = res.data.result
        });
    }
  },
  created() {
    this.getRecordCompanyList();
  }
};
</script>