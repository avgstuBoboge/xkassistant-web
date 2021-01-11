<template>
  <div class="page-part">
    <el-input placeholder="请输入课程名" v-model="kwords" class="input-with-select horizontal-center" style="width: 60%">
      <el-select v-model="yearInterval" slot="prepend" placeholder="所有学年" style="width: 150px"
                 clearable>
        <template v-for="i in 10">
          <el-option v-bind:key="i" :label="(nowYear-i+1).toString() + '-' + (nowYear-i+2).toString()"
                     :value="(nowYear-i+1).toString() + '-' + (nowYear-i+2).toString()"></el-option>
        </template>
      </el-select>
      <el-select v-model="semester" slot="prepend" placeholder="所有学期" style="width: 150px;margin-left: 10px"
                 clearable>
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="getCreditTable"></el-button>
    </el-input>
    <el-card style="margin-right: auto;margin-left: auto;margin-top: 30px;width: 60%;height: 750px" shadow="never">
      <el-table style="margin: 0" :data="courseTableData" v-loading="!this.$store.state.user.xkAccount"
                stripe="stripe" max-height="720">
        <el-table-column align="center" label="学年" prop="year" sortable></el-table-column>
        <el-table-column align="center" label="学期" prop="term" sortable></el-table-column>
        <el-table-column align="center" label="课程编号" prop="courseId" sortable></el-table-column>
        <el-table-column align="center" label="课程名称" prop="courseName" sortable></el-table-column>
        <el-table-column align="center" label="学分" prop="credit" sortable></el-table-column>
        <el-table-column align="center" label="成绩" prop="score" sortable></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CreditPage",
  data() {
    return {
      kwords: '',
      yearInterval: '',
      semester: '',
      finishLoading: false,
      courseTableData: [{
        year: '2019-2020',
        semester: '2',
        courseId: '301259',
        courseName: '操作系统原理实验',
        category: '必修',
        credit: '1',
        grade: '优'
      }],
      GPA: '5.0',
      GPS: '140.0',
      nowYear: new Date().getFullYear(),
    }
  },
  methods: {
    getCreditTable() {
      this.$store.state.page.$http.get(this.$store.state.api + '/finish/search', {
        params: {
          year: this.yearInterval,
          term: this.semester,
          keywords: this.kwords
        }
      }).then(resp => {
        if (resp.data.code === 200) {
          this.courseTableData = resp.data.data
          this.$message.success(resp.data.msg)
        } else {
          this.$message.error(resp.data.msg)
        }
        this.finishLoading = false
      })
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
    document.title = '已修课程查询页面'
    this.getCreditTable()
    this.permissionCheck()
  }
}
</script>

<style scoped>

</style>