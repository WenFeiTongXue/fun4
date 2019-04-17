<template>
  <header>
    <router-link to="/">
      <img src="img/fw1.png" alt id="logo">
    </router-link>
    <div>
      <el-input placeholder="请输入内容" v-model="kword" @keyup.13.native="search" width="400">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return { kword: "" };
  },
  methods: {
    search(e) {
      if(this.kword.trim()!==""){
        this.$router.push(`/search/${this.kword}`);
      }
    }
  },
  created() {
    if (this.kword.trim() !== "") this.kword = this.$route.params.kword;
  }
};
</script>
<style scoped>
header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
#logo {
  width: 180px;
}
</style>
