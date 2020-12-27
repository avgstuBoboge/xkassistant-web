<template>
  <div class="page-part">
    <el-input placeholder="请输入课程名" v-model="kwords" class="input-with-select horizontal-center" style="width: 60%">
      <el-select v-model="yearInterval" slot="prepend" placeholder="所有学年" style="width: 150px"
                 clearable>
        <template v-for="i in 10">
          <el-option v-bind:key="i" :label="(nowYear-i+1).toString() + '-' + (nowYear-i+2).toString()"
                     :value="i"></el-option>
        </template>
      </el-select>
      <el-select v-model="semester" slot="prepend" placeholder="所有学期" style="width: 150px;margin-left: 10px"
                 clearable>
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div class="horizontal-center" style="margin-top:20px;width: 60%;font-size: 18px">
      <a>课程性质:</a>
      <el-checkbox style="margin-left: 30px;margin-right: 0"></el-checkbox>
      <a style="margin-left: 10px">必修</a>
      <el-checkbox style="margin-left: 30px;margin-right: 0"></el-checkbox>
      <a style="margin-left: 10px">限选</a>
      <el-checkbox style="margin-left: 30px;margin-right: 0"></el-checkbox>
      <a style="margin-left: 10px">公选</a>
      <a style="margin-left: 25%">课程标签:</a>
      <el-checkbox style="margin-left: 30px;margin-right: 0"></el-checkbox>
      <a style="margin-left: 10px">体育课</a>
      <el-checkbox style="margin-left: 30px;margin-right: 0"></el-checkbox>
      <a style="margin-left: 10px">英语拓展课</a>
      <el-checkbox style="margin-left: 30px;margin-right: 0"></el-checkbox>
      <a style="margin-left: 10px">未通过课程</a>
    </div>
    <el-table style="margin-right: auto;margin-left: auto;width: 60%">
      <template v-for="pair in titles">

      </template>
    </el-table>
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
      titles: [{
        title: '学年',
        prop: 'yearInterval'
      }],
      courseTableData: [],
      nowYear: new Date().getFullYear(),
    }
  }
}
</script>

<style scoped>

</style>