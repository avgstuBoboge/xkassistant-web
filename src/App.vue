<template>
  <div style="margin-top: 20px">
    <PageNav></PageNav>
    <div class="page">
      <router-view></router-view>
      <PageFoot></PageFoot>
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
  }
}
</script>

<style>
.page {
  width: 100%;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
}
</style>
