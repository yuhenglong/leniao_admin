<template>
  <div class="createCompany">
    <el-form ref="ruleForm" :model="companyForm" label-width="100px">
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
          <template>

            <el-select v-model="companyForm.industry" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </template>
        </el-form-item>
        <el-form-item label="公司地址">
          <!-- 插入三级联动组件 -->
          <linkage @postAddress='setAddress'></linkage>
        </el-form-item>
        <el-form-item label="法人身份">
          <el-upload
            :action="actImgUrlOne"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="changeUrlOne"
            name="dropFile"
            :auto-upload="false"
            ref="uploadOne"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="公司营业执照">
          <el-upload
            :action="actImgUrlTwo"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="changeUrlTwo"
            :auto-upload="false"
            ref="uploadTwo"
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
  </div>
</template>

<script>
import linkage from "@/components/dashboard/linkage";
import qs from 'qs'
export default {
  name: "createCompany",
  components: {
    linkage
  },
  data() {
    return {
      companyForm: {
        name: "",
        legalPerson: "",
        idCard: "",
        taxNum: "",
        industry: "",
        // dialogImageUrl: "",
        detAdress:''
      },
      dialogImageUrl: "",
      dialogVisible: false,
      // 动态图片地址
      actImgUrlOne: "",
      actImgUrlTwo: "",
         options: [
          {
            value: "电子",
            label: "电子"
          },
          {
            value: "机械",
            label: "机械"
          },
          {
            value: "物流",
            label: "物流"
          },
          {
            value: "养殖",
            label: "养殖"
          },
          {
            value: "睡觉",
            label: "睡觉"
          }
        ]
    };
  },
  methods: {
    setAddress(address){
      this.companyForm.detAdress = address;
      console.log(this.companyForm.detAdress)
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      // 从服务器上删除图片
      console.log(file, fileList);
    },
    changeUrlOne(file, fileList){
      console.log(file,fileList)
      this.actImgUrlOne = file.url;
    },
    changeUrlTwo(){
      console.log(file,fileList)
      this.actImgUrlTwo = file.url;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.companyForm);
          const params = {
            body:{
              name:this.companyForm.name,
              legalPerson:this.companyForm.legalPerson,
              businessLicence:this.actImgUrlOne,
              enrollId:this.companyForm.taxNum
            }
          }
          console.log(this.axios)
          this.axios.post('/company/register',JSON.stringify(params)).then(res =>{
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$refs.uploadOne.submit();
      this.$refs.uploadTwo.submit();
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
