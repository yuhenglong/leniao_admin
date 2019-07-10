<!--
 * @Date: 2019-06-25 10:51:41
 * @LastEditTime: 2019-07-05 14:59:43
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
        <el-form-item label="社会信用代码" prop="taxNum">
          <el-input v-model="companyForm.enrollId"></el-input>
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
              :show-file-list="false"
              :on-success="handleAvatarSuccessIDCP"
              :before-upload="beforeAvatarUpload"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;"
            >
              <img v-if="idCardPositiveImageUrl" :src="idCardPositiveImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="zhengmian">身份证正面</div>
          </div>
          <div class="box_father">
            <el-upload
              name="dropFile"
              class="avatar-uploader"
              action="/file/fileupload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessIDCN"
              :before-upload="beforeAvatarUpload"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;"
            >
              <img v-if="idCardNegativeImageUrl" :src="idCardNegativeImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="fanmian">身份证反面</div>
          </div>
        </el-form-item>
        <el-form-item label="营业执照">
          <div class="box_father">
            <el-upload
              name="dropFile"
              class="avatar-uploader"
              action="/file/fileupload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessBL"
              :before-upload="beforeAvatarUpload"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width:178px;"
            >
              <img v-if="businessLicenseimageUrl" :src="businessLicenseimageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="fanmian">营业执照照片</div>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('companyForm')">立即创建</el-button> -->
          <!-- <el-button @click="resetForm('companyForm')" id="chongzhi">重置</el-button> -->
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" @click="submitForm">立即创建</el-button>
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
        detAdress: "",
        enrollId: ""
      },
      idCardPositiveImageUrl: "", // 身份证正面照片url
      idCardNegativeImageUrl: "", // 身份证背面照片url
      businessLicenseimageUrl: "", // 营业执照照片url
      // _imageUrl: "",
      // _imageUrlTwo: "",
      // _imageUrlThr: "",
      dialogImageUrl: "",
      dialogVisible: false,
      // 动态图片地址
      // actImgUrlOne: "",
      // actImgUrlTwo: "",
      // actImgUrlThr: "",
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
    // gaibian(e) {
    //   console.log(e);
    //   // this.imageUrlTwo = e.target.value;
    // },
    /**
     * @author: guobinggui
     * @description: 函数说明: 身份证正面照片上传成功回调  (下面两个函数同此)
     * @param {type}
     * @return:
     */
    handleAvatarSuccessIDCP(res, file) {
      // IDCP:idCardPositive
      console.log(res);
      console.log(file);
      this.idCardPositiveImageUrl = res.fileName;
      console.log(this.idCardPositiveImageUrl);
    },
    handleAvatarSuccessIDCN(res, file) {
      // IDCP:idCardNegative
      console.log(res);
      console.log(file);
      this.idCardNegativeImageUrl = res.fileName;
      console.log(this.idCardNegativeImageUrl);
    },
    handleAvatarSuccessBL(res, file) {
      // BL:businessLicense
      console.log(res);
      console.log(file);
      this.businessLicenseimageUrl = res.fileName;
      console.log(this.businessLicenseimageUrl);
    },
    /**
     * @author: guobinggui
     * @description: 函数说明:  上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     * @param {type}
     * @return:
     */
    beforeAvatarUpload(file) {
      const isType =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isType) {
        this.$message.error("上传图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isType && isLt2M;
    },
    /**
     * @author: guobinggui
     * @description: 函数说明:  设置地址
     * @param {type}
     * @return:
     */
    setAddress(address) {
      this.companyForm.detAdress = address;
      console.log("这是地址", this.companyForm.detAdress);
    },
    // onSubmit() {
    //   console.log("submit!");
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 提交表单
     * @param {type}
     * @return:
     */
    submitForm() {
      this.$refs["companyForm"].validate(valid => {
        if (valid) {
          console.log(this.companyForm);
          let formObj = {
            body: {
              name: this.companyForm.name,
              legalPerson: this.companyForm.legalPerson,
              businessLicense: this.businessLicenseimageUrl,
              enrollId: this.companyForm.enrollId
            },
            params: {
              templateId: "91a3b439528a4cc2b072d63dea22ecae",
              idCardPositiveImageUrl: this.idCardPositiveImageUrl,
              idCardNegativeImageUrl: this.idCardNegativeImageUrl
            }
          };
          this.axios
            .post("/comapi/company/register", JSON.stringify(formObj), {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.status == 1) {
                this.$message({
                  message: "您的申请已经发送，等待工作人员审核！",
                  type: "success"
								});
								this.$router.replace('/dashboard')
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
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
