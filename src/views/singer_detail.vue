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
          <div class="cds">
            <div v-for="(item,i) of albumlist.slice(0,8)" :key="i" class="cd">
              <a href="javascript:;" class="mask">
                <img src="img/coverall.png" alt srcset>
              </a>
              <a href="javascript:;">
                <img
                  :src="`http://y.gtimg.cn/music/photo_new/T002R150x150M000${item.musicData.albummid}.jpg?max_age=2592000`"
                  alt
                  srcset
                >
              </a>
              <p>{{item.musicData.albumname}}</p>
            </div>
          </div>
        </div>
        <div  id="showlist">
          <h3>全部歌曲</h3>
          <table cellpadding>
            <tr>
              <th>歌名</th>
              <th>歌手</th>
              <th>播放</th>
            </tr>
            <tr v-for="(t,i) of show_list" :key="i" :class="`${i%2==0?'colbg':''}`">
              <td>{{t.musicData.songname}}</td>
              <td>{{t.musicData.singer[0].name}}</td>
              <td>
                <a href="javascript:" :data-id="`${t.musicData.songmid}`" @click="addplay">播放</a>
              </td>
            </tr>
          </table>
          <div class="rt">
            <el-pagination
            :data="`${albumlist.slice((currentPage-1)*20,currentPage*20)}`"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev ,pager , next"
              :total="totalpage"
            ></el-pagination>
          </div>
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
      show_list: [],
      currentPage: 1,
      totalpage: 0,
      swiperOption: {
        slidesPerView: 5,
        slidesPerColumn: 2,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          clickable: true
        }
      },
      singerdetail: [],
      albumlist: []
    };
  },
  methods: {
    //设置分页
    // 初始化渲染的数组
    initUsers: function() {
      this.show_list = this.albumlist.slice(0, 19);
    },
    // 初始化总页数
    inittotalpage: function() {
      this.totalpage = Math.ceil(this.albumlist.length /2);
      console.log(this.totalpage);
    },
    // 改变页面 这时候数据也会改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.show_list = this.albumlist.slice(
        (this.currentPage - 1) * 20,
        this.currentPage * 20
      );
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
  created() {
    var url =
      "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&singermid=" +
      this.sid +
      "&order=listen&begin=0&num=1000&songstatus=1";
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
      this.initUsers();
      this.inittotalpage();
    });
  }
};
</script>
<style scoped>
.colbg{
  background:#eff6f9;
}
.rt{
  float:right;
}
#showlist{
  margin-top:50px;
  margin-left:340px;
  width:880px;
}
#showlist table{
  width:100%;
  text-align: center;
}
#showlist tr>td:first-child{
  width:55%
}
#showlist tr{
  height:30px;
}
.cd {
  position: relative;
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
  width: 870px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 400px;
}
#singerdetail {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
#singerdetail > div:first-child img {
  border-radius: 50%;
  margin-right: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
