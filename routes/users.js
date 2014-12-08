var express = require('express'),
    mongoskin = require('mongoskin'),
    users = express.Router();

var db = mongoskin.db('mongodb://@localhost:27017/music-group', {safe:true})

//Every route requires the database...
users.use('/', function(req, res, next) {
    req.collection = db.collection('users')
    return next()
})

users.get('/', function(req, res, next) {
    req.collection.find({}, { limit: 10, sort: [['_id', -1]]})
        .toArray(function(e, results) {
            if(e) {
                return next(e)
            }
            res.send(results)
        })
})

users.post('/', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results) {
        if(e) {
            return next(e)
        }
        res.send(results)
    })
})

users.get('/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send(result)
    })
})

users.put('/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

users.delete('/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

module.exports = users;
