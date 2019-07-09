<!--
 * @Date: 2019-07-02 10:07:44
 * @LastEditTime: 2019-07-04 09:55:38
 * @Author: yuhenglong
 * @Description: 文件说明: 表格详情页
 -->
<template>
  <div class="detailPro">
    <router-link to="/dashboard/productManage" class="el-button el-button--default el-button--mini">
      <i class="el-icon-back"></i>返回
    </router-link>
    <table>
      <tbody>
        <tr>
          <td>产品名称</td>
          <td>{{resData.name}}</td>
        </tr>
        <tr>
          <td>产品编号</td>
          <td>{{resData.categoryId}}</td>
        </tr>
        <tr>
          <td>研发公司地址</td>
          <td>{{resData.companyAddress}}</td>
        </tr>
        <tr>
          <td>人员姓名</td>
          <td>{{resData.responsiblePerson}}</td>
        </tr>
        <tr>
          <td>人员电话</td>
          <td>{{resData.personPhone}}</td>
        </tr>
        <tr>
          <td>产品说明</td>
          <td>{{resData.productExplain}}</td>
        </tr>
        <tr>
          <td>产品证明</td>
          <td v-for="(item,index) in resData.productPictureList" :key="index">
            <img :src="item" alt />
          </td>
        </tr>
        <tr>
          <td>产品图片</td>
          <td v-for="(item,index) in resData.productPictures" :key="index">
            <img :src="item" alt />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      resData: {
        name: "",
        categoryId: "",
        companyAddress: "",
        responsiblePerson: "",
        personPhone: "",
        productExplain: "",
        productExplain: "",
        productPictures: ""
      }
    };
  },
  methods: {
    getList() {
      this.axios
        .post(
          "/api/product/find",
          qs.stringify({ productId: this.$route.query.id })
        )
        .then(res => {
          if (res.data.status === 1) {
            let Data = res.data.result;
            this.resData.name = Data.name;
            this.resData.categoryId = Data.categoryId;
            this.resData.companyAddress = Data.companyAddress;
            this.resData.responsiblePerson = Data.responsiblePerson;
            this.resData.personPhone = Data.personPhone;
            this.resData.productExplain = Data.productExplain;
            this.resData.productPictureList = Data.productPictureList;
            this.resData.productPictures = Data.productPictures.split(",");
          }
        });
    }
  },
  mounted() {
    this.getList();

  }
};
</script>
<style lang="scss" scoped>
.detailPro {
  overflow: hidden;
  .el-button {
    float: right;
    padding: 10px;
    background-color: yellow;
  }
  table {
    width: 100%;
    text-align: center;
    tr {
      //   height: 30px;
      td {
        color: #333;
        font-size: 16px;
        line-height: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
