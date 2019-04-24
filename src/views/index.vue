<template>
  <section>
    <div>
    <div id="banner">
      <el-carousel :interval="3000" type="card" height="240px">
        <el-carousel-item v-for="item in banners" :key="item.i">
          <!-- <h3>{{ item }}</h3> -->
          <img :src="item.picUrl" alt srcset>
        </el-carousel-item>
      </el-carousel>
    </div>
    </div>
    <div>
      <h1>最 新 音 乐</h1>
      <div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,i) of newsongTJ" :key="i">
            <div class="mask">
              <a href="javascript:;" @click="addplay">
                <img src="img/cover_play.png" alt :data-list-id="item.data.songmid">
              </a>
            </div>
            <div class="listImg">
              <a href="javascript:;">
                <img :src="`https://api.itooi.cn/music/tencent/pic?key=579621905&id=${item.data.songmid}`" alt srcset>
              </a>
            </div>
            <p>{{item.data.albumname}}</p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div> 
      <h1>歌 单 推 荐</h1>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item of songlist" :key="item.id">
          <div class="mask">
            <a href="javascript:;" @click="geiList">
              <img src="img/cover_play.png" alt :data-list-id="item.id">
            </a>
          </div>
          <div class="listImg">
            <a href="javascript:;">
              <img :src="item.pic" alt srcset>
            </a>
          </div>
          <p>{{item.name}}</p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      banners: [],
      songlist: [],//推荐歌单列表
      newsonglist:[],//最新音乐
      newsongTJ:[],
      swiperOption: {
        slidesPerView: 5,
        slidesPerColumn: 2,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
    };
  },
  methods: {
    addplay(e){
      var i=e.target.dataset.listId
      this.getSong(i)
    },
    newsong(){//获取最新音乐
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
      $.ajax({
        url:url,
        type:"get",
        dataType:'jsonp',
        jsonp: "jsonpCallback",
        scriptCharset: 'GBK',//解决中文乱码
        }
      ).then(data=>{
        //获取数据
          console.log(data)
          // 最新音乐数据
          console.log(data.songlist)
          this.newsonglist=data.songlist
          // 首页推荐值取前20
          this.newsongTJ=this.newsonglist.splice(0,20)
      })
    },
    toparent(data){
      this.$emit("listenson",data)
    },
    getSong(i){
      this.axios
        .get("https://api.itooi.cn/music/tencent/song", {
          params: {
            key: 579621905,
            id:i
          }
        })
        .then(result => {
          this.$emit("listenadd",result.data.data)
        });
    },
    geiList(e) {//获取歌单内歌曲列表
      var id = e.target.dataset.listId;
      this.axios
        .get("https://api.itooi.cn/music/tencent/songList", {
          params: {
            key: 579621905,
            id
          }
        })
        .then(result => {
          this.toparent(result.data.data)
        });
    },
  },
  created() {
    //获取轮播图片
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    $.ajax({
      url:url,
      type:"get",
      dataType:'jsonp',
      jsonp: "jsonpCallback",
      scriptCharset: 'GBK',//解决中文乱码
    }).then(data=>{
        //获取数据
        console.log(data.data)
        this.banners=data.data.slider
        console.log(this.banners);
    })
    //获取推荐新歌
    this.newsong()
    // 获取推荐歌单
    this.axios
      .get(
        "https://api.itooi.cn/music/tencent/hotSongList?key=579621905&categoryId=10000000&sortId=3&limit=19"
      )
      .then(result => {
        this.songlist = result.data.data;
      })
  }
};
</script>
<style scoped>
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
  border-radius: 10%;
  border:1px solid #ddd;
}
.listImg img {
  width: 100%;
  transition:all .5s
}
.mask {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #000;
  opacity: 0;
  top: 0;
  left: 50%;
  margin-left: -100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  z-index: 100;
  border-radius: 10%;
}
.mask:hover {
  opacity: 0.4;
}
.mask:hover+div img{
  transform: scale(1.1)
}

section {
  /* width:1000px; */
  margin: 0 auto;
  /* text-align: center; */
}
#banner {
  width: 1200px;
  margin: 0 auto;
}
.el-carousel__item img {
    width:100%;
    /* height:300px; */
}
h1{
  width:1200px;
  font:30px poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
  /* background:#b7e3f3; */
  padding:20px 0;
  margin:0 auto;
  color:#888;
}
section>div:not(:first-child){
  background-image:linear-gradient(#f9fcfd,#fff)
}
</style>
