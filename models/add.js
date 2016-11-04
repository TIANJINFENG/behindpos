var mongodb = require('./db');

function Add(add) {

    this.name = add.name;
    this.count = add.count;
    this.price =add.price;
    this.unit = add.unit;
};
module.exports = Add;
//存储商品信息
Add.prototype.save = function(callback) {
    //要存入数据库的商品文档
    var add = {
        name:this.name,
        count:this.count,
        price:this.price,
        unit:this.unit
    };
    mongodb.close()
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('adds', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(add, {
                safe: true
            }, function (err, add) {
                db.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, add[0]);//成功！err 为 null，并返回存储后的商品文档
            });
        });
    });
};
//读取用户信息
Add.get = function(name, callback) {
    mongodb.close()
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            console.log('-----------ces-------------------')
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('adds', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            var query = {};
            if (name) {
                query.name = name;
            }
            //根据 query 对象查询文章
            collection.find(query).sort({

            }).toArray(function (err, add) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, add);//成功！返回查询的商品信息
            });
        });
    });
};

Add.prototype.update = function(name,count,callback) {
    mongodb.close()
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取users集合
        db.collection('adds',function(err,collection){
            if(err){
                db.close();
                return callback(err);//错误，返回err信息
            }
            //查找用户(name键)值为 name 一个文档
            var query = {
                "name" :name
            }
            var change = {
                $set:{"count":count}
            };
            //根据query对象更新商品
            collection.update(
                query, change,
                function (err, add) {
                db.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, add);//成功！err 为 null，并返回存储后的商品文档
            })
        })
    })
}
Add.prototype.remove = function(name,callback) {
    mongodb.close()
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取users集合
    db.collection('adds',function(err,collection){
            if(err){
                db.close();
                return callback(err);//错误，返回err信息
            }
            //查找用户(name键)值为 name 一个文档
            var query = {
                name :name
            }
            //根据query对象更新商品
            collection.remove(
                query, function (err, add) {
                    db.close();
                    if (err) {
                        return callback(err);//错误，返回 err 信息
                    }
                    callback(null, add);//成功！err 为 null，并返回存储后的商品文档
                })
        })
    })
}