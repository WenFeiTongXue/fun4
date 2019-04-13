<template>
  <section>
    <div id="banner">
      <el-carousel :interval="3000" type="card" height="336px">
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
          <div class="listImg">
            <a href="javascript:;">
              <img :src="item.pic" alt srcset>
              <p>{{item.name}}</p>
            </a>
          </div>
          <div class="mask">
            <a href="javascript:;" @click="geiListId">
              <img src="img/cover_play.png" alt :data-list-id="item.id">
            </a>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <audio id="player" src controls></audio>
      <button @click="nextM">下一首</button>
      <ul>
        <li v-for="(l,i) of name_list" :key="i">
          <a href="javascript:;" @click="playMusic(i)">{{l}}</a>
        </li>
      </ul>
    </div>
  </section>
</template>
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
      songlist: [],
      swiperOption: {
        slidesPerView: 5,
        slidesPerColumn: 2,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      play_list: [],
      url_list: [],
      name_list:[],
      star_url: 0
    };
  },
  methods: {
    playMusic(n) {
      if(n){
        this.star_url=n
      }
      var player = document.getElementById("player");
      player.autoplay = true;
      player.src = this.url_list[this.star_url];
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
          this.play_list = result.data.data.songs;
          for (let i of this.play_list) {
            this.url_list.push(i.url);
            this.name_list.push(i.name)
          }
          this.playMusic();
        });
    },
    nextM(){
      this.star_url++
      this.playMusic();
    }
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
  width: 1460px;
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
}
.listImg img {
  width: 100%;
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
}
.mask:hover {
  opacity: 0.4;
}

section {
  /* width:1000px; */
  margin: 0 auto;
  text-align: center;
}
#banner {
  width: 1460px;
  margin: 0 auto;
}
</style>
