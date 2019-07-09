<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 09:59:29
 * @Author: yuhenglong
 * @Description: 文件说明: 订单数据管理
 -->
<template>
  <div class="orderDataManagement">
    <div class="charts">
      <div id="echartContainer" class="fl"></div>
      <div class="new_time fl"></div>
    </div>
    <div class="list">
      <div class="list_nav">
        <el-select v-model="productType" placeholder="产品类型">
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="choseProduct" placeholder="请选择产品">
          <el-option
            v-for="item in product"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="choseState" placeholder="请选择产品">
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-input placeholder="请输入关键字" v-model="antistop" class="input-with-select">
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </div>
      <tableList></tableList>
    </div>
  </div>
</template>
<script>
import tableList from "@/components/dashboard/tableList.vue";
var echarts = require("echarts");
export default {
  name: "eCharts",
  components: {
    tableList: tableList
  },
  data() {
    return {
      msg: "",
      productType: "",
      choseProduct: "",
      choseState: "",
      productOptions: [
        { label: "老鼠", value: "mouse" },
        { label: "老虎", value: "tiger" },
        { label: "母猪", value: "pig" },
        { label: "羊", value: "goat" }
      ],
      product: [
        { label: "老鼠", value: "mouse" },
        { label: "老虎", value: "tiger" },
        { label: "母猪", value: "pig" },
        { label: "羊", value: "goat" }
      ],
      state: [
        { label: "正常", value: "noral" },
        { label: "删除", value: "delete" },
        { label: "待定", value: "undetermined" }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      antistop: ""
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(
        document.getElementById("echartContainer")
      );
      // 绘制图表
      myChart.setOption({
        title: { text: "这是客户数据" },
        tooltip: {},
        xAxis: {
          data: ["工序一", "工序二", "工序三", "工序四", "工序五", "工序六"]
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = [
                    "#65d186",
                    "#f67287",
                    "#f29e3c",
                    "#c05bdd",
                    "#7a65f2",
                    "#4a69f2"
                  ]; //每根柱子的颜色
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
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
  }
};
</script>
<style lang="scss" scoped>
.orderDataManagement {
  .charts {
    width: 100%;
    height: 300px;
    overflow: hidden;
    .new_time {
      width: 30%;
      height: 300px;
      background-color: yellow;
    }
  }
  #echartContainer {
    width: 70%;
    height: 300px;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .list {
    margin: 10px 0;
  }
  .input-with-select {
    width: 400px;
    margin-left: 10px;
  }
}
</style>