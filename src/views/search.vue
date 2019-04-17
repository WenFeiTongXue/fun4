<template>
  <div class="container">
    <div>
      <el-input placeholder="请输入内容" v-model="s" @keyup.13.native="search">
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
        // s:this.$route.query.s,
        type: "song",
        limit: 50,
        offset: 1
      },
       tableData:[]
    };
  },
  methods: {
    toparent(data){
      this.$emit("listenadd",data)
    },
    search() {
      // console.log(this.s)
      this.axios
        .get("https://api.itooi.cn/music/tencent/search", {
          params: {
            key: this.params.key,
            s: this.s,
            limit: this.params.limit,
            offset: this.params.offset
          }
        })
        .then(result => {
          console.log(result.data.data);
          this.tableData=result.data.data
        });
    },
    addplay(e){
      var i=e.target.dataset.i
      console.log(i)
      this.toparent(this.tableData[i])
    }
  },
  created() {
    this.search();
  },
  watch: {
    s() {
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
  background:#b7e3f3
}
</style>
