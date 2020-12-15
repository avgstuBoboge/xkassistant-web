<template>
  <div class="fill" ref="wrap" :style="{backgroundImage: backgroundFile}">

  </div>
</template>

<script>
export default {
  name: "StartPage",
  data() {
    return {
      backgroundFile: `url("${require('@/assets/Katou Megumi.jpg')}")`
    }
  },
  methods: {
    fix() {
      this.$refs.wrap.style.width = window.innerWidth + 'px'
      this.$refs.wrap.style.height = window.innerHeight + 'px'
    }
  },
  mounted() {
    this.fix()
    window.onresize = this.fix
  }
}
</script>

<style scoped>
.fill {
  background-repeat: no-repeat;
  background-size: 100% 125%;
  filter: brightness(40%);
}
</style>