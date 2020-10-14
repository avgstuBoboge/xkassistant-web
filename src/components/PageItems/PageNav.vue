<template>
  <div>
    <el-menu
        :default-active="activeIndex" class="menu" mode="horizontal"
        @select="handleSelect">
      <el-menu-item index="1" class="menu-item">选 课</el-menu-item>
      <el-menu-item index="2" class="menu-item">功能1</el-menu-item>
      <el-menu-item index="3" class="menu-item">功能2</el-menu-item>
      <div class="user-box">
        <template v-if="login">
          <span style="margin-right: 15px">欢迎您, {{ username }}</span>
          <el-button type="danger" style="width: 100px" @click="handleLogout">注 销</el-button>
        </template>
        <template v-else>
          <el-button type="primary" style="width: 100px" @click="handleLogin">登 录</el-button>
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
      username: 'test'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleLogin() {
      this.login = true
    },
    handleLogout() {
      this.login = false
    }
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