<template>
  <div>
    <el-col style="padding-bottom:0px;width:100%;">
      <el-form :inline="true" class="fl" ref="filter" :model="filter">
        <el-form-item>
            <el-input placeholder="请输入公司名称" v-model.trim="filter.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入公司行业" v-model.trim="filter.name"></el-input>
          </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="filter.status" placeholder="审批状态">
            <el-option :label="'等待审批'" :value="'0'"></el-option>
            <el-option :label="'审批通过'" :value="'1'"></el-option>
            <el-option :label="'审核不通过'" :value="'2'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- <el-table
      ref="singleTable"
      :data="companyList"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="numberId" label="公司编号"></el-table-column>
      <el-table-column property="name" label="公司名称"></el-table-column>
      <el-table-column property="businessScope" label="公司行业"></el-table-column>
      <el-table-column property="enrollMoney" label="注册资金"></el-table-column>
      <el-table-column property="legalPerson" label="法人"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
      <el-table-column property="status" label="状态">等待审核</el-table-column>
      <el-table-column property="status" label="状态" >审核通过</el-table-column>
      <el-table-column property="createTime" label="申请时间"></el-table-column>
      <el-table-column label="操作">
        <el-button @click="getMyCompanyList">详细</el-button>
      </el-table-column>
    </el-table>-->
    <el-table :data="companyList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="公司编号">
              <span>{{ props.row.numberId }}</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="公司行业">
              <span>{{ props.row.businessLicence }}</span>
            </el-form-item>
            <el-form-item label="经营范围">
              <span>{{ props.row.businessScope }}</span>
            </el-form-item>
            <el-form-item label="注册资金">
              <span>{{ props.row.enrollMoney }}</span>
            </el-form-item>
            <el-form-item label="法人">
              <span>{{ props.row.legalPerson }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="申请时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="numberId" label="公司编号"></el-table-column>
      <el-table-column property="name" label="公司名称"></el-table-column>
      <el-table-column property="businessScope" label="经营范围"></el-table-column>
      <!-- <el-table-column property="enrollMoney" label="注册资金"></el-table-column>
      <el-table-column property="legalPerson" label="法人"></el-table-column> -->
      <el-table-column property="address" label="地址"></el-table-column>
      <el-table-column property="status" label="状态">等待审核</el-table-column>
      <el-table-column property="createTime" label="申请时间"></el-table-column>
      <!-- <el-table-column label="操作">
        <el-button @click="toogleExpand(scope.row)">详细</el-button>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      filter: {
        name: "",
        postCode: "",
        status: ""
      },
      currentRow: null,
      companyList: []
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getMyCompanyList() {
      // fetch('/comapi/myCompany')
      //   .then(res => {
      //     console.log(res)
      //   })
      this.axios
        .get(
          "/comapi/company/myCompany",
          qs.stringify({
            body: {}
          })
        )
        .then(res => {
          // console.log(res);
          this.companyList = res.data.result.records;
        });
    },
    toogleExpand(row) {
      // 设置一个标志
      // if (!row.flag) {
      //   row.flag = true;
      //   this.detail(row);
      // }
      let $table = this.$refs.table;
      this.users.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    }
  },
  created() {
    this.getMyCompanyList();
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