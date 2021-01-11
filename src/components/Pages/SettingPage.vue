<template>
  <div>
    <el-card style="width: 500px;margin: 150px auto;">
      <el-image src="logo.jpg" class="horizontal-center">
      </el-image>
      <h1 align="center">用 户 设 置</h1>
      <el-divider><i class="el-icon-postcard"></i></el-divider>
      <el-form>
        <el-form-item class="info" label="用户:">
          {{ this.$store.state.user.username }}
        </el-form-item>
        <el-form-item class="info" label="密码:">
          <el-button icon="el-icon-edit"
                     type="text"
                     @click="passwordDialogVis=true">
            点击此处修改密码
          </el-button>
        </el-form-item>
        <el-form-item class="info" label="选课:">
          <el-button icon="el-icon-edit"
                     type="text"
                     @click="xkDialogVis=true">
            点击此处修改绑定账号
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="passwordDialogVis"
               :before-close="closePasswordDialog"
               append-to-body
               v-loading="passwordLoading"
               element-loading-text="修改中"
               title="修改密码"
               width="25%">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" status-icon class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="newPassword2">
          <el-input v-model="passwordForm.newPassword2" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 20%;" @click="submitPassword">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="xkDialogVis"
               :before-close="closeXkDialog"
               append-to-body
               v-loading="xkLoading"
               element-loading-text="爬取选课网账号信息中"
               title="修改绑定账号"
               width="25%">
      <el-form :rules="xkRules" ref="xkForm" :model="xkForm" status-icon class="demo-ruleForm">
        <el-form-item label="选课账号" prop="xkAccount">
          <el-input v-model="xkForm.xkAccount"></el-input>
        </el-form-item>
        <el-form-item label="选课密码" prop="xkPassword">
          <el-input v-model="xkForm.xkPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 20%" @click="submitXk">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      xkLoading: false,
      passwordLoading: false,
      passwordDialogVis: false,
      xkDialogVis: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      passwordRules: {
        oldPassword: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
        newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
        newPassword2: [{required: true, message: '请确认新密码', trigger: 'blur'}]
      },
      xkForm: {
        xkAccount: this.$store.state.user.xkAccount,
        xkPassword: ''
      },
      xkRules: {
        xkAccount: [{required: true, message: '请输入选课账号', trigger: 'blur'}],
        xkPassword: [{required: true, message: '请输入选课密码', trigger: 'blur'}],
      }
    }
  },
  methods: {
    submitPassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.newPassword2) {
        this.$store.state.page.$message.error('两次输入密码不一致!')
        return
      }
      this.passwordLoading = true
      var params = new FormData();
      params.append('username', this.$store.state.user.username)
      params.append('password', this.passwordForm.oldPassword)
      params.append('newPassword', this.passwordForm.newPassword)
      this.$store.state.page.$http.post(this.$store.state.api + '/user/updatePassword', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.passwordLoading = false
            this.closePasswordDialog()
          })
    },
    submitXk() {
      this.xkLoading = true
      var params = new FormData();
      params.append('username', this.$store.state.user.username)
      params.append('xkId', this.xkForm.xkAccount)
      params.append('xkPwd', this.xkForm.xkPassword)
      this.$store.state.page.$http.post(this.$store.state.api + '/user/updateXk', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
              this.$store.commit('updateUser')
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.$store.commit('getCredit')
            this.xkLoading = false
            this.closeXkDialog()
          })

    },
    closePasswordDialog() {
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      }
      this.passwordDialogVis = false
    },
    closeXkDialog() {
      this.xkForm = {
        xkId: this.$store.state.user.xkAccount,
        xkPwd: ''
      }
      this.xkDialogVis = false
    },
    permissionCheck() {
      if (this.$store.state.user.isUpdated) {
        if (this.$route.path === '/admin' && !this.$store.state.user.isAdmin) {
          this.$router.replace('/error401')
        } else if (this.$route.path !== '/admin' && !this.$store.state.user.username) {
          this.$router.replace('/error401')
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    }
  },
  created() {
    document.title = '设置页面'
    this.permissionCheck()
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