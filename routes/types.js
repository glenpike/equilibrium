var express = require('express'),
    mongoskin = require('mongoskin'),
    types = express.Router();

var db = mongoskin.db('mongodb://@localhost:27017/music-group', {safe:true})

//Every route requires the database...
types.use('/', function(req, res, next) {
    req.collection = db.collection('types')
    return next()
})

types.get('/', function(req, res, next) {
    req.collection.find({}, { limit: 10, sort: [['_id', -1]]})
        .toArray(function(e, results) {
            if(e) {
                return next(e)
            }
            res.send(results)
        })
})

types.post('/', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results) {
        if(e) {
            return next(e)
        }
        res.send(results)
    })
})

types.get('/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send(result)
    })
})

types.put('/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

types.delete('/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

module.exports = types;
