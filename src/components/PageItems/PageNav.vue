<template>
  <div>
    <el-menu
        :default-active="this.$route.path"
        class="menu"
        mode="horizontal"
        router>
      <img src="../../assets/logo.jpg" style="width: 58px; height: 58px;float: left;position: relative"/>
      <el-menu-item index="/" class="menu-item" route="/">首 页</el-menu-item>
      <template v-if="this.$store.state.user.username" class="menu-item">
        <el-menu-item index="/main" route="/main" class="menu-item">选 课</el-menu-item>
      </template>
      <template v-if="this.$store.state.user.username" class="menu-item">
        <el-menu-item index="/credit" route="/credit" class="menu-item">已修课程查询</el-menu-item>
      </template>
      <template v-if="this.$store.state.user.isAdmin" class="menu-item">
        <el-menu-item index="/admin" route="/admin" class="menu-item">管 理</el-menu-item>
      </template>
      <div class="user-box">
        <template v-if="this.$store.state.user.username">
          <UserBox></UserBox>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script>
import UserBox from "@/components/PageItems/UserBox";
export default {
  name: "page-nav",
  components: {UserBox},
  data() {
    return {
      activeIndex: '1',
      login: false,
      username: 'test',
      fit: 'fill'
    };
  }
}
</script>

<style scoped>
.menu-item {
  font-size: 18px;
  text-align: center;
  width: 12%;
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
  font-size: 18px;
  top: 50%;
  transform: translate(0, -50%);
  height: 100%;
}
</style>