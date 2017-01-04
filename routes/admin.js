var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
//后台管理首页
router.get('/', function(req, res, next) {
    res.render('./admin/index');
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
    //登录判断
    let result = userDao.queryByName(req,res,next);
    let name = req.query.name || req.params.name;
    if(!result.length || !result){
        res.json({
            code:200,
            message:"数据库查询失败，请重试"
        })
    }else{
        console.log(result);
        console.log(typeof result);
    }
    res.json({
        code:200,
        message:"nihaoa"
    })
});

module.exports = router;
