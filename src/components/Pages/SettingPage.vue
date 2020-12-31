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
               append-to-body
               title="修改密码"
               width="25%">
      <el-form :model="passwordForm">
        <el-form-item label="旧密码">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password
                    style="width: 80%;float: right;margin-right: 5%"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordForm.newPassword" type="password" show-password
                    style="width: 80%;float: right;margin-right: 5%"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="passwordForm.newPassword2" type="password" show-password
                    style="width: 80%;float: right;margin-right: 5%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 20%;float: right;margin-right: 65%" @click="submitPassword">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="xkDialogVis"
               :before-close="closeXkDialog"
               append-to-body
               title="修改绑定账号"
               width="25%">
      <el-form :model="xkForm">
        <el-form-item label="选课账号">
          <el-input v-model="xkForm.xkAccount" style="width: 80%;float: right;margin-right: 5%"></el-input>
        </el-form-item>
        <el-form-item label="选课密码">
          <el-input v-model="xkForm.xkPassword" type="password" show-password
                    style="width: 80%;float: right;margin-right: 5%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 20%;float: right;margin-right: 65%" @click="submitXk">提交
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
      username: this.$store.state.user.username,
      passwordDialogVis: false,
      xkDialogVis: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      xkForm: {
        xkAccount: this.$store.state.user.xkAccount,
        xkPassword: ''
      }
    }
  },
  methods: {
    submitPassword() {
      this.closePasswordDialog()
    },
    submitXk() {
      this.closeXkDialog()
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
        xkAccount: this.$store.state.user.xkAccount,
        xkPassword: ''
      }
      this.xkDialogVis = false
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