<!--
 * @Date: 2019-06-25 10:51:41
 * @LastEditTime: 2019-07-09 16:03:21
 * @Author: guobinggui
 * @Description: 文件说明: 創建公司
 -->
<template>
  <div class="createCompany">
    <el-form ref="companyForm" :model="companyForm" label-width="100px">
      <div class="left">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="companyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="公司法人" prop="legalPerson">
          <el-input v-model="companyForm.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证" prop="idCard">
          <el-input v-model="companyForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="公司税号" prop="taxNum">
          <el-input v-model="companyForm.taxNum"></el-input>
        </el-form-item>
        <el-form-item label="公司行业" prop="industry">
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
              name="dropFile"
              class="avatar-uploader"
              action="/file/fileupload"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="zhengmian">身份证正面</div>
          </div>
          <div class="box_father" style="margin-left:15px;">
            <el-upload
              name="dropFile"
              class="avatar-uploader"
              action="/file/fileupload"
              :on-success="handleAvatarSuccessTwo"
              :before-upload="beforeAvatarUpload"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;"
            >
              <img v-if="imageUrlTwo" :src="imageUrlTwo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="zhengmian">身份证反面</div>
          </div>
        </el-form-item>
        <el-form-item label="法人身份">
          <div class="box_father" style="margin-left:15px;">
            <el-upload
              name="dropFile"
              class="avatar-uploader"
              action="/file/fileupload"
              :on-success="handleAvatarSuccessThr"
              :before-upload="beforeAvatarUploadThr"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;"
            >
              <img v-if="imageUrlThr" :src="imageUrlThr" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="zhengmian">公司营业执照</div>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('companyForm')">立即创建</el-button> -->
          <!-- <el-button @click="resetForm('companyForm')" id="chongzhi">重置</el-button> -->
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" @click="submitForm()">立即创建</el-button>
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
      _imageUrl: "",
      _imageUrlTwo: "",
      _imageUrlThr: "",
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
    gaibian(e) {
      console.log(e);
      // this.imageUrlTwo = e.target.value;
    },
    setAddress(address) {
      this.companyForm.detAdress = address;
      console.log("这是地址", this.companyForm.detAdress);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this._imageUrl = res.fileName;
    },
    handleAvatarSuccessTwo(res, file) {
      console.log(res);
      this.imageUrlTwo = URL.createObjectURL(file.raw);
      this._imageUrlTwo = res.fileName;
    },
    handleAvatarSuccessThr(res, file) {
      console.log(res);
      this.imageUrlThr = URL.createObjectURL(file.raw);
      this._imageUrlThr = res.fileName;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      let name = file.name;
      let imgType = name.split(".");
      const isBoolean =
        imgType[1] === "png" || imgType[1] == "jpg" || imgType[1] == "jpeg";
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
      let imgType = name.split(".");
      const isBoolean =
        imgType[1] === "png" || imgType[1] == "jpg" || imgType[1] == "jpeg";
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
      let imgType = name.split(".");
      const isBoolean =
        imgType[1] === "png" || imgType[1] == "jpg" || imgType[1] == "jpeg";
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
    submitForm() {
      this.$refs["companyForm"].validate(valid => {
        if (valid) {
          console.log(this.companyForm);
          const params = {
            body: {
              name: this.companyForm.name,
              legalPerson: this.companyForm.legalPerson,
              businessLicence: this.actImgUrlOne,
              enrollId: this.companyForm.taxNum
            },
            params: {
              url1: this._imageUrl,
              url2: this._imageUrlTwo,
              url3: this._imageUrlThr,
              templateId: "91a3b439528a4cc2b072d63dea22ecae"
            }
          };
          // axios的请求
          this.axios
            .post("/comapi/company/register", JSON.stringify(params))
            .then(res => {
              console.log(res);
              this.$message({
                type: "info",
                message: "上传数据成功,3s后跳转到首页"
              });
              setTimeout(() => {
                // window.location.reload();
              }, 3000);
            })
            // fetch的请求
            let newToken = "Bearer " + localStorage.getItem("token");
            fetch('/comapi/company/register',{
              method:'POST',
              mode:'cors',
              headers:{
                Authorization: newToken,
              }
            }).then(res =>{
              return res.json()
            }).then(json =>{
              console.log('这是解析后的json',json)
            })
        } else {
          console.log("error submit!!");
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
<style scoped>
.createCompany {
  position: relative;
}
.inputfile {
  position: absolute;
  clip: rect(0 0 0 0);
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
div.zhengmian,
div.fanmian {
  color: #999;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  width: 178px;
  height: 20px;
  line-height: 14px;
}
div.box_father {
  display: inline-block;
}
</style>
