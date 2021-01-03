<template>
  <div>
    <PageNav v-if="!isHomePage"></PageNav>
    <div class="page">
      <router-view></router-view>
      <PageFoot v-if="!isHomePage"></PageFoot>
    </div>
  </div>
</template>

<script>
import PageNav from "@/components/PageItems/PageNav";
import PageFoot from "@/components/PageItems/PageFoot";

export default {
  name: 'App',
  components: {
    PageFoot,
    PageNav
  },
  data() {
    return {}
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/'
    }
  },
  created() {
    console.log(this.$route)
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.page {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.page-part {
  width: 95%;
  min-height: 800px;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
}

.horizontal-center {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.vertical-center {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}

.center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-table__fixed-right {
  height: 100% !important;
}
</style>
