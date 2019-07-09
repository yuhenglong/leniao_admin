<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 09:56:34
 * @Author: yuhenglong
 * @Description: 文件说明: 设备管理
 -->
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
<template>
  <div class="equipmentMan">
    <div class="top">
      <div class="eqm">
        <p class="equipmentMan">设备管理</p>
        <el-select v-model="value" placeholder="请选择" class="choose">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="equNum">
        <p>设备总数</p>
        <p class="mar_top">0</p>
      </div>
      <div class="equNum">
        <p>激活数</p>
        <p class="mar_top">0</p>
      </div>
      <div class="equNum">
        <p>在线数</p>
        <p class="mar_top">0</p>
      </div>
      <!-- 饼状图 -->
      <div id="container" style="width:800px;height:200px;float:left;margin-left:30px;"></div>
    </div>
    <tableList></tableList>
  </div>
</template>
<script>
import tableList from "@/components/dashboard/tableList.vue";
export default {
  name: "equipmentMan",
  components: {
    tableList:tableList
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    pieChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("container"));
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: "某站点用户访问来源",
        //   subtext: "纯属虚构",
        //   x: "center"
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.pieChart();
  }
};
</script>
<style lang="scss" scoped>
.equipmentMan {
  .top {
    overflow: hidden;
    .eqm {
      box-sizing: border-box;
      padding: 20px;
      float: left;
      width: 200px;
      height:130px;
      border-right: 1px solid #333;
      .equipmentMan {
        font-size: 16px;
        line-height: 16px;
        color: #333;
        font-weight: bold;
      }
      .choose {
        margin: 30px 0 0 0;
      }
    }
    .equNum {
      box-sizing: border-box;
      padding: 20px;
      float: left;
      width: 150px;
      height:130px;
      border-right: 1px solid #333;
      p {
        font-size: 16px;
        line-height: 16px;
        color: #333;
        font-weight: bold;
      }
      .mar_top {
        margin-top: 10px;
      }
    }
  }
}
</style>