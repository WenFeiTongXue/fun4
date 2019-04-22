<template>
  <div>
    <div class="container">
      <div>
        <el-input type="text" v-model="sname" @keyup.13.native="getsinger">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="getsinger"></i>
        </el-input>
      </div>
      <!-- <button @click="getsinger">查找</button> -->
      <div>
      <h1>热 门 歌 手</h1>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,i) of singer_detai" :key="i">
            <a href="javascript:;"  @click="toSinger">
          <div class="mask" :data-sid="item.Fsinger_mid">
          </div>
            </a>
          <div class="listImg">
            <a href="javascript:;">
              <img  :src="`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`" alt srcset >
            </a>
          </div>
          <p>{{item.Fsinger_name}}</p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      </div>
      <div id="searchType">
        <h1>分 类 查 询</h1>
        <div>
          <el-button size="small" v-for="(c,i) of first_code" :key="i" :data-code="c" @click="Findex_search(c)">{{c}}</el-button>
        </div>
        <!-- <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag> -->
        <div id="showName">
          <span v-for="(item,i) of singer_total" :key="i"><a href="javascript:;" :data-sid="item.Fsinger_mid" @click="toSinger">{{item.Fsinger_name}}</a></span>
          </div>
          <div class="rt">
            <el-button @click="prevP()">上一页</el-button>
            <el-button @click="nextP()">下一页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_code:[],
      swiperOption: {
        slidesPerView: 5,
        slidesPerColumn: 2,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          type:"fraction",
          clickable: true
        }
      },
      sname: "",
      // stype:""
      singer_detai: [],//热门歌手详情
      singer_total:[],//搜索到符合要求的歌手
      page:1,//搜索歌手信息时传递的页数
      kw:"",//搜索歌手信息时传递的关键词
      search_type:""//搜索歌手的方式
    };
  },
  methods: {
    nextP(){
      console.log(this.singer_total.length)
      if(this.singer_total.length==50){
        this.page++;
        this.searchSinger(this.type,this.kw,this.page)
      }
    },
    prevP(){
      if(this.page>1){
        this.page--;
        this.searchSinger(this.type,this.kw,this.page)
      }
    },
    //首字母查询
    Findex_search(kw){
      this.search_type="Findex";
      this.searchSinger(this.search_type,kw,this.page)
    },
    // 查询歌手
    searchSinger(type,kw,page){
      if(!page){
        page=1;
      }
      this.kw=kw;
      this.axios.get("http://127.0.0.1:3000/singer/"+this.search_type,{
        params:{
          value:this.kw,
          page
        }
      }).then(result=>{
        // console.log(result.data.msg)
        this.singer_total=result.data.msg
        console.log(this.singer_total)
      })
    },
    toSinger(e){
      console.log(e.target.dataset)
      var sid=e.target.dataset.sid
      this.$router.push("/singer_detail/"+sid);
    },
    getsinger() {
      this.axios
        .get("http://127.0.0.1:3000/singer", {
          params: {
            sname: this.sname
          }
        })
        .then(result => {
          // console.log(result.data.msg[]);
          if(result.data.code=200){
            this.$router.push("/singer_detail/"+result.data.msg[0].Fsinger_mid)
          }else{
            this.$message.error('没找到对应歌手');
          }
        });
    }
  },
  created() {
    //创建首字母数组
    for(let i=65;i<=90;i++){
      let j=unescape("%u00"+i.toString(16))//
      this.first_code.push(j)
    }
    // 热度歌手排行
    this.axios.get("http://127.0.0.1:3000/singer").then(result => {
      console.log(result.data);
      this.singer_detai = result.data.msg;
    });
  }
};
</script>
<style scoped>
#showName{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
#showName>span{
  width:20%;
  text-align: center;
  height:50px;
  line-height: 50px;
}
#searchType>div{
  display: flex;
  /* justify-content: space-between; */
  flex-wrap:wrap;
}
#searchType>div .el-button{
  margin:5px 10px 0 5px;
}
header + div {
  background-image: linear-gradient(#f9fcfd, #fff);
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0;
}
.swiper-container {
  height: auto !important;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
}
.swiper-slide {
  height: 260px;
  text-align: center;
  position: relative;
}
.listImg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
}
.listImg img {
  width: 100%;
  transition:all .5s;
  border-radius:50%;
}
.mask {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #000;
  opacity: 0.4;
  top: 0;
  left: 50%;
  margin-left: -100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  border-radius:50%;
  z-index: 100;
}
.mask:hover {
  opacity: 0;
}
.mask:hover+div img{
  transform: scale(1.1)
}
.container{
  width:1200px;
  margin:0 auto;
}
.rt{
  float:right;
}
/* .el-input{
  padding:60px 200px 60px 20px;
  background:url(https://y.gtimg.cn/mediastyle/yqq/img/bg_singer.jpg);
} */
.container>div:first-child{
  padding:60px 200px;
  background:url(https://y.gtimg.cn/mediastyle/yqq/img/bg_singer.jpg);
}
</style>
