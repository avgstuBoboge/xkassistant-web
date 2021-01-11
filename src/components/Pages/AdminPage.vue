<template>
  <div class="page-part">
    <el-tabs type="border-card" style="margin-left: auto;margin-right: auto;width: 70%;min-height: 750px">
      <el-tab-pane label="用户管理">
        <div style="margin-left: auto;margin-right: auto;width: 50%">
          <el-input placeholder="请输入用户名" v-model="userKwords">
            <el-button slot="append" icon="el-icon-search" @click="userSearch"></el-button>
          </el-input>
        </div>
        <div style="margin-left: auto;margin-right: auto;width: 87%">
          <el-button
              @click="userCreateForm={username: '',password: '',xkId: '',xkPwd: '',isAdmin: false};userCreateDialogVis=true">
            <i class="el-icon-plus"/>
          </el-button>
        </div>
        <div style="margin-left: auto;margin-right: auto;width: 100%">
          <el-table :data="userTableData" v-loading="userTableLoading">
            <el-table-column align="center" label="用户名" prop="username"></el-table-column>
            <el-table-column align="center" label="选课网账号" prop="xkId"></el-table-column>
            <el-table-column align="center" label="管理员权限" prop="isAdmin">
              <template slot-scope="scope">
                <el-switch @change="changeAdmin(scope.row)"
                           v-model="scope.row.admin">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="center" label="编辑">
              <template slot-scope="scope">
                <el-button icon="el-icon-edit"
                           type="text"
                           @click="userEditForm=scope.row;
                             userEditDialogVis = true;scope.row.password='';scope.row.xkPwd=''">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :visible.sync="userCreateDialogVis"
                   :before-close="closeCreateDialog"
                   append-to-body
                   v-loading="userCreateLoading"
                   title="添加用户"
                   width="25%">
          <el-form ref="createForm" :model="userCreateForm">
            <el-form-item label="用户名">
              <el-input v-model="userCreateForm.username"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userCreateForm.password"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="选课网账号">
              <el-input v-model="userCreateForm.xkId"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="选课网密码">
              <el-input v-model="userCreateForm.xkPwd"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="是否管理员">
              <el-switch v-model="userCreateForm.isAdmin" style="margin-left: 10%;">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width: 20%;margin-right: 10%;float: right" @click="createUser">确定
              </el-button>
              <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeCreateDialog">取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="userEditDialogVis"
                   :before-close="closeEditDialog"
                   append-to-body
                   title="编辑用户"
                   v-loading="userUpdateLoading"
                   width="25%">
          <el-form ref="editForm" :model="userEditForm">
            <el-form-item label="用户名">
              <el-input disabled v-model="userEditForm.username"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userEditForm.password"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="选课网账号">
              <el-input v-model="userEditForm.xkId"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="选课网密码">
              <el-input v-model="userEditForm.xkPwd"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width: 20%;margin-right: 10%;float: right" @click="updateUser">确定
              </el-button>
              <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeEditDialog">取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-tab-pane>
<!--      <el-tab-pane label="课程管理">-->
<!--        <div style="margin-left: auto;margin-right: auto;width: 50%">-->
<!--          <el-input placeholder="请输入课程名" v-model="courseKwords">-->
<!--            <el-button slot="append" icon="el-icon-search" @click="courseSearch"></el-button>-->
<!--          </el-input>-->
<!--        </div>-->
<!--        <div style="margin-left: auto;margin-right: auto;width: 87%">-->
<!--          <el-button-->
<!--              @click="courseCreateForm={username: '',password: '',xkId: '',xkPwd: '',isAdmin: false};courseCreateDialogVis=true">-->
<!--            <i class="el-icon-plus"/>-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <div style="margin-left: auto;margin-right: auto;width: 100%">-->
<!--          <el-table :data="courseTableData" v-loading="courseTableLoading">-->

