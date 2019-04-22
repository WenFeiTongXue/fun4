<template>
  <div>
    <div class="container">
      <h1>
        <router-link to="/singer">
          <i class="el-icon-back"></i>
        </router-link>
        {{singerdetail.singer_name}}
      </h1>
      <div id="singerdetail">
        <div>
          <img
            :src="`http://y.gtimg.cn/music/photo_new/T001R300x300M000${sid}.jpg?max_age=2592000`"
          >
          <h3>{{singerdetail.singer_name}}</h3>
          <h3>歌曲总计：{{singerdetail.total}}</h3>
        </div>
        <div>
          <h3>热门专辑</h3>
          <!-- <swiper :options="swiperOption">
        <swiper-slide v-for="(item,i) of albumlist" :key="i">
          <div class="listImg">
            <a href="javascript:;">
              <img  :src="`http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.musicData.albummid}.jpg?max_age=2592000`" alt srcset >
            </a>
          </div>
          <p>{{item.musicData.albumname}}</p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper> -->
      
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sid"],
  data() {
    return {
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
      singerdetail: [],
      albumlist: []
    };
  },
  created() {
    var url =
      "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&singermid=" +
      this.sid +
      "&order=listen&begin=0&num=30&songstatus=1";
    $.ajax({
      url,
      type: "get",
      dataType: "jsonp",
      jsonp: "jsonpCallback",
      scriptCharset: "GBK"
    }).then(data => {
      console.log(data);
      this.singerdetail = data.data;
      console.log(this.singerdetail);
      this.albumlist = data.data.list;
      console.log(this.albumlist);
    });
  }
};
</script>
<style scoped>
  .swiper-container {
    height: auto!important;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    height: 200px;
  }
#singerdetail {
  margin-top: 20px;
  display: flex;
}
#singerdetail > div:first-child img {
  border-radius: 50%;
  margin-right: 50px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
