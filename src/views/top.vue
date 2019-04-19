<template>
<div>
  <div class="center">
    <el-tabs tab-position="left" style="height: 700px;" @tab-click="topSearch">
    <el-tab-pane :label="t.topTitle" v-for="(t,i) of toplist" :key="i" :data-id="t.id" ref>
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
          <td><a href="javascript:" :data-id="`${t.data.songmid}`" @click="addplay">播放</a></td>
        </tr>
      </table>
      <div class="rt">
        <el-pagination  @current-change="handleCurrentChange" 
       :current-page="currentPage" layout="prev ,pager , next" :total="totalpage">
        </el-pagination>
      </div>
      </div>
    </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      toplist:[],
      toplist_detail:[],
      show_list:[],
      currentPage : 1 ,
      totalpage : 0
    }
  },
  methods:{
     // 初始化渲染的数组
    initUsers : function(){
       this.show_list = this.toplist_detail.slice(0,19)
    },
    // 初始化总页数
    inittotalpage  : function(){
      this.totalpage = this.toplist_detail.length/2
      console.log(this.totalpage)
    },
   // 改变页面 这时候数据也会改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.show_list = this.toplist_detail.slice((this.currentPage-1)*20,this.currentPage*20);
    },
    //以上为设置分页
    addplay(e){
      //获取歌曲id
      var i =e.target.dataset.id
      //通过歌曲id搜索歌曲对象
      this.axios
        .get("https://api.itooi.cn/music/tencent/song", {
          params: {
            key: 579621905,
            id:i
          }
        })
        .then(result => {
          //将获取的歌曲对象发送至父组件进行播放
          this.$emit("listenadd",result.data.data)
        });
    },
    // showlist(){
    //   if(this.toplist_detail.length<=20){
    //     this.show_list=this.toplist_detail
    //   }else{
    //   this.show_list=this.toplist_detail.slice(0,20);
    //   }
    // },
    topSearch(tab, event){
      var id=tab.$el.dataset.id;
      this.getTop(id)
    }
    ,
    getTop(id){
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
          // this.showlist();
          console.log(this.toplist_detail);
          // console.log(this.show_list);
          this.initUsers();
          this.inittotalpage ();
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
          this.getTop(this.toplist[0].id)
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
  overflow:visible
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
#showlist>tr>td:first-child{
  width:55%
}
#showlist tr{
  height:30px;
}
#topimg{
  margin-top:30px;
  margin-left:30px;
}
.colbg{
  background:#eff6f9;
}
.rt{
  float:right;
}
header+div{
    background-image:linear-gradient(#f9fcfd,#fff)
}
</style>
