<template>
  <el-card style="width: 500px;margin: 150px auto;">
    <el-image src="logo.jpg" class="horizontal-center">
    </el-image>
    <h1 align="center">用 户 登 录</h1>
    <el-divider><i class="el-icon-postcard"></i></el-divider>
    <el-form>
      <el-form-item class="info">
        <el-input class="info"
                  placeholder="请输入用户名"
                  v-model="username"
                  prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item class="info">
        <el-input class="info"
                  placeholder="请输入密码"
                  v-model="password"
                  type="password"
                  show-password
                  @keyup.enter.native="submit"
                  prefix-icon="el-icon-key">
        </el-input>
      </el-form-item>
      <el-form-item class="info">
        <el-button type="primary" style="width: 45%" @click="submit">登 录</el-button>
        <el-button type="success" style="margin-left: 10%;width: 45%" @click="goRegister">注 册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submit() {
      this.$store.commit('login', {
        username: this.username,
        password: this.password
      })
    },
    goRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.info {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.image-box {
  margin-top: 50px;
}
</style>