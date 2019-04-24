<template>
  <div>
    <div class="container">
      <h1>专辑详情</h1>
      <div class="cdimg lf">
          <img src="https://y.gtimg.cn/mediastyle/yqq/img/album_cover.png?max_age=2592000&v=38b0c07edbf02967081562b016d3ef14" alt="" class="mask">
          <img
            :src="`http://y.gtimg.cn/music/photo_new/T002R300x300M000${aid}.jpg?max_age=2592000`"
          >
      </div>
      <div class="cddes lf">
        <h1>《{{cddetail.name}}》</h1>
        <h2><i class="el-icon-service"></i>{{cddetail.singername}}</h2>
        <h3>共计：{{cddetail.total}}首</h3>
        <h3>专辑名称:{{cddetail.name}}</h3>
        <h3>发行时间:{{cddetail.aDate}}</h3>
        <h3>唱片公司:{{cddetail.company}}</h3>
        <h3>歌曲分类:{{cddetail.genre}}</h3>
        <h3>专辑评分：<el-rate v-model="value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate></h3>
      </div>
      <dir class="cdlist lf">
        <table>
          <tr>
            <td>序号</td>
            <td>歌名</td>
            <td>播放</td>
          </tr>
          <tr v-for="(s,i) of show_list" :key="i"  :class="`${i%2==0?'colbg':''}`">
            <td>{{i+1}}</td>
            <td>{{s.songname}}</td>
            <td><a href="javascript:" :data-id="`${s.songmid}`" @click="addplay">播放</a></td>
          </tr>
        </table>
        <div class="rt">
          <el-pagination  
          @current-change="handleCurrentChange" 
       :current-page="currentPage" layout="prev ,pager , next" :total="songs.length" :page-size="10">
        </el-pagination>
        </div>
      </dir>
    </div>
    <div class="container">
      <h1>专辑详情:</h1>
      <pre>{{cddetail.desc}}</pre>
    </div>
  </div>
</template>
<script>
export default {
  props:["aid"],
  data(){return {
    value:'',
    cddetail:[],
    songs:[],
    currentPage: 1,
    totalpage: 0,
    show_list:[]
  }},
  methods:{
    //设置分页
    // 初始化渲染的数组
    initUsers : function(){
       this.show_list = this.songs.slice(0,10)
       console.log(this.show_list)
    },
    // 初始化总页数
    inittotalpage  : function(){
      this.totalpage = Math.ceil(this.songs.length/10)
    },
   // 改变页面 这时候数据也会改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.show_list = this.songs.slice((this.currentPage-1)*10,this.currentPage*10);
    },
    addplay(e) {
      //获取歌曲id
      var i = e.target.dataset.id;
      //通过歌曲id搜索歌曲对象
      this.axios
        .get("https://api.itooi.cn/music/tencent/song", {
          params: {
            key: 579621905,
            id: i
          }
        })
        .then(result => {
          //将获取的歌曲对象发送至父组件进行播放
          this.$emit("listenadd", result.data.data);
        });
    }
  },
  created(){
    console.log(this.aid)
    var url =
      "https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid="+this.aid+"&g_tk=1278911659&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0";
    $.ajax({
      url,
      type: "get",
      dataType: "jsonp",
      jsonp: "jsonpCallback",
      scriptCharset: "GBK"
    }).then(result => {
      console.log(result.data);
      this.cddetail=result.data
      this.songs=result.data.list
      console.log(this.songs)
      this.initUsers();
      this.inittotalpage();
    });
  }
}
</script>
<style scoped>
pre{
  white-space:pre-wrap;
  word-wrap:break-word;
}
.colbg{
  background:#eff6f9;
}
.cdlist>table td:nth-child(2){
  width:80%;
  text-align: left
}
.cdlist>table{
  width:100%;
  text-align: center;
}
.cdlist{
  width:500px;
  margin-left:10px;
}
.cddes h3{
  margin:10px;
}
.cddes{
  margin-left:60px;
  width:330px;
}
.mask{
  position:absolute;
  height:300px;
}
.cdimg{
  position:relative;
}
.lf{
  float: left;
}
h1{
  margin:20px 0;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.container::after{
  content:"";
  display:block;
  clear:both;
}
</style>
