var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var userDb = require("../dao/getIndexdb");

/* GET users listing. */
//后台管理首页
router.get('/', function(req, res, next) {
    res.render('./admin/login',{
        title:"Express"
    });
});

/* GET users listing. */
// admin 添加用户
//TODO 同时支持get和post
router.get('/addUser', function(req, res, next) {
    userDao.add(req,res,next);
});

router.post('/addUser', function(req, res, next) {
    userDao.add(req,res,next);
});

router.get("/deleteUser",function (req,res,next) {
    userDao.delete(req,res,next);
})
router.get("/queryAll",function (req,res,next) {
    userDao.queryAll(req,res,next);
})

router.get("/query",function (req,res,next) {
    userDao.queryById(req,res,next);
})

router.post("/updateuser",function (req,res,next) {
    userDao.update(req,res,next);
});

router.post("/login",function (req,res,next) {
    let user = {
        name:"admin",
        password:"admin"
    };
    let parma = req.body || req.params;
    console.log(parma);
    if(parma.name == user.name && parma.password == user.password){
        // res.send({
        //     code:1,
        //     message:"信息比对成功！"
        // })
        res.redirect('./index');
    };
});
router.get('/index',function (req,res,next) {
    let client = userDb.createConnt();
    userDb.getUsers(client,function (results) {
        if(results){
            res.render('./admin/index',{
                results:results
            })
        }
    })

})



module.exports = router;
