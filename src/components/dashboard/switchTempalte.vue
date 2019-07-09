<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 09:50:02
 * @Author: yuhenglong
 * @Description: 文件说明: 模板
 -->
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
<template>
  <div class="switchTempalte">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="标准应用" name="bzyy" class="tab_pane">
        <div class="con_box">
          <img src="@/assets/icon/icon_tu.png">
          <div class="text">
            <el-badge value="标准" class="item">
              <p class="title">图书期刊扫码版</p>
            </el-badge>
            <p class="download">
              <i class="el-icon-download"></i>
              XX家企业使用
            </p>
            <p class="limit">
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
            </p>
          </div>
        </div>
        <div class="con_box">
          <img src="@/assets/icon/icon_tu.png">
          <div class="text">
            <el-badge value="标准" class="item">
              <p class="title">图书期刊扫码版</p>
            </el-badge>
            <p class="download">
              <i class="el-icon-download"></i>
              XX家企业使用
            </p>
            <p class="limit">
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
            </p>
          </div>
        </div>
        <div class="con_box">
          <img src="@/assets/icon/icon_tu.png">
          <div class="text">
            <el-badge value="标准" class="item">
              <p class="title">图书期刊扫码版</p>
            </el-badge>
            <p class="download">
              <i class="el-icon-download"></i>
              XX家企业使用
            </p>
            <p class="limit">
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
            </p>
          </div>
        </div>
        <div class="con_box">
          <img src="@/assets/icon/icon_tu.png">
          <div class="text">
            <el-badge value="标准" class="item">
              <p class="title">图书期刊扫码版</p>
            </el-badge>
            <p class="download">
              <i class="el-icon-download"></i>
              XX家企业使用
            </p>
            <p class="limit">
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
              王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦王景的接口又报错啦
            </p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="使用场景" name="sycj">
        <router-link to="sycj">使用场景</router-link>
      </el-tab-pane>
      <el-tab-pane label="行业分类" name="hyfl">
        <router-link to="hyfl">行业分类</router-link>
      </el-tab-pane>
      <el-tab-pane label="功能分类" name="gnfl">
        <router-link to="hyfl">功能分类</router-link>
      </el-tab-pane>
      <el-tab-pane label="模板示例" name="mbsl">
        <router-link to="hyfl">模板示例</router-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "bzyy"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.switchTempalte {
  .tab_pane {
    overflow:hidden;
    .con_box {
      margin:10px 0;
      float:left;
      width: 500px;
      height: 120px;
      background-color: #fff;
      padding: 20px;
      font-size: 0;
      line-height: 0;
      img {
        display: inline-block;
        vertical-align: middle;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
    .item {
      margin-bottom: 10px;
      margin-right: 40px;

      .title {
        padding: 0 15px 0 0;
        color: #333;
        font-size: 16px;
        line-height: 16px;
      }
    }
    .download {
      color: rgb(34, 37, 233);
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 10px;
    }
    .limit {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      width: 320px;
      font-size: 14px;
      line-height: 14px;
      color: #333;
    }
  }
}
</style>