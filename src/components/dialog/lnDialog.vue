<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 10:12:13
 * @Author: yuhenglong
 * @Description: 文件说明: 删除弹窗
 -->
<template>
  <div class="lnDialog" v-show="isShowDialog">
    <div class="dia_header"></div>
    <div class="detail ov">
      <p>确定删除？</p>
      <el-button type="primary" class="fl mar_left" @click="cancel()">取消</el-button>
      <el-button type="warning" class="fr mar_right" @click="confirm()">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "lnDialog",
  props: ["showDialog"],
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit("closeDialog");
    },
    confirm() {
      this.$emit("delete");
      this.$emit("closeDialog");
    }
  },
  computed: {
    isShowDialog() {
      console.log(this.showDialog);
      return this.showDialog;
    }
  }
};
</script>
<style lang="scss" scoped>
.lnDialog {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -90px;
  margin-left: -250px;
  z-index: 999;
  width: 500px;
  height: 250px;
  border: 1px solid #ebeef5;
  border-radius: 15px;
  .dia_header {
    background-color: rgb(167, 164, 39);
    width: 100%;
    height: 50px;
    border-radius: 15px 15px 0 0;
  }
  .detail {
    border-radius: 15px;
    height: 200px;
    width: 100%;
    background-color: #fff;
    padding: 50px 20px 20px;
    box-sizing: border-box;
    p {
      font-size: 24px;
      text-align: center;
      color: #666;
      margin-bottom: 55px;
    }
    .el-button {
      padding: 12px 25px;
    }
  }
  .mar_left {
    margin-left: 80px;
  }
  .mar_right {
    margin-right: 80px;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .ov {
    overflow: hidden;
  }
}
</style>