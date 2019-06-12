<template>
<div class="userManagement">
  <el-table style="width: 100%" :data='tableData'>
    <el-table-column type="selection" width="60"></el-table-column>
    <el-table-column type="index" width="60" label="序号"></el-table-column>
    <el-table-column prop="createUser" label="姓名" width="60"></el-table-column>
    <el-table-column prop="productName" label="产品" width="80"></el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="250"></el-table-column>
    <el-table-column prop="realyTime" label="真实时间" width="250"></el-table-column>
    <el-table-column prop="expectTime" label="期望时间" width="120"></el-table-column>
    <el-table-column prop="num" label="数量" width="200"></el-table-column>
    <el-table-column align="right" width="550">
      <template slot="header">
        <el-col :span="100" class="toolbar" style="padding-bottom:0px;">
          <el-form :inline="true" :model="filters" @submit.native.prevent>
            <el-form-item>
              <el-input placeholder="请输入姓名" v-model='filters.name'></el-input>
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
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 弹窗表格 -->
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
      <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
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

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tableData:[],
      search: "",
      filters:{
        name:''
      },
      page:1,
      users:[],
      dialogFormVisible: false,
      sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    };
  },
  methods: {
    // 加载列表
    getUsers(){
      this.axios.post('/api/order/selectPage').then((res) =>{
        this.$store.state.orderData = res.data.result;
        console.log(this.$store.state.orderData)
        this.tableData = this.$store.state.orderData.records
      }).catch(err => {
        console.log(err )
      })
    },
    addUsers(){
      console.log('新增数据')
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created(){
      this.getUsers()
  },
  computed:{

  }
  // created(){
  //   this.getUsers()
  // }
};
</script>


<style lang="" scoped>

</style>