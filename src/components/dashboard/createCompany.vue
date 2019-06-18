<template>
  <div class="createCompany">
    <el-form ref="form" :model="companyForm" label-width="80px">
      <div class="left">
        <el-form-item label="公司名称">
          <el-input v-model="companyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="公司法人">
          <el-input v-model="companyForm.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证">
          <el-input v-model="companyForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="公司税号">
          <el-input v-model="companyForm.taxNum"></el-input>
        </el-form-item>
        <el-form-item label="公司行业">
          <el-select v-model="companyForm.industry" placeholder="请选择活动区域">
            <el-option label="电子加工" value="shanghai"></el-option>
            <el-option label="电子研发" value="beijing"></el-option>
            <el-option label="注塑" value="beijing"></el-option>
            <el-option label="自定义" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-select v-model="companyForm.adress" placeholder="请选择省市">
            <el-option label="北京" value="shanghai"></el-option>
            <el-option label="广州" value="beijing"></el-option>
          </el-select>
          <el-select v-model="companyForm.adress" placeholder="请选择活动区域">
            <el-option label="天河" value="shanghai"></el-option>
            <el-option label="白云" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="法人身份">
          <el-upload
            action="/fileupload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            name="dropFile"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="公司营业执照">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
      </div>
    </el-form>
    <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
    </el-form-item>-->
  </div>
</template>

<script>
export default {
  name: "createCompany",
  data() {
    return {
      companyForm: {
        name: "",
        legalPerson: "",
        idCard: "",
        adress: "",
        datetaxNum2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        dialogImageUrl: "",
        dialogVisible: false
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style lang='scss' scoped>
.createCompany {
  position: relative;
  .left {
    float: left;
    padding: 10px;
  }
  .right img {
    float: left;
    padding: 10px;
  }
}
</style>
