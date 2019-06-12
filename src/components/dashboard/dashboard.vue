<template>
  <div class="dashboard">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-header class="logo">
          <img src="@/assets/logo.png" class="logo_img">
          <h1 class="title_logo">乐鸟</h1>
        </el-header>

        <el-dropdown @command="changeCom" class='btn'>
          <span class="el-dropdown-link">
            {{ menusTitle }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(role,index) in menusArr">
              <el-dropdown-item :key="index" :command="index">{{role.name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>

        <el-menu :router="true" :unique-opened="true">
          <template v-for="(itemb,index) in firMenus">
        
            <el-submenu :index="index+'0'" :key="index">
                <template slot="title">
                  {{ itemb.name }}
                </template>
              <el-menu-item-group v-for='(itemc,index) in itemb.children' :key="index">
                <el-menu-item :index='itemc.url'>{{itemc.name}}</el-menu-item>
     
              </el-menu-item-group>
            </el-submenu>

          </template>
        </el-menu>
      </el-aside>

      <el-container class='admin'>
        <el-header style="text-align: right; font-size: 12px">
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
                <i class="el-icon-refresh-left"></i>
                <span @click="signOut()">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      zdcommand: 0,
      menusArr: [],
      newMenusArr: [], // 转成树形结构
      menusTitle: "", // 标题
      firMenus:[]
    };
  },
  methods: {
    tree(index) {
      let tree = this.newMenusArr[index].menus.filter(
        father => {
          let children = this.newMenusArr[index].menus.filter(
            child => {
              return (
                father.menuId === child.parentId
              );
            }
          )
          father.children = children;
          if (children.length === 0) {
            father.isChildren = false;
          } else {
            father.isChildren = true;
          }
          return father.parentId == 0;
        }
      );
      this.firMenus = tree;
  
    },
    loadingData() {
      // 封装后的请求
      this.axios
        .get("/menu/allMenu/15666666666")
        .then(res => {
          // 将menus存储在vuex中
          if (res.data.status == 1) {
            this.$store.commit("setMenusData", res.data.result.roles);
            this.menusArr = this.$store.state.MenusData;
     
            this.newMenusArr = this.menusArr;
            this.menusTitle = this.menusArr[0].name;

            // 转树形结构函数
            this.tree(this.zdcommand);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    signOut() {
      this.$store.dispatch("signOut").then(() => {
        // localStorage.removeItem(this.store.state.token)
        location.reload();
      });
    },
    changeCom(command) {
      this.zdcommand = command;
  
      this.menusTitle = this.newMenusArr[this.zdcommand].name;
      this.tree(this.zdcommand);
    }
  },
  created() {
    this.loadingData();
  }
};
</script>
<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}
div.btn{
  width:200px;
  height:50px;
  text-align:center;
  font-size:16px;
  line-height:50px;
}
ul .el-dropdown-menu__item{
  width:196px;
  height:40px;
  padding:0;
  text-align:center;
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
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
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
</style>

