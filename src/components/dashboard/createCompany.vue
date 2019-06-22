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
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="公司地址">
          <!-- 插入三级联动组件 -->
          <linkage @postAddress="setAddress"></linkage>
        </el-form-item>
        <el-form-item label="法人身份">
          <div class="box_father">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="zhengmian">身份证正面</div>
          </div>
          <div class="box_father" style="margin-left:15px;">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccessTwo"
            :before-upload="beforeAvatarUploadTwo"
            style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;">
            <img v-if="imageUrlTwo" :src="imageUrlTwo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="zhengmian">身份证反面</div>
          </div>
        </el-form-item>
        <!-- 这是框架的样式start -->
        <!-- <el-form-item label="法人身份">
          <el-upload
            :action="actImgUrlOne"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-progress="handleRemove"
            :before-upload ="beforeAvatarUpload"
            :on-change="changeUrlOne"
            name="dropFile"
            ref="uploadOne"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>-->
        <!-- 这是框架的样式end -->

          <el-form-item label="法人身份">
          <div class="box_father" style="margin-left:15px;">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccessThr"
            :before-upload="beforeAvatarUploadThr"
            style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;">
            <img v-if="imageUrlThr" :src="imageUrlThr" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="zhengmian">公司营业执照</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')" id="chongzhi">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import linkage from "@/components/dashboard/linkage";
import qs from "qs";
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
        detAdress: ""
      },
      imageUrl: "",
      imageUrlTwo: "",
      imageUrlThr: "",
      dialogImageUrl: "",
      dialogVisible: false,
      // 动态图片地址
      actImgUrlOne: "https://jsonplaceholder.typicode.com/posts/",
      actImgUrlTwo: "",
      actImgUrlThr: "",
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
    setAddress(address) {
      this.companyForm.detAdress = address;
      console.log(this.companyForm.detAdress);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessTwo(res, file) {
      this.imageUrlTwo = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessThr(res, file){
      this.imageUrlThr = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let name = file.name;
      let imgType = name.split('.');
      const isBoolean = imgType[1] === 'png' ||imgType[1] == 'jpg' ||imgType[1] == 'jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isBoolean) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isBoolean && isLt2M;
    },
    beforeAvatarUploadTwo(file) {
      let name = file.name;
      let imgType = name.split('.');
      const isBoolean = imgType[1] === 'png' ||imgType[1] == 'jpg' ||imgType[1] == 'jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isBoolean) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isBoolean && isLt2M;
    },
    beforeAvatarUploadThr(file) {
      let name = file.name;
      let imgType = name.split('.');
      const isBoolean = imgType[1] === 'png' ||imgType[1] == 'jpg' ||imgType[1] == 'jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isBoolean) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isBoolean && isLt2M;
    },

    handleRemove(file, fileList) {
      // 从服务器上删除图片
      console.log(file, fileList);
    },
    changeUrlOne(file, fileList) {
      console.log(file, fileList);
      this.actImgUrlOne = file.url;
    },
    changeUrlTwo() {
      console.log(file, fileList);
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
            body: {
              name: this.companyForm.name,
              legalPerson: this.companyForm.legalPerson,
              businessLicence: this.actImgUrlOne,
              enrollId: this.companyForm.taxNum
            }
          };
          this.axios
            .post("/company/register", JSON.stringify(params),{
            headers: {
                "Authorization":"Basic VGVzdFN5c3RlbTpjZThlMzgyYS04YzI1LTRmYmQtOWUzMy1hMGQ3M2UxMTEyMjI=",
                "Content-Type": "application/x-www-form-urlencoded" 
              }
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$refs.uploadOne.submit();
      // this.$refs.uploadTwo.submit();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.createCompany {
  position: relative;
}
.createCompany .left {
  float: left;
  padding: 10px;
}
.createCompany .right img {
  float: left;
  padding: 10px;
}

.createCompany .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
div.zhengmian,div.fanmian{
  color:#999;
  font-size:14px;
  text-align:center;
  display:inline-block;
  width:178px;
  height:20px;
  line-height:14px;
}
div.box_father{
  display:inline-block;
}
</style>
