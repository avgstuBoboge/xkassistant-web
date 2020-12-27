<template>
  <div class="vertical-center">
    <el-dropdown trigger="click" style="font-size: 18px" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-user el-icon--left"/>
        {{ this.$store.state.user.username }}
        <i class="el-icon-arrow-down el-icon--right"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="Setting">
          账户设置
        </el-dropdown-item>
        <el-dropdown-item command="Logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "UserBox",
  data() {
    return {}
  },
  methods: {
    goSetting() {
      this.$router.push('/setting')
    },
    handleLogout() {
      this.$store.state.user = {}
      this.$router.push('/')
    },
    handleCommand(Command) {
      if (Command === 'Setting') this.goSetting()
      else this.handleLogout()
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 18px;
}
</style>