<<<<<<< HEAD
<!--
 * @Date: 2019-07-01 16:59:48
 * @LastEditTime: 2019-07-04 10:00:24
 * @Author: yuhenglong
 * @Description: 文件说明: 产品管理
 -->
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
<template>
  <div class="processManage">
    <template>
      <el-col style="padding-bottom:0px;width:100%;">
        <el-form :inline="true" :model="filters" @submit.native.prevent class="fl">
          <el-form-item>
<<<<<<< HEAD
            <el-select v-model="value" placeholder="产品类型">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.category"
                :value="item.typeExplain"
              ></el-option>
            </el-select>
            <!-- 选择状态 -->
            <el-select v-model="statusValue" placeholder="请选择">
              <el-option
                v-for="item in status"
=======
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
<<<<<<< HEAD
            <!-- 日期 -->
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-input placeholder="请输入名称" v-model.trim="filters.name" style="width:500px;"></el-input>
=======
            <!-- <el-input placeholder="请输入名称" v-model.trim="filters.name"></el-input> -->
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="inquire">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="dialogFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
        <!-- 下拉列表选项 -->
        <el-dropdown trigger="click" class="fr">
          <span class="el-dropdown-link">
            <i class="el-icon-s-grid"></i>
            列表筛选
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="checkList" @change="changeArr">
              <div class="lab_div" v-for="(item,index) in newObjArrSub" :key="index">
                <el-checkbox :label="item.label"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </template>

    <el-table style="width: 100%" :data="pager.records">
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <template v-for="(item,index) in newObjArr">
        <el-table-column :prop="item.prop" :label="item.label" width="160" :key="index"></el-table-column>
      </template>
<<<<<<< HEAD
      <el-table-column align="left" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="query(scope.row)">详细</el-button>
=======
      <el-table-column align="right" width="550" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="query(scope.row)">查询</el-button>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
          <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹窗表格 -->
    <el-dialog title="新增产品" :visible.sync="dialogFormVisible">
      <!-- Form -->
      <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
        <el-form-item label="产品名称:">
          <el-input v-model="sizeForm.name" class="addInput"></el-input>
        </el-form-item>
<<<<<<< HEAD
        <el-form-item label="产品类别:">
          <!-- <el-input v-model="sizeForm.material" class="addInput"></el-input> -->
          <el-select v-model="subValue" placeholder="产品类型">
            <el-option
              v-for="(item,index) in subOptions"
              :key="index"
              :label="item.category"
              :value="item.typeExplain"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司地址:">
          <el-input v-model="sizeForm.companyAddress" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="sizeForm.status" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品负责人:">
          <el-input v-model="sizeForm.responsiblePerson" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话:">
          <el-input v-model="sizeForm.personPhone" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品描述:">
          <el-input v-model="sizeForm.productExplain" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品图片:">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品证书:">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
=======
        <el-form-item label="材料用料:">
          <el-input v-model="sizeForm.material" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸:">
          <el-input v-model="sizeForm.size" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸:">
          <el-input v-model="sizeForm.size" class="addInput"></el-input>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑产品" :visible.sync="dialogCompile">
      <!-- Form -->
      <el-form ref="form" :model="editForm" label-width="100px" size="mini">
        <el-form-item label="产品名称:">
          <el-input v-model="editForm.name" class="addInput"></el-input>
        </el-form-item>
<<<<<<< HEAD
        <el-form-item label="研发公司地址:">
          <el-input v-model="editForm.address" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="editForm.status" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品负责人:">
          <el-input v-model="editForm.principal" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-input v-model="editForm.creationTime" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品类别:">
          <el-input v-model="editForm.productCategory" class="addInput"></el-input>
        </el-form-item>
=======
        <el-form-item label="材料用料:">
          <el-input v-model="editForm.material" class="addInput"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸:">
          <el-input v-model="editForm.size" class="addInput"></el-input>
        </el-form-item>
        <div></div>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCompile = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
<<<<<<< HEAD
=======
    <!-- 查询弹窗 -->
    <el-dialog title="查询详情" :visible.sync="dialogQuire">
      <!-- table -->
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="grid-content bg-purple btn">
            <el-button
              type="text"
              v-for="(item,index) in tableData"
              :key="index"
              @click="changeIndex(index)"
            >{{ item.templateName }}</el-button>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content bg-purple">
            <query-details v-bind:listDetails="tableData" v-bind:index="index"></query-details>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQuire = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3

    <!-- 分页功能 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pager.current"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pager.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";
<<<<<<< HEAD
// import queryDetails from "@/components/dashboard/queryDetails.vue";

