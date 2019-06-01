<template>
  <div class="dashboard">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-header class="logo">
          <img src="@/assets/logo.png" class="logo_img">
          <h1 class="title_logo">乐鸟</h1>
        </el-header>

        <el-menu :router="true" :unique-opened="true">
          
          <template v-for="menu in this.$store.state.menus">
            <el-submenu :index="menu.link" :key="menu.menuId">
              <template slot="title">
                <i :class="menu.icon"></i>
                <template solt="title">{{ menu.menuName }}</template>
              </template>
              <el-menu-item-group>
                <template v-for="child in menu.children">
                  <el-menu-item :index="child.childLink" :key="child.childId">{{ child.childName }}</el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods:{
    loadingData(){
      this.axios.get('/user/queryUserAuthority').then((res)=>{
        console.log(res.data.menuData)
        // 将menus存储在vuex中
        this.$store.commit('setMenus',res.data.menuData)
      }).catch((error)=>{
        console.log(error)
      })
    }
  },
  created(){
    this.loadingData()
  }
};
</script>
<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
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
</style>

