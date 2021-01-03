<template>
  <div class="fill">
    <div class="fill background" :style="{backgroundImage: backgroundFile}"/>
    <div class="wrap center" style="height: fit-content">
      <el-image class="logo horizontal-center" src="/logo.jpg"></el-image>
      <div class="content" style="border-top: 1px solid white; border-bottom: 1px solid white">
        <div class="word-wrap">
          <p style="font-size: 2.5rem">XK - assistant</p>
          <p style="font-size: 1.5rem">Show yourself</p>
        </div>
      </div>
      <div class="content button" style="border: 1px solid white;border-radius: 10px">
        <div class="word-wrap" @click="goMain">
          <p style="font-size: 3rem; margin: 20px 0">Get Start</p>
        </div>
      </div>
    </div>
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
    goMain() {
      if (this.$store.state.user.username)
        this.$router.push('/main')
      else
        this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.logo {
  border: 1px solid white;
  border-radius: 50%;
  margin-bottom: -3px;
}

.wrap {
  width: 25%;
}

.word-wrap {
  color: white;
  text-align: center;
}

.content {
  position: relative;
  margin-top: 5rem;
}

.content:before {
  content: '';
  position: absolute;
  display: block;
  left: 50%;
  top: -5rem;
  width: 1px;
  height: 5rem;
  background-color: white;
}

.button {
  cursor: pointer;
}

.button:hover {
  background-color: #ffffff33;
}

.fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background {
  background-repeat: no-repeat;
  background-size: 100% 125%;
  filter: brightness(40%);
  z-index: -1000;
}
</style>