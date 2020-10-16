<template>
  <div>
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
            <el-checkbox v-model="inPlan">仅查看计划内课程</el-checkbox>
            <el-checkbox v-model="noConflict">仅查看未冲突课程</el-checkbox>
            <el-collapse style="margin-top: 10px">
              <template v-for="(item,index) in results">
                <el-collapse-item :title="item.courseName" :name="index" :key="index">
                  <el-table stripe
                            border
                            style="border-radius: 4px"
                            :data="item.tableData">
                    <el-table-column label="教师" align="center" width="100px">
                      <template slot-scope="scope">
                        <div v-html="scope.row.courseTeacher"></div>
                      </template>
                    </el-table-column>
                    <el-table-column label="时间" align="center">
                      <template slot-scope="scope">
                        <div v-html="scope.row.courseTime"></div>
                      </template>
                    </el-table-column>
                    <el-table-column label="地点" align="center">
                      <template slot-scope="scope">
                        <div v-html="scope.row.courseAddress"></div>
                      </template>
                    </el-table-column>
                    <el-table-column width="92px">
                      <template slot-scope="scope">
                        <el-button size="medium" type="primary" @click="submit(scope.$index)">
                          选课
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </template>
            </el-collapse>
          </div>
          <div style="margin-top: 20px;">
            <h3>
              已选课程
            </h3>
            <el-table style="margin-top: 20px"
                      :data="selectedCourses">
              <el-table-column label="课程" align="center" fixed="left">
                <template slot-scope="scope">
                  <div v-html="scope.row.courseName"></div>
                </template>
              </el-table-column>
              <el-table-column label="学分" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.courseCredit"></div>
                </template>
              </el-table-column>
              <el-table-column label="性质" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.courseProp"></div>
                </template>
              </el-table-column>
              <el-table-column label="教师" align="center">
                <template slot-scope="scope">
                  <div v-html="scope.row.courseTeacher"></div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="155px" fixed="right">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.quit">退选</el-checkbox>
                  <el-checkbox v-model="scope.row.lock">锁定</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 30px;float: right">
            <el-button style="margin-right: 20px" type="danger">退  选</el-button>
            <el-button style="margin-right: 20px" type="primary">重设退选</el-button>
            <el-button @click="clearSelect" style="margin-right: 20px">重设锁定</el-button>
          </div>
        </el-aside>
        <el-main>
          <el-table border
                    :key="componentKey"
                    :data="classTableData"
                    :cell-style="getCellStyle"
                    @cell-click="selectCell">
            <el-table-column label="时间" width="80px" align="center">
              <template slot-scope="scope">
                第{{ scope.$index + 1 }}节
              </template>
            </el-table-column>
            <el-table-column label="星期一" align="center">
            </el-table-column>
            <el-table-column label="星期二" align="center">
            </el-table-column>
            <el-table-column label="星期三" align="center">
            </el-table-column>
            <el-table-column label="星期四" align="center">
            </el-table-column>
            <el-table-column label="星期五" align="center">
            </el-table-column>
            <el-table-column label="星期六" align="center">
            </el-table-column>
            <el-table-column label="星期日" align="center">
            </el-table-column>
          </el-table>
          <div style="margin-top: 30px;float: right">
            <el-button style="margin-right: 20px" type="success">推送课表</el-button>
            <el-button style="margin-right: 20px" type="primary">搜索课程</el-button>
            <el-button @click="clearSelect" style="margin-right: 20px">重设选中</el-button>
          </div>
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
      selectedTime: [],
      cellStyles: [],
      flag: false,
      cnt: 0,
      department: '',
      search: '',
      inPlan: false,
      noConflict: false,
      selectedCourses: [{
        courseName: '软件工程',
        courseCredit: 4,
        courseProp: '必修',
        courseTeacher: '木长',
        quit: false,
        lock: false
      }],
      results: [{
        courseName: '软件工程',
        tableData: [{
          courseTeacher: '木长',
          courseTime: '周四9:00',
          courseAddress: '理四'
        }, {
          courseTeacher: '木长',
          courseTime: '周四9:00',
          courseAddress: '理四'
        }]
      }, {}, {}, {}, {}]
    }
  },
  methods: {
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
    }
  },
  created() {
    for (let i = 0; i <= 12; ++i) {
      this.classTableData.push({})
      let tmp = []
      for (let j = 0; j <= 7; ++j) {
        tmp.push(0)
      }
      this.cellStyles.push(tmp)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
