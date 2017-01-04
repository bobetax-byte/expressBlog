var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
//后台管理首页
router.get('/', function(req, res, next) {
    res.render('./admin/login');
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

router.get("/login",function (req,res,next) {
    //登录判断
    let parma = req.query || req.params;
    console.log(parma);
    console.log(console);
    if(parma.name == 'admin' && parma.password == 'admin'){
        res.render('./admin/index',{
            loginInfo:{
                name:"admin",
                id:"1"
            }
        });

    }else{
        res.json({
            code:0,
            message:'登录错误！'
        });
    }
});



module.exports = router;
