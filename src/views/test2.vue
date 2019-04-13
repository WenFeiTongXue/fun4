<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="img/banner1.png">
      </swiper-slide>
      <swiper-slide>
        <img src="img/banner2.png">
      </swiper-slide>
      <swiper-slide>
        <img src="img/banner3.png">
      </swiper-slide>
      <swiper-slide>
        <img src="img/banner4.png">
      </swiper-slide>
    </swiper>
    <!--以下看需要添加-->
    <div class="swiper-scrollbar"></div>//滚动条
    <div class="swiper-button-next"></div>//下一项
    <div class="swiper-button-prev"></div>//上一项
    <div class="swiper-pagination"></div>//标页码
    <hr>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <!-- <h3>{{ item }}</h3> -->
        <img :src="item" alt="" srcset="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        //swiper3
        autoplay: 3000,
        speed: 1000
      },
      imgs:["img/banner1.png","img/banner2.png","img/banner3.png","img/banner4.png"]
    };
  }
};
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  
  .el-carousel img{
    width:100%;
    height:100%
  }
</style>
