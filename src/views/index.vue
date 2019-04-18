<template>
  <section>
    <div id="banner">
      <el-carousel :interval="3000" type="card" height="277px">
        <el-carousel-item v-for="item in banners" :key="item">
          <!-- <h3>{{ item }}</h3> -->
          <img :src="item" alt srcset>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h1>歌 单 推 荐</h1>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item of songlist" :key="item.id">
          
          <div class="mask">
            <a href="javascript:;" @click="geiListId">
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
  </section>
</template>
<script>
export default {
  data() {
    return {
      banners: [
        "img/index/109951163992121380.png",
        "img/index/109951163992654354.png",
        "img/index/109951163992897616.png",
        "img/index/109951163993441212.png",
        "img/index/109951163993759834.png"
      ],
      songlist: [],//推荐歌单列表
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
    toparent(data){
      this.$emit("listenson",data)
    },
    geiListId(e) {
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
    // 获取歌单列表
    this.axios
      .get(
        "https://api.itooi.cn/music/tencent/hotSongList?key=579621905&categoryId=10000000&sortId=3&limit=18"
      )
      .then(result => {
        this.songlist = result.data.data;
        console.log(this.songlist);
      });
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
  text-align: center;
}
#banner {
  width: 1200px;
  margin: 0 auto;
}
#banner img{
  width: 100%;
}
</style>
