const express=require("express");
// 创建连接池
const mysql=require("mysql")
var pool=mysql.createPool({
  host:"127.0.0.1",
  port:"3306",
  user:"root",
  password:"",
  database:"fun4",
  connectionLimit:10
})
// 创建路由器
var router=express.Router();

router.get("/",(req,res)=>{
  // console.log(obj)
	var sname=""
	var sql="";
	if(req.query.sname){
		var sname=req.query.sname
		var sql="select * from singer where Fsinger_name=?"
	}else{
		var sql="select * from singer ORDER BY Fsort ASC limit 0,50 "
	}
    pool.query(sql,[sname],(err,result)=>{
//      console.log(result)
    if(err) throw err;
    if(result.length>0){
			res.send({code:200,msg:result});
		}else{
			res.send({code:300,msg:"not Found"});
		}
  })
});
router.get("/Findex",(req,res)=>{
	var value=req.query.value;
	var page=req.query.page*50;
	pool.query("select * from singer WHERE Findex=? ORDER BY Fsort ASC limit ?,50",[value,page],(err,result)=>{
      console.log(result)
    if(err) throw err;
    if(result.length>0){
			res.send({code:200,msg:result});
		}else{
			res.send({code:300,msg:"not Found"});
		}
  })
})
// 导出路由器

module.exports=router;