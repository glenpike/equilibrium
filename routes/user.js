var express = require('express'),
    mongoskin = require('mongoskin'),
    user = express.Router(),
    dbConf = require('../config/database');

var db = mongoskin.db(dbConf.url, {safe:true})

//Every route requires the database...
user.use('/', function(req, res, next) {
    req.collection = db.collection('users')
    return next()
})

user.get('/', function(req, res, next) {
    req.collection.findOne({_id: req.user._id}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send(result)
    })
})

user.put('/:id', function(req, res, next) {
    req.collection.updateById(req.user._id, {$set:req.body}, {safe:true, multi:false}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

module.exports = user;
