<template>
  <div>
    <el-card shadow="never">
      <el-container style="height: 720px">
        <el-aside width="40%">
          search-part
        </el-aside>
        <el-main>
          <el-table border
                    :key="componentKey"
                    :data="tableData"
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
      tableData: [],
      selectedTime: [],
      cellStyles: [],
    }
  },
  methods: {
    selectCell(row, column) {
      if (column.index === 0) return
      if (this.cellStyles[row.index][column.index] === 0)
        this.cellStyles[row.index][column.index] = 1
      else
        this.cellStyles[row.index][column.index] = 0
      this.componentKey += 1
    },
    getCellStyle({row, column, rowIndex, columnIndex}) {
      row.index = rowIndex
      column.index = columnIndex
      let color = 'transparent'
      if (this.cellStyles[rowIndex][columnIndex] === 1) {
        color = '#d4edc9';
      }
      return 'background:' + color;
    }
  },
  created() {
    console.log(1 / 0)
    for (let i = 0; i <= 12; ++i) {
      this.tableData.push({})
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
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
