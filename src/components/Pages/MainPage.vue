<template>
  <div class="page-part">
    <el-card shadow="never">
      <el-container style="height: 900px">
        <el-aside width="35%">
          <h3>搜索课程</h3>
          <div style="margin-top: 20px; margin-bottom: 20px">
            <el-input placeholder="请输入要查询的课程名"
                      v-model="search"
                      class="input-with-select"
                      @keyup.enter.native="doSearch"
                      style="width: 100%;">
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="doSearch"
                         style="color: #ffffff;background-color: #409eff;"></el-button>
            </el-input>
          </div>
          <div style="margin-top: 20px">
            <el-switch v-model="inPlan"
                       @change="planChange"
                       active-text="仅查看计划内课程"
                       inactive-text="搜索全部课程">
            </el-switch>
          </div>
          <el-card style="margin-top: 20px;height: 30%;overflow:auto">
            <div style="height: 100%;">
              <el-collapse style="margin-top: 10px;" accordion>
                <template v-for="(item,index) in results">
                  <el-collapse-item :name="index" :key="index">
                    <template slot="title">
                      <div class="collapse-title">
                        <span style="width: 40%" :title="item.name">{{ item.name }}</span>
                        <span style="color: gray">{{ item.courseId }}</span>
                        <span>{{ item.credit }}分</span>
                        <span>{{ item.category }}</span>
                      </div>
                    </template>
                    <el-table stripe
                              border
                              style="border-radius: 4px"
                              :show-header="false"
                              @cell-mouse-enter="setTimeTable"
                              @cell-mouse-leave="setTimeTable"
                              :data="item.teachList">
                      <el-table-column label="教师" align="center" prop="teacher"></el-table-column>
                      <el-table-column label="时间" align="center" prop="time" width="200px"></el-table-column>
                      <el-table-column label="地点" align="center" prop="addr" width="200px"></el-table-column>
                      <el-table-column fixed="right">
                        <template slot-scope="scope">
                          <el-button size="mini" type="primary" @click="addGit(scope.row.teachId)">
                            添加
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                </template>
              </el-collapse>
            </div>
          </el-card>
          <h3>
            课程仓库
          </h3>
          <el-card style="margin-top: 20px;height: 40%;overflow: auto">
            <el-table style="margin-top: 20px"
                      border
                      @cell-mouse-enter="setTimeTable"
                      @cell-mouse-leave="setTimeTable"
                      :data="selectedCourses">
              <el-table-column label="编号" align="center" fixed="left">
                <template slot-scope="scope">
                  {{ scope.row.courseId }}
                </template>
              </el-table-column>
              <el-table-column label="课程" align="center" width="150px">
                <template slot-scope="scope">
                  <div class="collapse-title">
                    <span style="width: 100%" :title="scope.row.courseName">{{ scope.row.courseName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="教师" align="center">
                <template slot-scope="scope">
                  {{ scope.row.teacher }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100px" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle
                             @click="deleteCourse(scope.row.teachId)"></el-button>
                  <el-switch style="margin-left: 10px" v-model="scope.row.inTable" @change="updateCourse(scope.row)">选课
                  </el-switch>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 30px;float: right">
              <el-button style="margin-right: 20px" type="primary" @click="saveGit">保存仓库</el-button>
              <el-button style="margin-right: 20px" type="danger" @click="clearGit">清空仓库</el-button>
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <el-card>
            <el-table border
                      :key="tableKey"
                      :data="classTableData"
                      :span-method="cellSpanMethod"
                      :cell-style="getCellStyle">
              <!--                    @cell-click="selectCell"-->
              <el-table-column label="时间" width="80px" align="center">
                <template slot-scope="scope">
                  第{{ scope.$index + 1 }}节
                  <template v-if="scope.$index===0">
                    <br/>(上午)
                  </template>
                  <template v-if="scope.$index===5">
                    <br/>(下午)
                  </template>
                  <template v-if="scope.$index===9">
                    <br/>(晚间)
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="星期一" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[0]"></div>
                </template>
              </el-table-column>
              <el-table-column label="星期二" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[1]"></div>
                </template>
              </el-table-column>
              <el-table-column label="星期三" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[2]"></div>
                </template>
              </el-table-column>
              <el-table-column label="星期四" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[3]"></div>
                </template>
              </el-table-column>
              <el-table-column label="星期五" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[4]"></div>
                </template>
              </el-table-column>
              <el-table-column label="星期六" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[5]"></div>
                </template>
              </el-table-column>
              <el-table-column label="星期日" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.data[6]"></div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>


export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  data() {
    return {
      tableKey: 0,
      tmp: [],
      classTableData: [],
      selected: [],
      cellStyles: [],
      flag: false,
      cnt: 0,
      department: '',
      search: '',
      inPlan: true,
      selectedCourses: [{
        courseId: 'BE1030K',
        courseName: '软件体系结构原理与实践',
        credit: 4,
        inTable: false,
        teacher: 'wangsp',
        cells: [{
          startRow: 1,
          endRow: 2,
          column: 1,
          addr: '理四-201'
        }, {
          startRow: 1,
          endRow: 2,
          column: 3,
          addr: '理四-201'
        }]
      }, {
        courseID: '114514',
        courseName: 'fake软体',
        courseCredit: 4,
        courseProp: '必修',
        selected: false,
        courseTeacher: '田所浩二',
        cells: [{
          startRow: 3,
          endRow: 4,
          column: 1,
          addr: '杰哥的大house'
        }, {
          startRow: 1,
          endRow: 2,
          column: 3,
          addr: '下北泽'
        }]
      }, {
        courseID: 'BE1030K',
        courseName: '软件工程',
        courseCredit: 4,
        courseProp: '必修',
        courseTeacher: 'yangc',
        selected: false,
        cells: [{
          startRow: 3,
          endRow: 4,
          column: 2,
          addr: '理四-534'
        }, {
          startRow: 6,
          endRow: 7,
          column: 4,
          addr: '理四-420'
        }]
      }],
      results: [{
        name: '软件工程',
        courseId: 'BE1030K',
        credit: '4',
        category: '必修',
        teachList: [{
          teacher: 'yangc',
          time: '周二上午3,4; 周四下午6,7',
          addr: '理四534; 理四420',
          cells: [{
            startRow: 3,
            endRow: 4,
            column: 2
          }, {
            startRow: 6,
            endRow: 7,
            column: 4
          }]
        }]
      }, {
        name: '软件体系结构原理与实践',
        courseId: 'BE1030K',
        credit: '4',
        category: '必修',
        teachList: [{
          teacher: 'wangsp',
          time: '周一上午1,2; 周三上午1,2',
          addr: '理四201',
          cells: [{
            startRow: 1,
            endRow: 2,
            column: 1,
            place: '理四-534'
          }, {
            startRow: 1,
            endRow: 2,
            column: 3,
            place: '理四-201'
          }]
        }]
      }]
    }
  },
  methods: {
    doSearch() {
      if (this.inPlan) return
      var params = new FormData();
      params.append('keywords', this.search)
      this.$store.state.page.$http.post(this.$store.state.api + '/course/search', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.results = resp.data.data
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })
    },
    setTimeTable(row) {
      for (var i in row.cells) {
        let cell = row.cells[i]
        for (var r = cell.startRow - 1; r <= cell.endRow - 1; r++) {
          if (this.cellStyles[r][cell.column] === 0) {
            this.cellStyles[r][cell.column] = 1
            this.cnt += 1
            this.flag = true
          } else {
            this.cellStyles[r][cell.column] = 0
            this.cnt -= 1
            if (this.cnt === 0) {
              this.flag = false
            }
          }
        }
      }
      this.tableKey = (this.tableKey + 1) % 10
    },
    selectCell(row, column) {
      if (column.index === 0) return
      if (this.cellStyles[row.index][column.index] === 0) {
        this.cellStyles[row.index][column.index] = 1
        this.cnt += 1
        this.flag = true
      } else {
        this.cellStyles[row.index][column.index] = 0
        this.cnt -= 1
        if (this.cnt === 0) {
          this.flag = false
        }
      }
      this.tableKey = (this.tableKey + 1) % 10
    },
    getCellStyle({row, column, rowIndex, columnIndex}) {
      row.index = rowIndex
      column.index = columnIndex
      let color = 'transparent'
      if (this.cellStyles[rowIndex][columnIndex] === 1) {
        if (this.classTableData[rowIndex].data[columnIndex - 1] !== '')
          color = '#ffe3e3'; //255 227 227
        else
          color = '#d4edc9';
      }
      return 'background:' + color;
    },
    clearSelect() {
      for (let i = 0; i < 12; ++i) {
        for (let j = 0; j <= 7; ++j) {
          this.cellStyles[i][j] = 0
        }
      }
      this.tableKey = (this.tableKey + 1) % 10
    },
    addGit(teachId) {
      this.saveGit()
      var params = new FormData();
      params.append('teachId', teachId)
      this.$store.state.page.$http.post(this.$store.state.api + '/git/new', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
              this.getGit()
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })

    },
    getGit() {
      this.$store.state.page.$http.get(this.$store.state.api + '/git/now')
          .then(resp => {
            if (resp.data.code === 200) {
              this.selectedCourses = resp.data.data
              this.refreshData()
              for (var i in this.selectedCourses) {
                var row = this.selectedCourses[i]
                if (row.inTable)
                  this.updateCourse(row)
              }
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })
    },
    planChange() {
      if (this.inPlan) {
        this.fetchPlan()
      } else {
        this.results = []
      }
    },
    refreshStyle() {
      this.cellStyles = []
      for (let i = 0; i < 12; ++i) {
        let tmp = []
        for (let j = 0; j <= 7; ++j) {
          tmp.push(0)
        }
        this.cellStyles.push(tmp)
      }
    },
    refreshData() {
      this.classTableData = []
      for (let i = 0; i < 12; ++i) {
        let data = []
        for (let j = 0; j < 7; ++j) {
          data.push('')
        }
        this.classTableData.push({
          data: data
        })
      }
    },
    fetchPlan() {
      this.$store.state.page.$http.get(this.$store.state.api + '/course/fetchPlan')
          .then(resp => {
            if (resp.data.code === 200) {
              this.results = resp.data.data
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })
    },
    updateCourse(row) {
      if (row.inTable) {
        for (const idx in row.cells) {
          let cell = row.cells[idx]
          for (let i = cell.startRow - 1; i <= cell.endRow - 1; ++i) {
            if (this.classTableData[i].data[cell.column - 1] !== '') {
              this.$store.state.page.$message.error('选课冲突!')
              row.inTable = false
              return
            }
          }
        }
        for (const idx in row.cells) {
          let cell = row.cells[idx]
          for (let i = cell.startRow - 1; i <= cell.endRow - 1; ++i) {
            this.classTableData[i].data[cell.column - 1] = row.courseName + '<br/>' + row.teacher + '<br/>' + cell.addr
          }
        }
      } else {
        for (const idx in row.cells) {
          let cell = row.cells[idx]
          for (let i = cell.startRow - 1; i <= cell.endRow - 1; ++i) {
            this.classTableData[i].data[cell.column - 1] = ''
          }
        }
      }
      this.tableKey = (this.tableKey + 1) % 10
    },
    cellSpanMethod({rowIndex, columnIndex}) {
      if (columnIndex === 0) return [1, 1]
      if (this.classTableData[rowIndex].data[columnIndex - 1]) {
        if (rowIndex >= 1 && this.classTableData[rowIndex - 1].data[columnIndex - 1] === this.classTableData[rowIndex].data[columnIndex - 1]) {
          return [0, 0]
        } else {
          var far = 2
          while (rowIndex + far + 1 <= 11 && this.classTableData[rowIndex].data[columnIndex - 1] === this.classTableData[rowIndex + far].data[columnIndex - 1]) far++;
          return [far, 1]
        }
      } else {
        return [1, 1]
      }
    },
    deleteCourse(teachId) {
      this.saveGit()
      var params = new FormData();
      params.append('teachId', teachId)
      this.$store.state.page.$http.post(this.$store.state.api + '/git/del', params)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
              this.refreshStyle()
              this.getGit()
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })
    },
    saveGit() {
      this.$store.state.page.$http.post(this.$store.state.api + '/git/save', this.selectedCourses)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
              this.getGit()
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })
    },
    clearGit() {
      this.$store.state.page.$http.post(this.$store.state.api + '/git/clear')
          .then(resp => {
            if (resp.data.code === 200) {
              this.$store.state.page.$message.success(resp.data.msg)
              this.getGit()
            } else {
              this.$store.state.page.$message.error(resp.data.msg)
            }
          })
    }
  },
  created() {
    for (let i = 0; i < 12; ++i) {
      let data = []
      for (let j = 0; j < 7; ++j) {
        data.push('')
      }
      this.classTableData.push({
        data: data
      })
      let tmp = []
      for (let j = 0; j <= 7; ++j) {
        tmp.push(0)
      }
      this.cellStyles.push(tmp)
      this.selected.push(tmp)
    }
    this.fetchPlan()
    this.getGit()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.collapse-title {
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  text-align: center;
}

.collapse-title span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

</style>
