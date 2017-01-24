/**
 * Created by lenovo on 2017/1/24.
 */
var mysql = require("mysql");
var $conf = require('../conf/conf');

exports.createConnt = function () {
    let client = mysql.createConnection($conf);
    return client;
};

exports.getUsers = function (client,callback) {
    var selectstatement = 'select * from user';
    client.query(selectstatement,function (errs,rows,fields) {
        if(errs){
            callback(errs);
        };
        if (rows){
            console.log(rows);
            callback(rows);
        }
    });
}