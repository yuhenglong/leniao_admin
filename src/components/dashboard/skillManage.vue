<!--
 * @Date: 2019-07-06 14:48:26
 * @LastEditTime: 2019-07-08 16:00:16
 * @Author: guobinggui
 * @Description: 文件说明: 技能管理页面
 -->
<template>
  <div>
    <template>
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
          <el-button type="success" @click="getComSkillsList">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- <div class="tag-group">
      <span class="tag-group__title">Dark</span>
      <el-tag
        closable
        v-for="item in skillsList"
        :key="item.id"
        type="success"
        effect="dark"
      >{{ item.name }}</el-tag>
    </div>-->
    <div>
      <el-tag
        :key="tag.id"
        v-for="tag in skillsList"
        closable
        :disable-transitions="false"
        @close="open(tag)"
        @click="editSkill(tag)"
      >{{ tag.name }}</el-tag>
    </div>
    <div>
      <el-dialog title="添加技能" :visible.sync="dialogFormVisible">
        <el-form :model="skillForm">
          <el-form-item label="技能名称" :label-width="formLabelWidth">
            <el-input v-model="skillForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="技能类型" :label-width="formLabelWidth">
            <el-select v-model="skillForm.skillType" placeholder="请选择活动区域">
              <el-option label="手动" value="1"></el-option>
              <el-option label="自动" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="技能说明" :label-width="formLabelWidth">
            <el-input v-model="skillForm.skillExplain" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSkill">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="更新技能" :visible.sync="dialogEditFormVisible">
        <el-form :model="editSkillForm">
          <el-form-item label="技能名称" :label-width="formLabelWidth">
            <el-input v-model="editSkillForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="技能类型" :label-width="formLabelWidth">
            <el-select v-model="editSkillForm.skillType" placeholder="请选择活动区域">
              <el-option label="手动" value="1"></el-option>
              <el-option label="自动" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="技能说明" :label-width="formLabelWidth">
            <el-input v-model="editSkillForm.skillExplain" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateSkill">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      queryForm: {
        companyId: localStorage.getItem("companyId")
      },
      skillsList: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      skillForm: {
        companyId: localStorage.getItem("companyId"),
        name: "",
        skillType: "",
        skillExplain: "",
        createUser: localStorage.getItem("userId")
      },
      formLabelWidth: "120px",
      editSkillForm: {}
    };
  },
  methods: {
    /**
     * @author: guobinggui
     * @description: 函数说明:  获取公司技能列表
     * @param {type}
     * @return:
     */
    getComSkillsList() {
      this.axios
        .post("/skill/skill/selectPage", qs.stringify(this.queryForm))
        .then(res => {
          console.log(res);
          this.skillsList = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 添加技能
     * @param {type}
     * @return:
     */
    addSkill() {
      this.axios
        .post("/skill/skill/add", JSON.stringify(this.skillForm), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log("skillRes", res);
          this.dialogFormVisible = false;
          this.skillForm = {
            companyId: localStorage.getItem("companyId"),
            name: "",
            skillType: "",
            skillExplain: "",
            createUser: localStorage.getItem("userId")
          };
          this.getComSkillsList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 删除技能
     * @param {type}
     * @return:
     */
    open(tag) {
      console.log(tag);
      this.$confirm("此操作将永久删除该技能, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.skillsList.splice(this.skillsList.indexOf(tag), 1);
          this.axios
            .post("skill/skill/del", qs.stringify({ id: tag.id }))
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 更新技能窗口
     * @param {type} 
     * @return: 
     */
    editSkill(tag) {
      this.dialogEditFormVisible = true
      this.editSkillForm = {
        id: tag.id,
        companyId: tag.companyId,
        name: tag.name,
        skillType: tag.skillType,
        skillExplain: tag.skillExplain,
        createUser: localStorage.getItem("userId")
      }
    },
    /**
     * @author: guobinggui
     * @description: 函数说明: 更新技能
     * @param {type} 
     * @return: 
     */
    updateSkill() {
      this.axios
        .post('skill/skill/update', JSON.stringify(this.editSkillForm), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res)
          this.dialogEditFormVisible = false
          this.editSkillForm = {}
          this.getComSkillsList()
          this.$message({
                type: "success",
                message: "更新成功!"
              });
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getComSkillsList();
  }
};
</script>
<style lang="">
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>