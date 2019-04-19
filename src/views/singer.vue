<template>
  <div>
    <div class="container">
      
      <input type="text" v-model="sname">
      <button @click="getsinger">查找</button>
      <div>
        
        <el-tag v-for="(c,i) of first_code" :key="i"><a href="javascript:;">{{c}}</a></el-tag>
        <!-- <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag> -->
      </div>
      <div>
      <h1>热 门 歌 手</h1>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,i) of singer_detai" :key="i">
          <div class="mask">
            <a href="javascript:;">
              
            </a>
          </div>
          <div class="listImg">
            <a href="javascript:;">
              <img
                :src="`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`"
                alt
                srcset
              >
            </a>
          </div>
          <p>{{item.Fsinger_name}}</p>
        </swiper-slide>
      </swiper>
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
          clickable: true
        }
      },
      sname: "",
      // stype:""
      singer_detai: []
    };
  },
  methods: {
    getsinger() {
      this.axios
        .get("http://127.0.0.1:3000/singer", {
          params: {
            sname: this.sname
          }
        })
        .then(result => {
          console.log(result.data);
        });
    }
  },
  created() {
    //创建首字母数组
    for(let i=65;i<=90;i++){
      let j=unescape("%u00"+i.toString(16))//
      this.first_code.push(j)
    }
      console.log(this.first_code[0])
    // 热度歌手排行
    this.axios.get("http://127.0.0.1:3000/singer").then(result => {
      console.log(result.data);
      this.singer_detai = result.data.msg;
    });
  }
};
</script>
<style scoped>
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
.swiper-slide>div{
  border-radius:50%;
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
  opacity: 0.4;
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
  opacity: 0;
}
.mask:hover+div img{
  transform: scale(1.1)
}
.container{
  width:1200px;
  margin:0 auto;
}
</style>
