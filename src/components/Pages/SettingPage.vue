<template>
  <div>
    <el-card style="width: 500px;margin: 150px auto;">
      <el-image src="logo.jpg" class="horizontal-center">
      </el-image>
      <h1 align="center">用 户 设 置</h1>
      <el-divider><i class="el-icon-postcard"></i></el-divider>
      <el-form>
        <el-form-item class="info" label="用户:">
          {{ this.username }}
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
               :close-on-click-modal="false"
               title="添加用户"
               style="margin-left: auto;margin-right: auto;width: 50%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      username: this.$store.state.user.username,
      xkAccount: this.$store.state.user.xkAccount,
      xkPassword: '',
      passwordDialogVis: false,
      xkDialogVis: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
    }
  },
  methods: {
    submit() {
      this.$router.push('/main')
    },
    closePasswordDialog() {
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      }
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