<!--
 * @Date: 2019-05-24 17:37:27
<<<<<<< HEAD
<<<<<<< HEAD
 * @LastEditTime: 2019-07-01 14:14:04
=======
<<<<<<< HEAD
 * @LastEditTime: 2019-07-01 14:14:04
=======
 * @LastEditTime: 2019-07-01 16:43:40
>>>>>>> 88e2d510b396e4f6863b5795cca1632353e11849
>>>>>>> 64ea60215bdf52e390ae71a2608503a06087a2e7
=======
 * @LastEditTime: 2019-07-15 11:54:52
>>>>>>> 合并代码
 * @Author: yuhenglong
 * @Description: 文件说明: 首页
 -->

<template>
  <div class="dashboard">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color:#e6e6e6">
        <el-header class="logo">
          <img src="@/assets/logo.png" class="logo_img" />
          <h1 class="title_logo">乐鸟</h1>
        </el-header>
        <!-- 这是切换数组的文字 -->
        <!-- <el-dropdown @command="changeCom" class="btn">
          <span class="el-dropdown-link">
            {{ menusTitle }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(role,index) in menusArr">
              <el-dropdown-item :key="index" :command="index">{{role.name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>-->

        <el-menu :router="true" :unique-opened="true">
          <template v-for="(itemb,index) in firMenus">
            <el-submenu :index="index+'0'" :key="index">
              <template slot="title">{{ itemb.name }}</template>
              <el-menu-item-group v-for="(itemc,index) in itemb.children" :key="index">
                <el-menu-item
                  :index="itemc.url"
                  @click="changeRouter(itemc.url,itemc.name)"
                >{{itemc.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-container class="admin">
        <el-header style="text-align: right; font-size: 12px">
          <div style="width:400px;display:inline-block; margin-right:15px;" class="defaultSelect">
            <el-select
              v-model="select"
              slot="prepend"
              :placeholder="firstSelect"
              @change="changeSelect($event)"
            >
              <template v-for="(item,index) in selectList">
                <el-option :label="item.companyName" :value="item.companyId" :key="index"></el-option>
              </template>
            </el-select>
          </div>
          <el-dropdown>
            <i class="el-icon-setting icon" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="admin" style="margin-right: 15px; font-size: 16px">admin</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-user-solid"></i>个人中心
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="el-icon-orange"></i>修改密码
              </el-dropdown-item>
              <el-dropdown-item command="signOut()">
                <div @click="signOut()" style="width:100%;height:40px;">
                  <i class="el-icon-refresh-left"></i>
                  <span>退出登录</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <!-- 标签页 -->
          <tags-view></tags-view>
          <div style="padding:5px 15px 15px">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import tagsView from "@/components/dashboard/TagsView.vue";
import qs from "qs";
export default {
  components: {
    tagsView
  },
  data() {
    return {
      zdcommand: 0,
      menusArr: [],
      newMenusArr: [], // 转成树形结构
      // menusTitle: "", // 标题
      inputCom: "",
      select: "",
      selectList: "",
      firstSelect: "",
      defaultValue: "",
      firMenus: []
    };
  },
  methods: {
    async changeSelect($event) {
      // 先等待getCompanyList函数的执行后再执行
      await this.getCompanyList()
      let that = this;
      if ($event) {
        that.defaultValue = $event;
      }
      localStorage.setItem("companyId", that.defaultValue);
      const url = "/comapi/company/switch/" + that.defaultValue;
      this.axios.get(url).then(res => {
        this.loadingData();
      });
      this.$router.replace("/dashboard/");
      this.$store.dispatch("setIndexHtml");
    },
    tree() {
      let tree = this.newMenusArr.filter(father => {
        let children = this.newMenusArr.filter(child => {
          return father.menuId === child.parentId;
        });
        father.children = children;
        if (children.length === 0) {
          father.isChildren = false;
        } else {
          father.isChildren = true;
        }
        return father.parentId == 0;
      });
      this.firMenus = tree;
      localStorage.setItem('tree',tree)
      // this.$store.dispatch('setFilterMenu',tree);
    },
    loadingData() {
      // 封装后的请求
      this.axios.get("/comapi/menu/myMenu").then(res => {
        // 将menus存储在vuex中
        if (res.data.status == 1) {
          // 切换为actions的更改方式
          // this.$store.dispatch("setMenusData", res.data.result);
          // this.$store.commit(
          //   "setCompanyId",
          //   res.data.result.defaultShowCompany
          // );
          // 存储companyId到localStorage里面避免刷新页面不见了数据
          // localStorage.setItem("companyId", res.data.result.defaultShowCompany);
          // this.menusArr = this.$store.state.MenusData;
          // this.newMenusArr = this.menusArr;
          // this.menusTitle = this.menusArr[0].name;
          if (res.data.result == null) {
            this.firMenus = [];
          } else {
            this.newMenusArr = res.data.result;
            // 转树形结构函数
            this.tree();
          }
        }
      });
    },
    // 逻辑：先去获取公司的数据并渲染到选择器，同时设置value为公司ID，获取menu并渲染左侧；
    // 当切换公司时，切换公司ID，并且发送请求到后端更改MENU，然后再刷新MENU
    signOut() {
      this.$store.dispatch("signOut").then(() => {
        // 重新加载
        location.reload();
      });
    },
    changeCom(command) {
      this.zdcommand = command;
      this.menusTitle = this.newMenusArr[this.zdcommand].name;
      this.tree(this.zdcommand);
    },
    changeRouter(url, name) {
      const obj = {
        name: name,
        path: url,
        title: name
      };
      this.$store.dispatch("addVisitedViews", obj);
    },
    getCompanyList() {
      // fetch的跨域请求
      let newToken = "Bearer " + localStorage.getItem("token");
      fetch("/comapi/companyUser/myCompany", {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: newToken
        }
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          console.log("这是companyId", json);
          if (json.status == 1 && json.result != null) {
            this.selectList = json.result;
            this.firstSelect = this.selectList[0]["companyName"];
            this.defaultValue = this.selectList[0]["companyId"];
            localStorage.setItem("userId", this.selectList[0]["userId"]);
          }
        });
    }
  },
  created() {
    this.changeSelect();
  }
};
</script>
<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}
div.btn {
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
}
ul .el-dropdown-menu__item {
  width: 196px;
  height: 40px;
  padding: 0;
  text-align: center;
}
.el-main {
  cursor: default;
  padding: 0;
}
.dashboard .admin,
.dashboard .icon {
  color: #fff;
}
.dashboard .admin:hover,
.dashboard .icon:hover {
  cursor: pointer;
}
.dashboard .el-container {
  height: 100% !important;
}
.el-header {
  background-color: rgb(49, 180, 141);
  color: #333;
  line-height: 60px;
  cursor: default;
}

.el-aside {
  color: #333;
}
.dashboard .defaultSelect input::-webkit-input-placeholder {
  color: red;
  font-size: 30px;
}
.dashboard .defaultSelect input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: red;
  font-size: 30px;
}
.defaultSelect input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: red;
  font-size: 30px;
}
.defaultSelect input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
  font-size: 30px;
}
.dashboard .logo_img {
  width: 32px;
  height: 32px;
  line-height: 60px;
  display: inline-block;
  vertical-align: middle;
}
.dashboard .title_logo {
  width: 60px;
  line-height: 60px;
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  margin-left: 20px;
}
.dashboard .logo {
  font-size: 0;
  line-height: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.dashboard .el-select .el-input {
  width: 130px;
}
.dashboard .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

