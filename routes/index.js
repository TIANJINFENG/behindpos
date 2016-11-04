var crypto = require('crypto'),
    Add =  require('../models/add.js');

var lineReader = require('line-reader');
var readline = require('readline');
var fs = require('fs');
var os = require('os');
var fReadName = './hp.obo';
var fWriteName = './h_p.json';

var express = require('express');
var router = express.Router();

router.get('/admin', function (req, response) {
    console.log('-----------------')
    var fRead = fs.createReadStream(fReadName);
    var fWrite = fs.createWriteStream(fWriteName);
    var objReadline = readline.createInterface({
        input: fRead,
    });
    var aaaa = [];
    var head = {};
    var title = {};
    var ppp = {}
    var fff = '';
    var index = 1;
    objReadline.on('line', (line)=>{
        var c = (line.toString().split(':',1));
        var b = line.toString();
    var a = b.indexOf(':')+1

    if(a != 0 ){
        ppp.create = title
        title['_index']='blog';
        title['_type']='HPO';
        if(c[0] == 'id'){
            title['_id']=b.substring(a+1);
        }else{
            head[c[0]]= b.substring(a)
        }
    }
    if(a == 0 && line != ""){
        fWrite.write(JSON.stringify(ppp) + '\n'+JSON.stringify(head)+'\n');
        title = {};
        head = {};
        ppp = {};
    }

    //    var b = ((line.toString()).split("\t"));
    //    ppp['_index'] = 'blog'
    //    ppp['_type'] = b[0];
    //    ppp['_id'] = b[1];
    //    head.create = ppp
    //    title.name = b[2]
    //    title.id = b[4];
    //    title.ORPHANET = b[5];
    //    title.Ienergy = b[6];
    //    title.typ = b[8];
    //    title.count = b[10];
    //    title.title = b[11];
    //    title.time = b[12];
    //    title.title = b[13];
    //    fff = JSON.stringify(head) + '\n' + JSON.stringify(title) + '\n'
    //    //var tmp = 'line' + index.toString() + ':' + line;
    //fWrite.write(fff ); // 下一行
});
objReadline.on('close', ()=>{
    console.log('readline close...');
});
    //var aaaa = [];
    //var head = {};
    //var title = {};
    //var ppp = {}
    //var fff = '';
    //lineReader.eachLine('p_a.tab', function (line) {
    //
    //    var b = ((line.toString()).split("\t"));
    //    ppp['_index'] = 'blog'
    //    ppp['_type'] = b[0];
    //    ppp['_id'] = b[1];
    //    head.create = ppp
    //    title.name = b[2]
    //    title.id = b[4];
    //    title.ORPHANET = b[5];
    //    title.Ienergy = b[6];
    //    title.typ = b[8];
    //    title.count = b[10];
    //    title.title = b[11];
    //    title.time = b[12];
    //    title.title = b[13];
    //    fff = JSON.stringify(head) + '\n' + JSON.stringify(title) + '\n'
    //    fs.appendFile('duixiang.json', fff, function (err) {
    //
    //        if (err) {
    //            console.log('--------123---------------')
    //            return console.error(err);
    //        }
    //    })
    //})
    //res.
    //
    ////red_list.then(function(){
    ////    console.log("---------------------end--------------------------------------------------")
    ////})

})



/* GET home page. */
//router.get('/admin', function (req, res) {
// Add.get(null, function (err, adds) {
//    if(err){
//      adds=[];
//    }
//    res.render('admin', {
//      title: 'admin',
//      add: req.session.add,
//      adds:adds,
//      success: req.flash('success').toString(),
//      error: req.flash('error').toString()
//    });
//  })
//})
router.post('/admin', function (req, res){
  var newAdd = new Add({
    name:req.body.name,
    count:req.body.count
  });
  if(newAdd.count!=undefined ){
  newAdd.update(newAdd.name,newAdd.count, function (err){
      if (err) {
        req.flash('error', err);
        return res.redirect('/admin');
      }

      req.flash('success', '');
     res.redirect('/admin');//发表成功跳转到主页
    });
  }

  if(newAdd.count==undefined ){
  newAdd.remove(newAdd.name, function (err){
    if (err) {

      req.flash('error', err);
      return res.redirect('/admin');
    }

    req.flash('success', '');
    res.redirect('/admin');//发表成功跳转到主页
  });
  }
})
router.get('/add_admin', function (req, res) {
  res.render('add_admin', {
    title: 'add',
    add: req.session.add,
    success: req.flash('success').toString(),
    error: req.flash('error').toString() });
})
router.post('/add_admin', function (req, res) {
  var name=req.body.name,
      count=req.body.count,
      price=req.body.price,
      unit=req.body.unit
  //检验用户两次输入的密码是否一致
  var newUser = new Add({
    name:name,
    count:count,
    price:price,
    unit:unit
  });
  //检查用户名是否已经存在

  Add.get(newUser.name, function (err, add) {
    //如果不存在则新增用户
    newUser.save(function (err, add) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/add_admin');//注册失败返回主册页
      }
      req.session.add = newUser;//用户信息存入 session
      req.flash('success', '');
      res.redirect('/add_admin');//注册成功后返回主页
    });
  });
})
module.exports = router;
