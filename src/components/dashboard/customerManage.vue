<!--
 * @Date: 2019-07-11 14:12:56
 * @LastEditTime: 2019-07-15 10:00:29
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
          <el-button type="success" @click="getCustomer">查询</el-button>
          <el-button type="primary" @click="dialogCustomerFormVisible = true">新增</el-button>
          <el-button type="warning" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="customerList">
      <el-table :data="customersList" stripe style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column>
        <el-table-column prop="companyNameFrom" label="公司名称"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
        <el-table-column prop="chargeMan" label="负责人"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="followUpUserName" label="跟进人"></el-table-column>
        <el-table-column prop="address" label="地址">
					<!-- {{ address.province }}{{ address.city }}{{ address.addressName }}  -->
				</el-table-column>
        <el-table-column label="操作" width="200px">
          <el-button type="primary" @click="onSubmit" icon="el-icon-edit" circle></el-button>
          <el-button type="success" @click="onSubmit" icon="el-icon-search" circle></el-button>
          <el-button type="warning" @click="onSubmit" icon="el-icon-success" circle></el-button>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog title="新增订单" :visible.sync="dialogCustomerFormVisible">
        <el-form :model="addCustomerForm">
          <el-form-item label="客户名称" :label-width="formLabelWidth">
            <el-input v-model="addCustomerForm.customerName" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="addCustomerForm.companyName" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="addCustomerForm.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="创建人" :label-width="formLabelWidth">
            <el-input v-model="addCustomerForm.createUser" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="addCustomerForm.status" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="跟进人" :label-width="formLabelWidth">
            <el-input v-model="addCustomerForm.followUpUserName" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCustomer">确 定</el-button>
          <el-button type="primary" @click="dialogCustomerFormVisible = false">取 消</el-button>
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
      customersList: [],
      dialogCustomerFormVisible: false,
      addCustomerForm: {
				customerName: '',
				companyName: '',
				phoneNumber: '',
				createUser: '',
				status: '',
				followUpUserId: '',
				followUpUserName: '',
				chargeMan: '',
				level: '',
				remarks: '',
				belongCompanyId: '',
				addressList: []
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 获取公司客户
     * @param {type} 
     * @return: 
     */
    getCustomer() {
      this.axios
        .post(
          "/customer/selectPage",
          qs.stringify({ companyId: localStorage.getItem("companyId") })
        )
        .then(res => {
          this.customersList = res.data.result.records
          console.log("res");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCustomer() {
      this.axios.post("/customer/add").then(res => {
        this.dialogcustomerFormVisible = false;
      });
    }
	},
	created() {
		this.getCustomer()
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
/* .customerList {
	position: absolute;
	width: 90%;	
} */
</style>
