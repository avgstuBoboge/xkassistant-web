<template>
  <div>
    <el-menu
        :default-active="this.$route.path"
        class="menu"
        mode="horizontal"
        router>
      <img src="../../assets/logo.jpg" style="width: 58px; height: 58px;float: left;position: relative"/>
      <el-menu-item index="/" class="menu-item" route="/">首 页</el-menu-item>
      <el-menu-item index="/main" class="menu-item" route="/main">选 课</el-menu-item>
      <el-menu-item index="/credit" class="menu-item" route="/credit">已修课程查询</el-menu-item>
      <template v-if="this.$store.state.user.isAdmin">
        <el-menu-item index="/admin" class="menu-item" route="/admin">管 理</el-menu-item>
      </template>
      <div class="user-box">
        <template v-if="login">
          <span style="margin-right: 15px">欢迎您, {{ username }}</span>
          <el-button type="danger" style="width: 100px;margin-top: 10%" @click="handleLogout">注 销</el-button>
        </template>
        <template v-else>
          <el-button type="primary" style="width: 100px;margin-top: 10%" @click="handleLogin">登 录</el-button>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "page-nav",
  data() {
    return {
      activeIndex: '1',
      login: false,
      username: 'test',
      fit: 'fill'
    };
  },
  methods: {
    handleLogin() {
      this.$router.push('/login')
    },
    handleLogout() {
      this.login = false
    },
  }
}
</script>

<style scoped>
.menu-item {
  font-size: 18px;
  text-align: center;
  width: 8%;
}

.menu {
  width: 80%;
  height: 60px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 5%;
}

.user-box {
  position: relative;
  float: right;
  font-size: 20px;
  top: 50%;
  transform: translate(0, -50%);
  height: 100%;
}
</style>