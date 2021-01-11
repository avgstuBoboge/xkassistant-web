<template>
  <el-card style="width: 500px;margin: 150px auto;">
    <el-image src="logo.jpg" class="horizontal-center">
    </el-image>
    <h1 align="center">用 户 注 册</h1>
    <el-divider><i class="el-icon-postcard"/></el-divider>
    <el-form :rules="rules" ref="FormData" :model="FormData" status-icon class="demo-ruleForm">
      <el-form-item class="info" prop="username">
        <el-input class="info"
                  placeholder="请输入用户名"
                  v-model="FormData.username"
                  prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item class="info" prop="password">
        <el-input class="info"
                  placeholder="请输入密码"
                  v-model="FormData.password"
                  type="password"
                  show-password
                  prefix-icon="el-icon-key">
        </el-input>
      </el-form-item>
      <el-form-item class="info" prop="password2">
        <el-input class="info"
                  placeholder="确认密码"
                  v-model="FormData.password2"
                  type="password"
                  show-password
                  prefix-icon="el-icon-key"
                  @keyup.enter.native="submitForm('FormData')">
        </el-input>
      </el-form-item>
      <!--      <el-form-item class="info">-->
      <!--        <el-input class="info"-->
      <!--                  placeholder="请输入选课网账号"-->
      <!--                  v-model="xkId"-->
      <!--                  prefix-icon="el-icon-user">-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item class="info">-->
      <!--        <el-input class="info"-->
      <!--                  placeholder="请输入选课网密码"-->
      <!--                  v-model="xkPwd"-->
      <!--                  type="password"-->
      <!--                  show-password-->
      <!--                  prefix-icon="el-icon-key">-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->
      <el-form-item class="info">
        <el-button type="primary" style="width: 45%" @click="submitForm('FormData')">提 交</el-button>
        <el-button type="danger" style="margin-left:10%;width: 45%" @click="goBack">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      FormData: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        password2: [{required: true, message: '请确认密码', trigger: 'blur'}],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.FormData.password !== this.FormData.password2) {
            this.$store.state.page.$message.error('两次输入的密码不一致!')
            this.FormData.username = ''
            this.FormData.password = ''
            this.FormData.password2 = ''
            return false
          }
          this.$store.commit('register', {
            username: this.FormData.username,
            password: this.FormData.password
          })
          this.FormData.username = ''
          this.FormData.password = ''
          this.FormData.password2 = ''
        } else {
          this.FormData.username = ''
          this.FormData.password = ''
          this.FormData.password2 = ''
          return false
        }
      })
    },
    goBack() {
      this.$router.back()
    }
  },
  created() {
    document.title = '注册页面'
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