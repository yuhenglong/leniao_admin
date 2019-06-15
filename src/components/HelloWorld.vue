<template>
<div class="userManagement">
  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline fl">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
    </el-form>
      <div class="fr date">
        <span class="demonstration color">默认</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" class='date_sub'>
        </el-date-picker>
      </div>
      <div class="btn fl">
        <el-button type='primary' @click='onsubmit()'>搜索</el-button>
        <el-button type='primary' @click='resetForm()'>重置</el-button>
      </div>
    </div>
         
</div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      resetForm(){
        console.log('重置')
      }
    }
  }
</script>

<style lang="scss" scoped>
.userManagement{
  width:100%;
  .top{
    width:100%;
    clear:both;
  }
  .date{
    margin-left:15px;
    margin-right:15px;
    .color{
      color:#333;
    }
    .date_sub{
      margin-left:10px;
    }
  }
  .fl{
    float:left;
  };
  .fr{
    float:left;
  }
}
</style>