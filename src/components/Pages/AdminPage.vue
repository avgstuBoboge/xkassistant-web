<template>
  <div class="page-part">
    <div style="margin-left: auto;margin-right: auto;width: 60%">
      <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="kwords">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      kwords: '',
    }
  }
}
</script>

<style scoped>

</style>