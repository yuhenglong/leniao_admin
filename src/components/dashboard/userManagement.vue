<template>
<div class="userManagement">
  <el-table style="width: 100%" :data='tableData'>
    <el-table-column type="selection" width="60"></el-table-column>
    <el-table-column type="index" width="60" label="序号"></el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="sex" label="性别" width="100"></el-table-column>
    <el-table-column prop="age" label="年龄" width="100"></el-table-column>
    <el-table-column prop="birth" label="生日" width="200"></el-table-column>
    <el-table-column prop="address" label="地址" min-width="160" max-width="400"></el-table-column>
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
  <!-- Form -->

<el-dialog title="新增信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="人名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="产品一" value="shanghai"></el-option>
        <el-option label="产品二" value="beijing"></el-option>
      </el-select>
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
      tableData: [],
      search: "",
      filters:{
        name:''
      },
      page:1,
      users:[],

      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    // 加载列表
    getUsers(){
      console.log('大水货')
      // const params = {
      //   page:this.page,
      //   name:this.filters.name
      // }
      // this.axios.post('/order/selectPage',params).then((res) =>{
      //   console.log('这是请求用户列表')
      //   // console.log(res)
      //   // this.tableData = res.data.personList;
      //   // this.$store.commit('getPersonList',res.data.personList)
      // }).catch(err => {
      //   console.log(err )
      // })
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
  mounted(){
      this.getUsers()
  },
  computed:{
    ...mapState({

    })
  }
};
</script>


<style lang="" scoped>

</style>