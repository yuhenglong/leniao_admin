<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 10:10:36
 * @Author: yuhenglong
 * @Description: 文件说明: 自主创建公司
 -->
<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="state" placeholder="请选择行业">
              <el-option :label="'养鱼'" :value="1"></el-option>
              <el-option :label="'养虾'" :value="2"></el-option>
              <el-option :label="'养龟'" :value="3"></el-option>
              <el-option :label="'养猪'" :value="4"></el-option>
              <el-option :label="'养蟑螂'" :value="5"></el-option>
              <el-option :label="'养蜈蚣'" :value="6"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="state" placeholder="公司名称">
              <el-option :label="'鱼'" :value="1"></el-option>
              <el-option :label="'虾'" :value="2"></el-option>
              <el-option :label="'龟'" :value="3"></el-option>
              <el-option :label="'猪'" :value="4"></el-option>
              <el-option :label="'蟑螂'" :value="5"></el-option>
              <el-option :label="'蜈蚣'" :value="6"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker type="daterange" v-model="dateRange" align="right" unlink-panels range-separator="至" start-placeholder="注册开始日期" end-placeholder="注册结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-input v-model="input" placeholder="请输入内容" class='btn_input'></el-input>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="pager.records" style="width: 100%" stripe highlight-current-row v-loading="" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column label="手机号码" width="150">
          <template slot-scope="scope">
            {{ '+' + scope.row.nation + ' ' + scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="电子邮件" width="200"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100"></el-table-column>
        <el-table-column label="出生日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.birthday | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" :type="'success'">已启用</el-tag>
            <el-tag v-if="!scope.row.enabled" :type="'danger'">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.createDate | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="最后登陆日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.signInDate | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" size="small" @click="edit()">编辑</el-button>
            <el-button type="text" size="small" @click="remove()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="pager.current" :page-size="pager.size" :total="pager.total" class="pagination text-right"></el-pagination>
    </el-card>

    <el-dialog title="新增用户" :visible.sync="dialogVisible">
      <el-form :label-position="'right'" label-width="80px">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" placeholder="再次确认密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="test" class="input-with-select">
            <el-select v-model="test1" slot="prepend" placeholder="国际码" style="width:90px;">
              <el-option label="+86" value="86"></el-option>
              <el-option label="+80" value="80"></el-option>
              <el-option label="+88" value="88"></el-option>
              <el-option label="+202" value="202"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="test1" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="true"></el-option>
            <el-option label="女" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="test" align="right" type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload :data="{bucketName:bucketName}" :on-remove="onRemoveFile" list-type="picture-card"><i class="el-icon-plus"></i></el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
export default {
  name: "selfCreatedCompany",
  data() {
    return {
      input:'',
      dialogVisible: false,
      state: null,
      dateRange: null,
      test: null,
      test1: null,
      selectedRows: [],
      bucketName: "public",
      pager: { current: 1, size: 10, total: 0, records: [] }
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
    
    },
    edit() {
      this.dialogVisible = true;
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map(item => item.userId);
    },
    remove() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
    },
    onRemoveFile(file) {
      
    }
  }
};
</script>
<style lang="scss" scoped>
  .btn_input{
    width:250px;
    margin-right:10px;
  }
</style>
