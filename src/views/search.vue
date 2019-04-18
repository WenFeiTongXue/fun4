<template>
<div>
  <div class="container">
    <div>
      <el-input placeholder="请输入内容"  v-model="params.kw" @keyup.13.native="search">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
    </div>
    <div>
      <table cellpadding>
        <tr>
          <th>歌名</th>
          <th>歌手</th>
          <th>时长</th>
          <th>播放</th>
        </tr>
        <tr v-for="(item,i) of tableData" :key="i" :class="`${i%2==0?'colbg':''}`">
          <td>{{item.name}}</td>
          <td>{{item.singer}}</td>
          <td>{{item.time}}</td>
          <td><a href="javascript:" :data-i="i" @click="addplay">播放</a></td>
        </tr>
      </table>
      <div>
        <el-button @click="prevP">上一页</el-button>
        <el-button @click="nextP">下一页</el-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  props: ["s"],
  data() {
    return {
      params: {
        key: 579621905,
        kw:"",
        type: "song",
        limit: 20,
        offset: 1
      },
       tableData:[]
    };
  },
  methods: {
    nextP(){
      this.params.offset++
      this.search()
    },
    prevP(){
      if(this.params.offset>1){
        this.params.offset--
        this.search()
      }
    },
    toparent(data){
      this.$emit("listenadd",data)
    },
    search() {
      // console.log(this.s)
      if(this.s.trim()!==""){
      this.axios
        .get("https://api.itooi.cn/music/tencent/search", {
          params: {
            key: this.params.key,
            s: this.params.kw,
            limit: this.params.limit,
            offset: this.params.offset
          }
        })
        .then(result => {
          console.log(result.data.data);
          this.tableData=result.data.data
        });
      }
    },
    addplay(e){
      var i=e.target.dataset.i
      console.log(i)
      this.toparent(this.tableData[i])
    }
  },
  created() {
    this.params.kw=this.s;
    this.search();
  },
  watch: {
    $route () {
      this.params.kw=this.s;
      this.search();
    }
  }
};
</script>
<style scoped>
.container{
  width:1200px;
  margin:0 auto;
}
.container>div:first-child{
  padding:60px 200px 60px 20px;
  background:url("../../public/img/search/bg_search.jpg")
}
table{
  width:1200px;
  color:#888
}
table a{
  color:#888
}
th{
  text-align: left;
}
tr{
  height:40px;
}

.colbg{
  background:#eff6f9;
}
header+div{
    background-image:linear-gradient(#f9fcfd,#fff)
}
</style>
