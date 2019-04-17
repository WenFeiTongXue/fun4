<template>
  <div id="app">
    <my-header></my-header>
    <router-view @listenson="showson" @listenadd="addsong"/>
    <!-- <div id="playerbox">
      <button @click="playerShow">隐藏</button>
      <div :class="`${player_box.addStyle?'playerShow':''}`">
        <audio id="player" src controls Volume=".5" ref="player" @ended="nextM"></audio>
        <span>{{play_list[playnum].name}}</span>
        <button @click="prevM">上一首</button>
        <button @click="nextM">下一首</button>
      </div>
    </div> -->
    <aplayer :audio="audio" :lrcType="3" fixed autoplay ref="aplayer"/>
    <ul id="playlistbox" :class="`${play_list_box.addStyle?'boxShow':''}`">
      <li v-for="(l,i) of play_list" :key="i" :class="`${i==playnum?'chose':''}`">
        <a href="javascript:;" @click="playMusic(i)">{{l.name}}</a>
        <a href="javascript:;" @click="delsong(i)" class="rt">&times;</a>
      </li>
    </ul>
    <footer></footer>
  </div>
</template>
<script>
import myHeader from "@/components/header.vue";
export default {
  data() {
    return {
      play_list: [
        {uname:""}
      ],
      audio:[],
      playnum: 0,
      play_list_box: {
        addStyle: false
      },
      player_box: {
        addStyle: false
      }
    };
  },
  methods: {
    playerShow(e) {
      if (this.player_box.addStyle == false) {
        this.player_box.addStyle = true;
        e.target.innerHTML = "显示";
      } else {
        this.player_box.addStyle = false;
        e.target.innerHTML = "隐藏";
      }
    },
    delsong(i) {
      this.play_list.splice(i, 1);
      if (i == this.playnum) {
        this.playMusic(i);
      }
    },
    addsong(data) {
      // console.log(this.play_list);
        data.artist=data.singer
        data.cover=data.pic
      console.log(data)
      this.audio.unshift(data);
      this.$refs.aplayer.switch(0)
      // this.play_list.unshift(data);
      // this.playnum = 0;
      // console.log(this.play_list)
      // this.playMusic();
    },
    showson(data) {
      console.log(data);
      this.play_list = data.songs;
      for(var i of this.play_list){
        i.artist=i.singer
        i.cover=i.pic
      }
      this.audio=this.play_list
      console.log(this.play_list)
      // this.playMusic();
    },
    // playMusic(n) {
    //   if (n) {
    //     this.playnum = n;
    //   }
    //   var player = document.getElementById("player");
    //   player.autoplay = true;
    //   player.src = this.play_list[this.playnum].url;
    //   console.log(this.$refs.player);
    //   console.log(this.playnum);
    //   this.play_list_box.addStyle = true;
    // },

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
    nextM() {
      if (this.playnum == this.play_list.length - 1) {
        this.playnum = 0;
      } else {
        this.playnum++;
      }
      this.playMusic();
    },
    prevM() {
      if (this.playnum != 0) {
        this.playnum--;
        this.playMusic();
      }
    }
  },
  components: {
    myHeader
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-size: 14px;
  color: #000;
}
a {
  text-decoration: none;
  color: #000;
}
footer {
  height: 100px;
}
.chose {
  font-weight: bold;
}
#playerbox {
  /* width:1200px; */
  background: #b7e3f3;
  position: fixed;
  left: 351.5px;
  bottom: 0;
  height: 56px;
  overflow: hidden;
  z-index: 100;
  display: flex;
  /* opacity: 0; */
}
#playerbox > div:nth-child(2) {
  transition: all 0.3s;
}
.playerShow {
  margin-top: 56px;
}
#player {
  position: relative;
}
#playlistbox {
  background: #b7e3f3;
  width: 300px;
  height: 500px;
  position: fixed;
  top: 100px;
  right: 20px;
  overflow: auto;
  opacity: 0;
  transition: all 0.3s;
}
#playlistbox a {
  color: #888;
}
#playlistbox.boxShow {
  opacity: 1;
}
.rt {
  float: right;
}
</style>
