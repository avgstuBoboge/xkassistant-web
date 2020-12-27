<template>
  <div>
    <el-card style="width: 500px;margin: 150px auto;">
      <el-image src="logo.jpg" class="horizontal-center">
      </el-image>
      <h1 align="center">用 户 设 置</h1>
      <el-divider><i class="el-icon-postcard"></i></el-divider>
      <el-form>
        <el-form-item class="info">
          <el-input class="info"
                    v-model="username"
                    disabled
                    prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item class="info">
          <el-input class="info"
                    placeholder="旧密码(必须)"
                    v-model="password"
                    type="password"
                    show-password
                    prefix-icon="el-icon-key">
          </el-input>
        </el-form-item>
        <el-form-item class="info">
          <el-input class="info"
                    placeholder="新密码"
                    v-model="newPassword"
                    type="password"
                    show-password
                    prefix-icon="el-icon-key">
          </el-input>
        </el-form-item>
        <el-form-item class="info">
          <el-input class="info"
                    placeholder="请输入选课网账号"
                    v-model="xkAccount"
                    prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item class="info">
          <el-input class="info"
                    placeholder="请输入选课网密码"
                    v-model="xkPassword"
                    type="password"
                    show-password
                    prefix-icon="el-icon-key">
          </el-input>
        </el-form-item>
        <el-form-item class="info">
          <el-button type="primary" style="width: 100%" @click="submit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      username: this.$store.state.user.username,
      password: '',
      newPassword: '',
      xkAccount: this.$store.state.user.xkAccount,
      xkPassword: ''
    }
  },
  methods: {
    submit() {
      this.$router.push('/login')
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