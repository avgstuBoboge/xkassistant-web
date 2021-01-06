<template>
  <div class="page-part">
    <div style="margin-left: auto;margin-right: auto;width: 50%">
      <el-input placeholder="请输入用户名" v-model="kwords">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div style="margin-left: auto;margin-right: auto;width: 69%">
      <el-button
          @click="createForm={username: '',password: '',xkAccount: '',xkPassword: '',isAdmin: false};createDialogVis=true">
        <i class="el-icon-plus"/>
      </el-button>
    </div>
    <div style="margin-left: auto;margin-right: auto;width: 80%">
      <el-table :data="tableData">
        <el-table-column align="center" label="用户名" prop="username"></el-table-column>
        <el-table-column align="center" label="密码" prop="password"></el-table-column>
        <el-table-column align="center" label="选课网账号" prop="xkAccount"></el-table-column>
        <el-table-column align="center" label="选课网密码" prop="xkPassword"></el-table-column>
        <el-table-column align="center" label="管理员权限" prop="isAdmin">
          <template slot-scope="scope">
            <el-switch @change="changeAdmin($event,scope.row.username)"
                       v-model="scope.row.isAdmin">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit"
                       type="text"
                       @click="editForm=scope.row;
                             editDialogVis = true">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="createDialogVis"
               :before-close="closeCreateDialog"
               append-to-body
               title="添加用户"
               width="25%">
      <el-form ref="createForm" :model="createForm">
        <el-form-item label="用户名">
          <el-input disabled v-model="createForm.username"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="createForm.password"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="选课网账号">
          <el-input v-model="createForm.xkAccount"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="选课网密码">
          <el-input v-model="createForm.xkPassword"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="是否管理员">
          <el-switch v-model="createForm.isAdmin" style="margin-left: 3%">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     style="width: 20%;margin-right: 10%;float: right">确定
          </el-button>
          <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeCreateDialog">取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editDialogVis"
               :before-close="closeEditDialog"
               append-to-body
               title="编辑用户"
               width="25%">
      <el-form ref="editForm" :model="editForm">
        <el-form-item label="用户名">
          <el-input disabled v-model="editForm.username"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editForm.password"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="选课网账号">
          <el-input v-model="editForm.xkAccount"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item label="选课网密码">
          <el-input v-model="editForm.xkPassword"
                    style="width: 70%;margin-right: 10%;float: right"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     style="width: 20%;margin-right: 10%;float: right">确定
          </el-button>
          <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeEditDialog">取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      kwords: '',
      editUsername: '',
      editDialogVis: false,
      createDialogVis: false,
      tableData: [{
        username: 'Awei',
        xkAccount: '31801338',
        isAdmin: true,
        password: '**********',
        xkPassword: '**********'
      }],
      editForm: {
        username: '',
        password: '',
        xkAccount: '',
        xkPassword: ''
      },
      createForm: {
        username: '',
        password: '',
        xkAccount: '',
        xkPassword: '',
        isAdmin: false,
      },
    }
  },
  methods: {
    changeAdmin($event, username) {
      console.log($event)
      console.log(username)
    },
    closeEditDialog() {
      this.editForm = {
        username: '',
        password: '',
        xkAccount: '',
        xkPassword: ''
      }
      this.editDialogVis = false
    },
    closeCreateDialog() {
      this.createForm = {
        username: '',
        password: '',
        xkAccount: '',
        xkPassword: '',
        isAdmin: false,
      }
      this.createDialogVis = false
    },
    permissionCheck() {
      if (this.$store.state.user.isUpdated) {
        if (!this.$store.state.user.isAdmin) {
          this.$router.replace('/error401')
        } else {
          this.getData()
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    }
  }
}
</script>

<style scoped>

</style>