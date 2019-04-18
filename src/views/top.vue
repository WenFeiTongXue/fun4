<template>
  <div class="center">
    <el-tabs tab-position="left" style="height: 700px;" @tab-click="topSearch">
    <el-tab-pane :label="t.topTitle" v-for="(t,i) of toplist" :key="i" :data-id="t.id">
      <div id="topimg">
        <img :src=t.picUrl alt="" srcset="" :data-id="t.id">
        <p>{{t.topTitle}}</p>
        <p>点击次数：{{t.listenCount}}</p>
      </div>
      <div>
        <table cellpadding id="showlist">
        <tr>
          <th>歌名</th>
          <th>歌手</th>
          <th>播放</th>
        </tr>
        <tr v-for="(t,i) of show_list" :key="i" :class="`${i%2==0?'colbg':''}`">
          <td>{{t.data.albumname}}</td>
          <td>{{t.data.singer[0].name}}</td>
          <td><a href="javascript:" :data-i="i" >播放</a></td>
        </tr>
      </table>
        <el-pagination layout="prev, pager, next" :total="50">
        </el-pagination>
      </div>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data(){
    return {
      toplist:{},
      toplist_detail:{},
      show_list:{}
    }
  },
  methods:{
    showlist(){
      this.show_list=this.toplist_detail.slice(0,20);
    },
    topSearch(tab, event){
      var id=tab.$el.dataset.id;
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid='+id+'&_=1512563984096'
      $.ajax({
        url:url,
        type:"get",
        dataType:'jsonp',
        jsonp: "jsonpCallback",
        scriptCharset: 'GBK',//解决中文乱码
        }
      ).then(result=>{
        //获取数据
          // console.log(result)
          this.toplist_detail=result.songlist;
          this.showlist();
          console.log(this.toplist_detail);
          console.log(this.show_list);
      })
    }
  },
  created(){
    //获取排行榜
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1512554796112';
      $.ajax({
        url:url,
        type:"get",
        dataType:'jsonp',
        jsonp: "jsonpCallback",
        scriptCharset: 'GBK',//解决中文乱码
        }
      ).then(result=>{
        //获取数据
          this.toplist=result.data.topList
          console.log(this.toplist)
      })
  }
}
</script>
<style scoped>
.center{
  width:1200px;
  margin:0 auto;
}
.el-tabs--left{
  overflow:auto;
}
.el-tab-pane{
  display: flex;
}
div.el-tabs__item{
  height:42px;
}
#showlist{
  margin-left:30px;
  width:600px;
  text-align: center;
}
#topimg{
  margin-top:30px;
  margin-left:30px;
}
#showlist tr{
  height:30px;
}
.colbg{
  background:#b7e3f3;
}
</style>