export default {
  components: {
    // "query-details": queryDetails
=======
import queryDetails from "@/components/dashboard/queryDetails.vue";

export default {
  components: {
    "query-details": queryDetails
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
  },
  data() {
    return {
      search: "",
      filters: {
        name: ""
      },
<<<<<<< HEAD
      options: [],
      subOptions: [],
      routerParams: "",
      index: 0,
      checkList: [
        "产品名称",
        "产品编号",
        "状态",
        "公司地址",
        "负责人",
        "负责人电话",
        "创建时间"
      ],
      newObjArr: [
        { label: "产品名称", prop: "name" },
        { label: "产品编号", prop: "categoryId" },
        { label: "状态", prop: "status" },
        { label: "公司地址", prop: "companyAddress" },
        { label: "负责人", prop: "responsiblePerson" },
        { label: "负责人电话", prop: "personPhone" },
        { label: "创建时间", prop: "createTime" }
      ],
      newObjArrSub: [
        { label: "产品名称", prop: "name" },
        { label: "产品编号", prop: "categoryId" },
        { label: "状态", prop: "status" },
        { label: "公司地址", prop: "companyAddress" },
        { label: "负责人", prop: "responsiblePerson" },
        { label: "负责人电话", prop: "personPhone" },
        { label: "创建时间", prop: "createTime" }
=======
      index: 0,
      checkList: ["产品编号", "产品名称", "公司编号", "材料用料", "产品尺寸"],
      newObjArr: [
        { label: "产品编号", prop: "tId" },
        { label: "产品名称", prop: "name" },
        { label: "公司编号", prop: "companyId" },
        { label: "材料用料", prop: "material" },
        { label: "产品尺寸", prop: "size" }
      ],
      newObjArrSub: [
        { label: "产品编号", prop: "tId" },
        { label: "产品名称", prop: "name" },
        { label: "公司编号", prop: "companyId" },
        { label: "材料用料", prop: "material" },
        { label: "产品尺寸", prop: "size" }
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      ],
      page: 1,
      ym_val: 1,
      users: [],
      dialogFormVisible: false,
      dialogCompile: false,
      dialogQuire: false,
      sizeForm: {
<<<<<<< HEAD
        companyId: "",
        name: "",
        categoryId: "",
        companyAddress: "",
        status: "",
        responsiblePerson: "",
        personPhone: "",
        productExplain: "",
        productPictureList: ["1", "2"],
        certificatesList: ["1", "2"]
      },
      editForm: {
        name: "",
        address: "",
        status: "",
        principal: "",
        creationTime: "",
        productCategory: ""
      },
      value: "",
      subValue: "",
      queryId: "",
=======
        name: "",
        companyId: "",
        material: "",
        size: ""
      },
      editForm: {
        name: "",
        companyId: "",
        material: "",
        size: "",
        productTemplates: []
      },
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      pager: {
        current: 1,
        pages: 2,
        size: 10,
        total: 0,
        searchCount: true,
        records: []
      },
      editEid: null,
<<<<<<< HEAD
      tableData: [],
      status: [
        {
          value: "已完成",
          label: "已完成"
        },
        {
          value: "未完成",
          label: "未完成"
        },
        {
          value: "正在生产",
          label: "正在生产"
        }
      ],
      statusValue: "",
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
      value1: ""
=======
      tableData: []
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
    };
  },
  methods: {
    // 加载列表
    getUsers() {
<<<<<<< HEAD
      let _companyId = localStorage.getItem("companyId");
      let params = {
        // 项目上线公司ID要向缓存请求不能写死，测试阶段先用1代替
        // companyId:_companyId
        companyId: 1
      };
      this.axios
        .post("/api/product/selectPage", qs.stringify(params))
        .then(res => {
          console.log("这是列表的数据", res);
          if (res.data.status == 1) {
            this.pager.records = res.data.result.records;
            this.pager.current = res.data.result.current;
            this.pager.pages = res.data.result.pages;
            this.pager.size = res.data.result.size;
            this.pager.total = res.data.result.total;
          }
=======
      this.axios
        .post("/api/product/selectPage")
        .then(res => {
          console.log("这是产品请求", res);
          this.$store.state.productManageData = res.data.result;
          this.pager = this.$store.state.productManageData;
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
        })
        .catch(err => {
          console.log(err);
        });
<<<<<<< HEAD
      this.axios
        .post("/api/productType/list", qs.stringify(params))
        .then(res => {
          this.options = res.data.result;
          this.subOptions = res.data.result;
        });
=======
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
    },
    changeIndex(index) {
      // 改变序号
      this.index = index;
    },
    changeArr(val) {
      // 改变数组
      console.log(val);
      const arr = this.newObjArrSub.filter(item => {
        return val.indexOf(item.label) > -1;
      });
      this.newObjArr = arr;
<<<<<<< HEAD
      console.log(this.newObjArr);
    },
    query(row) {
      console.log(row);
      this.$router.push({
        path: "/dashboard/detailPro",
        query: {
          id: row.id
        }
      });
=======
    },
    query(row) {
      this.dialogQuire = true;
      this.axios
        .post("/api/productTemplate/findTemplateByproductId", row.id)
        .then(res => {
          console.log(res);
          this.tableData = res.data.result;
        });
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
    },
    addUsers() {
      console.log("新增数据");
    },
    // 打开编辑弹窗
    openEdit(row) {
      console.log(row);
      this.dialogCompile = true;
      this.editEid = row.eid;
      this.editForm.name = row.name;
<<<<<<< HEAD
      this.editForm.address = row.companyAddress;
      this.editForm.status = row.status;
      this.editForm.principal = row.responsiblePerson;
      this.editForm.creationTime = row.createTime;
      this.editForm.productCategory = row.categoryId;
=======
      this.editForm.material = row.material;
      this.editForm.size = row.size;
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
    },
    handleEdit() {
      // 编辑产品
      let params = {
        id: this.tId,
        name: this.editForm.name,
        material: this.editForm.material,
        size: this.editForm.size
      };
      this.axios.post("/api/product/update", qs.stringify(params)).then(res => {
        const action = {
          pageNum: parseInt(this.ym_val),
          size: this.pager.size
        };
        let that = this;
        this.axios.post("/api/product/findList", action).then(res => {
          that.pager = res.data.result;
        });
        this.dialogCompile = false;
        this.$message({
          type: "success",
          message: "编辑成功!"
        });
      });
      this.editForm.name = "";
      this.editForm.material = "";
      this.editForm.size = "";
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
<<<<<<< HEAD
      let params = { productId: row.id };
=======
      let params = { tId: row.id };
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      this.axios.post("/api/product/del", qs.stringify(params)).then(res => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleCurrentChange(this.ym_val);
        } else {
          this.$message({
            type: "info",
            message: "删除失败!"
          });
        }
      });
    },
<<<<<<< HEAD
    insertProductType() {},
    handleSizeChange(val) {
      console.log(val);
=======
    insertProductType(){
      
    },
    handleSizeChange(val) {
      console.log(val);
      console.log(`每页 ${val} 条`);
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
    },
    handleCurrentChange(val) {
      this.ym_val = val;
      console.log("这是当前页", this.ym_val);
      const action = {
        pageNum: parseInt(this.ym_val),
<<<<<<< HEAD
        size: this.pager.size,
        companyId: 1
=======
        size: this.pager.size
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
      };
      let that = this;
      this.axios
        .post("/api/product/selectPage", qs.stringify(action))
        .then(res => {
<<<<<<< HEAD
          if (res.data.status == 1) {
            that.pager = res.data.result;
          }
=======
          that.pager = res.data.result;
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
        });
    },
    open(index, row) {
      this.$confirm("是否继续删除该工序?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.handleDelete(index, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击新增
    handleCommit() {
      let that = this;
<<<<<<< HEAD
      this.sizeForm.companyId = localStorage.getItem("companyId");
      this.sizeForm.categoryId = this.subValue;
      this.axios
        .post("/api/product/add", JSON.stringify(this.sizeForm))
        .then(res => {
          console.log(res);
          this.handleCurrentChange(that.ym_val);
=======
      this.sizeForm.companyId = this.comId;
      this.axios
        .post("/api/product/add", qs.stringify(this.sizeForm))
        .then(res => {
          console.log(res);
          this.handleCurrentChange(that.ym_val);
        })
        .catch(err => {
          console.log(err);
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
        });
      this.dialogFormVisible = false;
    },
    proChe() {
      console.log(!this.proChecked);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // 重新加载页面
    inquire() {
      const action = { name: this.filters.name };
      this.axios
        .post("/api/product/findList", qs.stringify(action))
        .then(res => {
          console.log(res);
          this.$store.state.processManageData = res.data.result;
          this.pager = this.$store.state.processManageData;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUsers();
  },
  computed: {
    comId() {
      return this.$store.state.companyId;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.processManage .fl {
  float: left;
}
.processManage .fr {
  float: right;
}
.processManage .el-form--inline {
<<<<<<< HEAD
=======
  width: 800px;
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
  clear: both;
}
.lab_div {
  width: 150px;
<<<<<<< HEAD
  text-align: left;
  box-sizing: border-box;
  padding-left: 25px;
=======
  text-align: center;
>>>>>>> 8a4a2500173a2a2b1c8d818ac966b625a866cdd3
  margin: 10px 0;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .btn {
    .el-button:first-child {
      margin-left: 10px;
    }
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 5px 0;
  background-color: #f9fafc;
}
</style>