<!--
 * @Date: 2019-07-11 14:12:56
 * @LastEditTime: 2019-07-11 15:46:07
 * @Author: guobinggui
 * @Description: 文件说明: 订单管理页面
 -->
<template>
  <div>
    <div class="searchOrder">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getOrders">查询</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
          <el-button type="warning" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" @click="onSubmit" icon="el-icon-edit" circle></el-button>
          <el-button type="success" @click="onSubmit" icon="el-icon-search" circle></el-button>
          <el-button type="warning" @click="onSubmit" icon="el-icon-success" circle></el-button>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog title="新增订单" :visible.sync="dialogOrderFormVisible">
        <el-form :model="addOrderForm">
          <el-form-item label="产品编号" :label-width="formLabelWidth">
            <el-input v-model="addOrderForm.productId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="addOrderForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addOrder">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dialogOrderFormVisible: false,
      addOrderForm: {
        productId: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getOrders() {
      this.axios
        .post(
          "order/selectPage",
          qs.stringify({ companyId: localStorage.getItem("companyId") })
        )
        .then(res => {
          console.log("res");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addOrder() {
      this.axios.post("/order/add").then(res => {
        this.dialogFormVisible = false;
      });
    }
  }
};
</script>

<style scoped>
.searchOrder {
  position: relative;
  height: 55px;
}
.demo-form-inline {
  position: absolute;
  right: 50px;
}
</style>
