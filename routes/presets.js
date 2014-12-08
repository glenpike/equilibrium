var express = require('express'),
    mongoskin = require('mongoskin'),
    presets = express.Router();

var db = mongoskin.db('mongodb://@localhost:27017/music-group', {safe:true})

//Every route requires the database...
presets.use('/', function(req, res, next) {
    req.collection = db.collection('presets')
    return next()
})

presets.get('/', function(req, res, next) {
    req.collection.find({}, { limit: 10, sort: [['_id', -1]]})
        .toArray(function(e, results) {
            if(e) {
                return next(e)
            }
            res.send(results)
        })
})

presets.post('/', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results) {
        if(e) {
            return next(e)
        }
        res.send(results)
    })
})

presets.get('/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send(result)
    })
})

presets.put('/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

presets.delete('/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

module.exports = presets;
