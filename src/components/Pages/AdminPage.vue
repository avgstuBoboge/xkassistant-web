<template>
  <div class="page-part">
    <el-tabs type="border-card" style="margin-left: auto;margin-right: auto;width: 70%;min-height: 750px"
             @tab-click="doSearch" v-model="tabName">
      <el-tab-pane label="用户管理" name="user">
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
                   :before-close="closeUserCreateDialog"
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
              <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeUserCreateDialog">取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="userEditDialogVis"
                   :before-close="closeUserEditDialog"
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
              <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeUserEditDialog">取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="课程管理" name="course">
        <div style="margin-left: auto;margin-right: auto;width: 50%">
          <el-input placeholder="请输入课程名" v-model="courseKwords">
            <el-button slot="append" icon="el-icon-search" @click="courseSearch"></el-button>
          </el-input>
        </div>
        <div style="margin-left: auto;margin-right: auto;width: 87%">
          <el-button
              @click="courseCreateForm={courseId: '', name: '',credit: ''}; courseCreateDialogVis=true">
            <i class="el-icon-plus"/>
          </el-button>
        </div>
        <div style="margin-left: auto;margin-right: auto;width: 100%">
          <el-table :data="courseTableData" max-height="700px" v-loading="courseTableLoading">
            <el-table-column label="课程代码" align="center" prop="courseId" sortable></el-table-column>
            <el-table-column label="课程名" align="center" prop="name" sortable></el-table-column>
            <el-table-column label="学分" align="center" prop="credit" sortable></el-table-column>
            <el-table-column fixed="right" width="180px">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="courseEditForm=scope.row;courseEditDialogVis = true;">修 改
                </el-button>
                <el-button type="danger" size="mini" @click="deleteCourse(scope.row.courseId)">删 除</el-button>
              </template>
            </el-table-column>
            <el-table-column type="expand" fixed="right">
              <template slot-scope="scope">
                <el-table :data="scope.row.teachList" border stripe>
                  <el-table-column label="教师" align="center" prop="teacher"></el-table-column>
                  <el-table-column label="时间" align="center" prop="time"></el-table-column>
                  <el-table-column label="地点" align="center" prop="addr"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :visible.sync="courseCreateDialogVis"
                   :before-close="closeCourseCreateDialog"
                   append-to-body
                   v-loading="courseCreateLoading"
                   title="添加课程"
                   width="25%">
          <el-form ref="createForm" :model="courseCreateForm">
            <el-form-item label="课程编号">
              <el-input v-model="courseCreateForm.courseId"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="课程名">
              <el-input v-model="courseCreateForm.name"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="学分">
              <el-input v-model="courseCreateForm.credit"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width: 20%;margin-right: 10%;float: right" @click="createCourse">确定
              </el-button>
              <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeCourseCreateDialog">取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="courseEditDialogVis"
                   :before-close="closeCourseEditDialog"
                   append-to-body
                   title="编辑课程"
                   v-loading="courseUpdateLoading"
                   width="25%">
          <el-form ref="editForm" :model="courseEditForm">
            <el-form-item label="课程编号">
              <el-input disabled v-model="courseEditForm.courseId"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="课程名">
              <el-input v-model="courseEditForm.name"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item label="学分">
              <el-input v-model="courseEditForm.credit"
                        style="width: 50%;margin-right: 10%;float: right"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width: 20%;margin-right: 10%;float: right" @click="updateCourse">确定
              </el-button>
              <el-button style="width: 20%;margin-right: 3%;float: right" @click="closeCourseEditDialog">取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      tabName: 'user',
      userKwords: '',
      courseKwords: '',
      editUsername: '',
      editCourseName: '',
      userEditDialogVis: false,
      userTableLoading: false,
      userCreateDialogVis: false,
      userCreateLoading: false,
      userUpdateLoading: false,
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
      courseTableData: [],
      courseEditForm: {
        courseId: '',
        name: '',
        credit: ''
      },
      courseCreateForm: {
        courseId: '',
        name: '',
        credit: ''
      },
    }
  },
  methods: {
    deleteCourse(courseId) {
      var params = new FormData();
      params.append('courseId', courseId)
      this.$store.state.page.$http.post(this.$store.state.api + '/course/del', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.doSearch()
          })
    },
    doSearch() {
      if (this.tabName === 'user') {
        this.userSearch()
      } else {
        this.courseSearch()
      }
    },
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
                this.closeUserCreateDialog()
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
                      this.closeUserCreateDialog()
                    })
              }
            } else {
              this.$store.state.page.$message.error(data.data.msg)
              this.userCreateLoading = false
              this.closeUserCreateDialog()
            }
          })
      this.doSearch()
    },
    createCourse() {
      this.courseCreateLoading = true
      var params = new FormData();
      let form = this.courseCreateForm
      params.append('courseId', form.courseId)
      params.append('name', form.name)
      params.append('credit', form.credit)
      this.$store.state.page.$http.post(this.$store.state.api + '/course/new', params)
          .then(data => {
            if (data.data.code === 200) {
              this.$store.state.page.$message.success(data.data.msg)
            } else {
              this.$store.state.page.$message.error(data.data.msg)
            }
            this.userCreateLoading = false
            this.closeCourseCreateDialog()
          })
      this.doSearch()
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
                    this.closeUserEditDialog()
                  })
            } else {
              this.$store.state.page.$message.error(data.data.msg)
              this.userUpdateLoading = false
              this.closeUserEditDialog()
            }
          })
      this.doSearch()
    },
    updateCourse() {
      this.courseUpdateLoading = true
      var params = new FormData();
      let form = this.courseEditForm
      params.append('oldId', form.courseId)
      params.append('newId', form.courseId)
      params.append('name', form.name)
      params.append('credit', form.credit)
      this.$store.state.page.$http.post(this.$store.state.api + '/course/update', params)
          .then(data => {
            if (data.data.code === 200) {
              this.$store.state.page.$message.success(data.data.msg)
            } else {
              this.$store.state.page.$message.error(data.data.msg)
            }
            this.courseUpdateLoading = false
            this.closeCourseEditDialog()
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
    closeUserEditDialog() {
      this.userEditForm = {
        username: '',
        password: '',
        xkId: '',
        xkPwd: ''
      }
      this.userEditDialogVis = false
      this.doSearch()
    },
    closeCourseEditDialog() {
      this.courseEditForm = {
        courseId: '',
        name: '',
        credit: ''
      }
      this.courseEditDialogVis = false
      this.doSearch()
    },
    closeUserCreateDialog() {
      this.userCreateForm = {
        username: '',
        password: '',
        xkId: '',
        xkPwd: '',
        isAdmin: false,
      }
      this.userCreateDialogVis = false
      this.doSearch()
    },
    closeCourseCreateDialog() {
      this.courseCreateForm = {
        courseId: '',
        name: '',
        credit: ''
      }
      this.courseCreateDialogVis = false
      this.doSearch()
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
      this.$store.state.page.$http.get(this.$store.state.api + '/user/search', {params: {keywords: this.userKwords}})
          .then(resp => {
            if (resp.data.code === 200) {
              this.userTableData = resp.data.data
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.userSearchLoading = false
          })
    },
    courseSearch() {
      this.courseTableLoading = true
      this.$store.state.page.$http.get(this.$store.state.api + '/course/search', {params: {keywords: this.courseKwords}})
          .then(resp => {
            if (resp.data.code === 200) {
              this.courseTableData = resp.data.data
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
            this.courseTableLoading = false
            console.log('course loading finish')
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