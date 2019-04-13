<template>
  <div id="d1">
    <input type="text" name="song_name" v-model="song_name">
    <select name="search_type" id="" v-model="search_type">
      <option value="song">歌曲</option>
      <option value="album">专辑</option>
      <option value="list">歌单</option>
      <option value="mv">MV</option>
      <option value="artist">歌手</option>
      <option value="lrc">歌词</option>
    </select>
    <button @click="test()">搜索</button>
    <table>
      <tr>
        <td>图片</td>
        <td>歌名</td>
        <td>歌手</td>
        <td>播放</td>
      </tr>
      <tr v-for="s of song_list" :key="s.id">
        <td><img :src="s.pic" alt=""></td>
        <td>{{s.name}}</td>
        <td>{{s.singer}}</td>
        <td>
          <audio :src="s.url" controls preload="metadata"></audio>
        </td>
      </tr>
    </table>
    <hr>
    <button @click="test2">歌单(跨域问题)</button>
    <hr>
    <button @click="test3">热门歌单</button>
    <hr>
    <input type="text" v-model="list_id">
    <button @click="test4">歌单详情</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      song_name:"",
      search_type:"song",
      offset:0,
      limit:100,
      list_id:0,
      song_list:[]
    }
  },methods:{
    test4(){
      this.axios.get("https://api.itooi.cn/music/tencent/songList",{
        params:{
          key:579621905,
          id:this.list_id
        }
      }).then(result=>{
        console.log(result.data.data.songs)
      })
    },
    test3(){
      this.axios.get("https://api.itooi.cn/music/tencent/hotSongList?key=579621905&categoryId=10000000&sortId=3&limit=60",{
        params:{
          // key:579621905,
        }
      }).then(result=>{
        console.log(result.data.data)
      })
    },
    test2(){
      this.axios.get("https://api.itooi.cn/music/tencent/songListCategory",{
        params:{
          key:579621905,
        }
      }).then(result=>{
        console.log(result.data)
      })
    },
    test(){
      this.axios.get("https://api.itooi.cn/music/tencent/search",{
        params:{
          key:579621905,
          s:this.song_name,
          type:this.search_type
        }
      }).then(result=>{
        console.log(result.data)
        this.song_list=result.data.data
        console.log(this.song_list)
      })
    }
  }
}
</script>
<style scoped>
#d1{
  text-align: center; 
}
</style>
