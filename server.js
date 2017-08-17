const express=require('express');
const expressStatic=require('express-static');
const nodemailer=require('nodemailer');   //邮箱验证
const bodyParser=require('body-parser');     //post方式数值
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const open=require('open');     //自动打开浏览器
const fs=require('fs');
const path=require('path');
const mysql=require('mysql');
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'emai_check'
});

//创建服务器
const server=express();
//自动打开浏览器
open('http://localhost:8082/index.html','chrome');
//监听端口号8081
server.listen(8082,(err)=>{
    if(err)
        throw new err;
    else 
        console.log('成功监听8082端口。');
});

//获取数据请求  post方式
server.use(bodyParser.urlencoded({
    extended:true,
    maxAge:5*1024*1024
}));
//获取文件  post方式
//server.use(multer({dest:'./dist/upload'}).any());
//const upload=multer({dest:'./dist/upload'})//上传目录

//cookie、session
server.use(cookieParser('fsafgs4324rfrt34edfg5'));//签名
(function(){
    var sessionArr=[];
    for(var i=0;i<100000;i++)
        sessionArr.push('key_'+Math.random().toString().replace('.',''));
    server.use(cookieSession({name:'my_session_id',keys:sessionArr,maxAge:24*3600*1000}));//24小时
})();

//3.模版
//输出什么东西
server.set('view engine','html');
//模版文件放在哪儿
server.set('views','./dist/html');
//哪种模版引擎
server.engine('html',consolidate.ejs);

/**** 返回的随机数据
 * 参数表示获取几位字符串
 * *** */
function get_random(length){
    var suiji=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
                'q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F',
                'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V',
                'W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
    var result='';
    for(var i=0; i<length; i++){
        var suiji_len=suiji.length;  //随机数组的长度
        var xiabiao=parseInt(Math.random()*suiji_len);
        result += suiji[xiabiao];
    }
    return result;
}
//注册
//配置邮箱发送选项
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: '1105332245@qq.com',
        pass: 'mdhkosluptjijbfb'
    }
});
var mailOptions = {  
    from: '1105332245@qq.com', // 发送者  
    to: '178678429@qq.com,342063120@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
    subject: '邮箱注册验证', // 标题  
    //text: 'Hello world', // 文本  
    html: `<h2>点击链接以完成激活:</h2><h3>  
    <a href="https://yanglilong127.github.io/css3">  
    点我激活</a></h3>`,
    attachments:[    //可以添加多个附件
        {
            filename:'package.json',
            path:'./package.json',
        },
        {
            filename:'keke',
            content:'克克你好啊',
        }
    ] 
  };  
server.post('/register',(req,res)=>{
    var username=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var activeCode=get_random(8);  //8位随机码
    
    var table_name='email_table';
    var sql=`INSERT INTO ${table_name} (username,email,password,ActiveCode)
             VALUES('${username}','${email}','${password}','${activeCode}')`;
    db.query(sql,(err)=>{
        if(err){
            console.log(err);
            res.status(500).send('连接数据库错误').end();
        }else{
            res.send('ok');
            //发送邮件
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });  
        }
    });
    
});

//静态文件放置位置，即根目录
server.use(expressStatic('./src'));
