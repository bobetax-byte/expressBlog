/**
 * Created by lenovo on 2017/1/4.
 */
// dao/userSqlMapping.js
// CRUD SQL 语句
const user = {
    insert:"Insert into superuser(id,name,password) values(0,?,?)",
    delete:"Delete from superuser where id=?",
    update:"update superuser set name=?,age=? where id=?",
    queryById:"select * from superuser where id=?",
    queryByName:"select * from superuser where name=?",
    queryByAll:"select * from superuser"
};

module.exports = user;