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
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal" router
      @select="handleSelect"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="2">歌手</el-menu-item>
      <el-menu-item index="3">专辑</el-menu-item>
      <el-menu-item index="/top">排行榜</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
export default {
  data() {
    return {
      kword: "" ,
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    },
    search(e) {
      if (this.kword.trim() !== "") {
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
  justify-content: space-between;
}
header>div:nth-child(2){
  width:400px;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color:#b7e3f3;
}
.el-menu.el-menu--horizontal{
  border:none;
}
.el-menu--horizontal>.el-menu-item.is-active{
  border-bottom:2px solid #b7e3f3;
}
.el-menu-item{
  font:18px poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif
}
#logo {
  width: 180px;
}
</style>
