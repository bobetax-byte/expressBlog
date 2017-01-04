/**
 * Created by lenovo on 2017/1/4.
 */
const mysql = require("mysql");
const $conf = require("../conf/conf");
const $util = require("../util/util");
const $sql  = require("./userSqlMapping");

//使用连接池，提升性能
let pool = mysql.createPool($util.extend({},$conf.mysql));

//向前台返回JSon方法的简单封装
let jsonWrite = (res,ret)=>{
    if(typeof ret === "undefined"){
        res.json({
            code:"1",
            message:"操作失败！"
        });
    }else{
        res.json(ret);
    }
};

module.exports = {
    add:function (req,res,next) {
        pool.getConnection(function (err, connection) {
            //获取页面前台传过来的参数
            let param = req.query || req.params;
            //建立连接，向表中插值
            // Insert into superuser(id,name,password) values (0,?,？)
            // 执行操作语句，
            // 插入参数，
            // 返回值，
            connection.query($sql.insert,[param.name,param.password],function (err,result) {
                if(result){
                    result = {
                        code:200,
                        message:"增加用户成功！"
                    };
                };

                //以json形式，把操作结果返回前台
                jsonWrite(res,result);

                //释放链接
                connection.release();
            })
        })
    },
    delete:function (req,res,next) {
        //deleteById
        pool.getConnection(function (err, connection) {
            //获取页面的参数
            let parma = +req.query.id ;
            connection.query($sql.delete,id,function (err,result) {
                if(result){
                    //成功
                    result = {
                        code:200,
                        message:"删除成功！",
                    }
                }else{
                    result = void 0;
                };
                jsonWrite(res,result);
                connection.release();
            })
        })
    },
    update:function (req,res,next) {
        //update By Id
        //TODO 检测数据是否改变，目前要求参数都传递
        let parma = req.body;
        //检测数据是否为空，防止清空数据
        if(parma.name == '' || parma.password == "" || parma.id == ""){
            let result = {
                code:0,
                message:"数据不合法！"
            };
            jsonWrite(res,result);
            return false;
        };
        //+parma.id 防止字符串注入
        pool.getConnection(function (err,connection) {
            connection.query($sql.update,[parma.name,parma.password,+parma.id],function (err,result) {
                //success
                console.log(result);
                // if (result.affectedRows  > 0) {
                //     jsonWrite(res, {code: 200, message: "更新用户信息成功"})
                // } else {
                //     jsonWrite(res, {code: 0, message: "更新用户信息失败"})
                // };
                connection.release();
            });
        });
    },
    queryById:function (req,res,next) {
        //转化整数
        let id = +req.query.id;
        pool.getConnection(function(err,connection){
            connection.query($sql.queryById,id,function (err,result) {
                jsonWrite(res,result);
                connection.release();
            });
        });

    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByAll, function(err, result) {
                console.log("输出查询的结果");
                console.log(result);
                return result;
                connection.release();
            });
        });
    },
    queryByName:function (req,res,next) {
        let parmas = req.query || req.params;
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryByName,parmas.name,function (err,result) {
                if(result){
                    return result;
                };
                connection.release();
            })
        })
    }
}