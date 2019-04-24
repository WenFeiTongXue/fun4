<template>
  <div class="container">
    <div>
      <h1>分 类 查 询</h1>
        <div>
          <el-button size="small" data-code="-1" @click="getList(-1,0)">
            全部
          </el-button>
          <el-button size="small" data-code="0" @click="getList(0,0)">
            专辑
          </el-button>
          <el-button size="small" data-code="11" @click="getList(11,0)">
            EP
          </el-button>
          <el-button size="small" data-code="10" @click="getList(10,0)">
            single
          </el-button>
          <el-button size="small" data-code="1" @click="getList(1,0)">
            演唱会
          </el-button>
          <el-button size="small" data-code="3" @click="getList(3,0)">
            动漫
          </el-button>
          <el-button size="small" data-code="4" @click="getList(4,0)">
            游戏
          </el-button>
          
        </div>
      <h1>热 门 专 辑</h1>
      <div class="cds">
        <div v-for="(item,i) of hot_list" :key="i" class="cd">
          <router-link :to="`/album_detail\/${item.album_mid}`" class="mask">
            <img src="img/coverall.png" alt srcset>
          </router-link>
          <a href="javascript:;">
            <img
              :src="`http://y.gtimg.cn/music/photo_new/T002R150x150M000${item.album_mid}.jpg?max_age=2592000`"
              alt
              srcset
            >
          </a>
          <p>{{item.album_name}}</p>
        </div>
      </div>
      <div class="rt">
        <el-button @click="prevP()">上一页</el-button>
        <el-button @click="nextP()">下一页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type:-1,
      hot_list:[],
      page:0
    };
  },
  methods: {
    prevP(){
      if(this.page>0)
      this.page--
      this.getList(this.type,this.page)
    },
    nextP(){
      this.page++
      this.getList(this.type,this.page)
    },
    getList(type,page){
      if(page){
        this.page=page;
      }else{
        this.page=0
      }
      this.type=type;
      var url =
        "https://c.y.qq.com/v8/fcg-bin/album_library?g_tk=1278911659&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cmd=firstpage&page="+this.page+"&pagesize=20&sort=1&language=-1&genre=0&year=1&pay=0&type="+this.type+"&company=-1";
      $.ajax({
        url,
        type: "get",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        scriptCharset: "GBK"
      }).then(result => {
        console.log(result.data)
        console.log(result.data.albumlist)
        this.hot_list=result.data.albumlist;
      });
    }
  },
  created() {
// 1: {id: "0", name: "专辑"}
// 2: {id: "11", name: "EP"}
// 3: {id: "10", name: "Single"}
// 4: {id: "1", name: "演唱会"}
// 5: {id: "3", name: "动漫"}
// 6: {id: "4", name: "游戏"}
    this.getList(-1);
  }
};
</script>
<style scoped>
.cd {
  position: relative;
  width: 200px;
  height:250px;
  margin: 5px 20px;
}
.cd > p {
  width: 160px;
  text-align: center;
}
.mask img {
  height: 150px;
  position: absolute;
}
.cds {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
