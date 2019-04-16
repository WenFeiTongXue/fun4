<template>
  <div id="app">
    <my-header></my-header>
    <router-view @listenson="showson" @listenadd="addsong"/>
    <div id="playerbox">
      <audio id="player" src controls Volume=".5" ref="player" @ended="nextM"></audio>  
      <span>{{play_list.name_list[play_list.star_url]}}</span>
      <button @click="prevM">上一首</button>
      <button @click="nextM">下一首</button>
    </div>
    <ul>
        <li v-for="(l,i) of play_list.name_list" :key="i" :class="`${i==play_list.star_url?'chose':''}`">
          <a href="javascript:;" @click="playMusic(i)">{{l}}</a>
        </li>
      </ul>
  </div>
</template>
<script>
import myHeader from "@/components/header.vue"
export default {
  data(){return {
    play_list:{//播放列表详情,各列表中属性一一对应
      url_list: [],//歌曲url列表
      name_list:[],//歌曲名称列表
      pic_list:[],//图片列表
      singer_list:[],//歌手列表
      time_list:[],//时间列表
      star_url: 0,//起始播放歌曲下标
    }
  }},
  methods:{
    addsong(data){
      console.log(data)
      console.log(this.play_list)
        this.play_list.url_list.unshift(data.url)
        this.play_list.name_list.unshift(data.name)
        this.play_list.pic_list.unshift(data.pic)
        this.play_list.singer_list.unshift(data.singer)
        this.play_list.time_list.unshift(data.time)
      // console.log(this.play_list)
      this.playMusic();
    },
    showson(data){
      console.log(data)
      this.play_list.url_list=[];
      this.play_list.name_list=[];
      this.play_list.pic_list=[];
      this.play_list.singer_list=[];
      this.play_list.time_list=[];
      this.play_list.star_url=0
      for(let i of data.songs){
        this.play_list.url_list.push(i.url)
        this.play_list.name_list.push(i.name)
        this.play_list.pic_list.push(i.pic)
        this.play_list.singer_list.push(i.singer)
        this.play_list.time_list.push(i.time)
      }
      this.playMusic()
    }
    ,
    playMusic(n) {
      if(n){
        this.play_list.star_url=n
      }
      var player = document.getElementById("player");
      player.autoplay = true;
      player.src = this.play_list.url_list[this.play_list.star_url];
      console.log(this.$refs.player)
      console.log(this.play_list.star_url)
    },
    
    // geiListId(e) {
    //   var id = e.target.dataset.listId;
    //   this.axios
    //     .get("https://api.itooi.cn/music/tencent/songList", {
    //       params: {
    //         key: 579621905,
    //         id
    //       }
    //     })
    //     .then(result => {
    //       this.play_list = result.data.data.songs;
    //       console.log(this.play_list)
    //       //重置播放列表中的内容
    //       this.url_list=[];
    //       this.name_list=[]
    //       for (let i of this.play_list) {
    //         this.url_list.push(i.url);
    //         this.name_list.push(i.name)
    //       }
    //       this.playMusic();
    //     });
    // },
    nextM(){
      if(this.play_list.star_url==this.play_list.url_list.length-1){
        this.play_list.star_url=0
      }else{
        this.play_list.star_url++
      }
      this.playMusic();
    },
    prevM(){
      if(this.play_list.star_url!=0){
        this.play_list.star_url--
        this.playMusic()
      }
    }
  },
  components:{
    myHeader
  }
}
</script>

<style>
*{
  margin:0;padding:0;
}
body{
  font-size:14px;
  color:#000;
}
a{
  text-decoration: none;
  color:#000;
}
.chose{
  font-weight:bold;
}
#playerbox{
  width:1200px;
  background:#b7e3f3;
  position:fixed;
  left: 351.5px;
  bottom:0;
  /* opacity: 0; */
}
#player{
  position:relative;
}

</style>