<!--          </el-table>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      userKwords: '',
      courseKwords: '',
      editUsername: '',
      editCourseName: '',
      userEditDialogVis: false,
      userTableLoading: false,
      userCreateDialogVis: false,
      userCreateLoading: false,
      userUpdateLoading: false,
      userSearchLoading: false,
      userTableData: [],
      userEditForm: {
        username: '',
        password: '',
        xkId: '',
        xkPwd: ''
      },
      userCreateForm: {
        username: '',
        password: '',
        xkId: '',
        xkPwd: '',
        isAdmin: false,
      },
      courseEditDialogVis: false,
      courseTableLoading: false,
      courseCreateDialogVis: false,
      courseCreateLoading: false,
      courseUpdateLoading: false,
      courseSearchLoading: false,
      courseTableData: [],
      courseEditForm: {
        username: '',
        password: '',
        xkId: '',
        xkPwd: ''
      },
      courseCreateForm: {
        username: '',
        password: '',
        xkId: '',
        xkPwd: '',
        isAdmin: false,
      },
    }
  },
  methods: {
    createUser() {
      this.userCreateLoading = true
      var params = new FormData();
      let form = this.userCreateForm
      params.append('username', form.username)
      params.append('password', form.password)
      params.append('isAdmin', form.isAdmin)
      this.$store.state.page.$http.post(this.$store.state.api + '/user/register', params)
          .then(data => {
            if (data.data.code === 200) {
              if (form.xkId === '') {
                this.$store.state.page.$message.success(data.data.msg)
                this.$store.commit('updateUser')
                this.userCreateLoading = false
                this.closeCreateDialog()
              } else {
                params = new FormData();
                params.append('username', form.username)
                params.append('xkId', form.xkId)
                params.append('xkPwd', form.xkPwd)
                this.$store.state.page.$http.post(this.$store.state.api + '/user/updateXk', params)
                    .then(resp => {
                      if (resp.data.code === 200) {
                        this.$store.state.page.$message.success(resp.data.msg)
                        this.$store.commit('updateUser')
                      } else {
                        this.$store.state.page.$message.error(resp.data.msg)
                      }
                      this.userCreateLoading = false
                      this.closeCreateDialog()
                    })
              }
            } else {
              this.$store.state.page.$message.error(data.data.msg)
              this.userCreateLoading = false
              this.closeCreateDialog()
            }
          })
    },
    updateUser() {
      this.userUpdateLoading = true
      var params = new FormData();
      let form = this.userEditForm
      params.append('username', form.username)
      params.append('password', form.password)
      this.$store.state.page.$http.post(this.$store.state.api + '/user/resetPassword', params)
          .then(data => {
            if (data.data.code === 200) {
              params = new FormData();
              params.append('username', form.username)
              params.append('xkId', form.xkId)
              params.append('xkPwd', form.xkPwd)
              this.$store.state.page.$http.post(this.$store.state.api + '/user/updateXk', params)
                  .then(resp => {
                    if (resp.data.code === 200) {
                      this.$store.state.page.$message.success(resp.data.msg)
                      this.$store.commit('updateUser')
                    } else {
                      this.$store.state.page.$message.error(resp.data.msg)
                    }
                    this.userUpdateLoading = false
                    this.closeEditDialog()
                  })
            } else {
              this.$store.state.page.$message.error(data.data.msg)
              this.userUpdateLoading = false
              this.closeEditDialog()
            }
          })
    },
    changeAdmin(row) {
      var params = new FormData();
      params.append('username', row.username)
      params.append('isAdmin', row.admin)
      this.$store.state.page.$http.post(this.$store.state.api + '/user/setAdmin', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.userSearch()
          })
    },
    closeEditDialog() {
      this.userEditForm = {
        username: '',
        password: '',
        xkId: '',
        xkPwd: ''
      }
      this.userEditDialogVis = false
    },
    closeCreateDialog() {
      this.userCreateForm = {
        username: '',
        password: '',
        xkId: '',
        xkPwd: '',
        isAdmin: false,
      }
      this.userCreateDialogVis = false
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
    },
    userSearch() {
      this.userSearchLoading = true
      var params = new FormData();
      params.append('keywords', this.userKwords)
      this.$store.state.page.$http.get(this.$store.state.api + '/user/search', {params: {keywords: this.userKwords}})
          .then(resp => {
            if (resp.data.code === 200) {
              this.userTableData = resp.data.data
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.userSearchLoading = false
          })
    }
  },
  created() {
    document.title = '管理页面'
    this.userTableData = []
    this.permissionCheck()
    this.userSearch()
  }
}
</script>

<style scoped>

</style>