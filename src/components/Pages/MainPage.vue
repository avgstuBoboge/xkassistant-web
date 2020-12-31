<template>
  <div class="page-part">
    <el-card shadow="never">
      <el-container style="height: 780px">
        <el-aside width="30%">
          <div style="margin-top: 20px;">
            <h3>
              搜索课程
            </h3>
            <div style="margin-top: 20px; margin-bottom: 20px">
              <el-input placeholder="请输入要查询的课程名或课程代码"
                        v-model="search"
                        class="input-with-select"
                        style="width: 100%;">
                <el-select v-model="department"
                           slot="prepend"
                           placeholder="请选择学院"
                           clearable
                           style="width: 160px;color: #000000;background-color: #f5f7fa;">
                  <el-option label="计算机与计算科学学院" value="计算机与计算学院"></el-option>
                  <el-option label="信息与电气工程学院" value="信息与电气工程学院"></el-option>
                  <el-option label="工程学院" value="工程学院"></el-option>
                  <el-option label="医学院" value="医学院"></el-option>
                  <el-option label="外国语学院" value="外国语学院"></el-option>
                  <el-option label="商学院" value="商学院"></el-option>
                  <el-option label="传媒与人文学院" value="传媒与人文学院"></el-option>
                  <el-option label="法学院" value="法学院"></el-option>
                  <el-option label="创意与艺术设计学院" value="创意与艺术设计学院"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"
                           style="color: #ffffff;background-color: #409eff;"></el-button>
              </el-input>
            </div>
            <el-row>
              <el-checkbox v-model="inPlan">仅查看计划内课程</el-checkbox>
              <el-checkbox v-model="noConflict">仅查看未冲突课程</el-checkbox>
            </el-row>
            <el-row>
              <el-collapse style="margin-top: 10px;">
                <template v-for="(item,index) in results">
                  <el-collapse-item :name="index" :key="index">
                    <template slot="title">
                      <div class="collapse-title">
                        <span style="width: 40%" :title="item.courseName">{{ item.courseName }}</span>
                        <span style="color: gray">{{ item.courseID }}</span>
                        <span>{{ item.credit }}分</span>
                        <span>{{ item.category }}</span>
                      </div>
                    </template>
                    <el-table stripe
                              border
                              style="border-radius: 4px"
                              :data="item.tableData">
                      <el-table-column label="教师" align="center" prop="courseTeacher"></el-table-column>
                      <el-table-column label="时间" align="center" prop="courseTime" width="200px"></el-table-column>
                      <el-table-column label="地点" align="center" prop="courseAddress" width="200px"></el-table-column>
                      <el-table-column fixed="right">
                        <template slot-scope="scope">
                          <el-button size="mini" type="primary" @click="submit(scope.$index)">
                            添加
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                </template>
              </el-collapse>
            </el-row>
          </div>
          <div style="margin-top: 20px;">
            <h3>
              课程仓库
            </h3>
            <el-table style="margin-top: 20px"
                      border
                      @cell-mouse-enter="setTimeTable"
                      @cell-mouse-leave="setTimeTable"
                      :data="selectedCourses">
              <el-table-column label="编号" align="center" fixed="left">
                <template slot-scope="scope">
                  {{ scope.row.courseID }}
                </template>
              </el-table-column>
              <el-table-column label="课程" align="center" width="150px">
                <template slot-scope="scope">
                  <div class="collapse-title">
                    <span style="width: 100%" :title="scope.row.courseName">{{ scope.row.courseName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="学分" align="center">
                <template slot-scope="scope">
                  {{ scope.row.courseCredit }}
                </template>
              </el-table-column>
              <el-table-column label="性质" align="center">
                <template slot-scope="scope">
                  {{ scope.row.courseProp }}
                </template>
              </el-table-column>
              <el-table-column label="教师" align="center">
                <template slot-scope="scope">
                  {{ scope.row.courseTeacher }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="160px" fixed="right">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteCourse(scope.row)">删除</el-button>
                  <el-checkbox style="margin-left: 10px" type="" v-model="scope.row.selected"
                               @change="updateCourse(scope.row)">选课
                  </el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 30px;float: right">
            <el-button style="margin-right: 20px" type="primary">保存仓库</el-button>
            <el-button style="margin-right: 20px" type="danger">清空仓库</el-button>
          </div>
        </el-aside>
        <el-main>
          <el-table border
                    :key="componentKey"
                    :data="classTableData"
                    :span-method="cellSpanMethod"
                    :cell-style="getCellStyle">
            <!--                    @cell-click="selectCell"-->
            <el-table-column label="时间" width="80px" align="center">
              <template slot-scope="scope">
                第{{ scope.$index + 1 }}节
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
      componentKey: 0,
      tmp: [],
      classTableData: [],
      selected: [],
      cellStyles: [],
      flag: false,
      cnt: 0,
      department: '',
      search: '',
      inPlan: false,
      noConflict: false,
      selectedCourses: [{
        courseID: 'BE1030K',
        courseName: '软件体系结构原理与实践',
        courseCredit: 4,
        courseProp: '必修',
        selected: false,
        courseTeacher: 'wangsp',
        cells: [{
          startRow: 0,
          endRow: 1,
          column: 1,
          place: '理四-534'
        }, {
          startRow: 0,
          endRow: 1,
          column: 3,
          place: '理四-201'
        }]
      }, {
        courseID: 'BE1030K',
        courseName: '软件工程',
        courseCredit: 4,
        courseProp: '必修',
        courseTeacher: 'yangc',
        selected: false,
        cells: [{
          startRow: 2,
          endRow: 3,
          column: 2
        }, {
          startRow: 5,
          endRow: 6,
          column: 4
        }]
      }],
      results: [{
        courseName: '软件工程',
        courseID: 'BE1030K',
        credit: '4',
        category: '必修',
        tableData: [{
          courseTeacher: 'yangc',
          courseTime: '周二上午3,4; 周四下午6,7',
          courseAddress: '理四530; 理四420'
        }]
      }, {
        courseName: '软件体系结构原理与实践',
        courseID: 'BE1030K',
        credit: '4',
        category: '必修',
        tableData: [{
          courseTeacher: 'wangsp',
          courseTime: '周一上午1,2; 周三上午1,2',
          courseAddress: '理四530; 理四420'
        }]
      }]
    }
  },
  methods: {
    setTimeTable(row) {
      for (var i in row.cells) {
        let cell = row.cells[i]
        for (var r = cell.startRow; r <= cell.endRow; r++) {
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
      this.componentKey = (this.componentKey + 1) % 10
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
      this.componentKey = (this.componentKey + 1) % 10
    },
    getCellStyle({row, column, rowIndex, columnIndex}) {
      row.index = rowIndex
      column.index = columnIndex
      let color = 'transparent'
      if (this.cellStyles[rowIndex][columnIndex] === 1) {
        color = '#d4edc9';
      }
      return 'background:' + color;
    },
    clearSelect() {
      for (let i = 0; i <= 12; ++i) {
        for (let j = 0; j <= 7; ++j) {
          this.cellStyles[i][j] = 0
        }
      }
      this.componentKey = (this.componentKey + 1) % 10
    },
    submit(index) {
      console.log(index)
    },
    updateCourse(row) {
      if (row.selected) {
        for (const idx in row.cells) {
          let cell = row.cells[idx]
          console.log(cell)
          for (let i = cell.startRow; i <= cell.endRow; ++i) {
            this.classTableData[i].data[cell.column - 1] = row.courseName + '<br/>' + row.courseTeacher + '<br/>' + cell.place
          }
        }
      } else {
        for (const idx in row.cells) {
          let cell = row.cells[idx]
          for (let i = cell.startRow; i <= cell.endRow; ++i) {
            this.classTableData[i].data[cell.column - 1] = ''
          }
        }
      }
      this.componentKey = (this.componentKey + 1) % 10
    },
    cellSpanMethod({rowIndex, columnIndex}) {
      if (columnIndex === 0) return [1, 1]
      if (this.classTableData[rowIndex].data[columnIndex - 1]) {
        if (rowIndex >= 1 && this.classTableData[rowIndex - 1].data[columnIndex - 1] === this.classTableData[rowIndex].data[columnIndex - 1]) {
          return [0, 0]
        } else {
          if (rowIndex <= 10 && this.classTableData[rowIndex].data[columnIndex - 1] === this.classTableData[rowIndex + 2].data[columnIndex - 1]) {
            return [3, 1]
          } else {
            return [2, 1]
          }
        }
      } else {
        return [1, 1]
      }
    },
  },
  created() {
    for (let i = 0; i <= 12; ++i) {
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
