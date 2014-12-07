var express = require('express')
    mongoskin = require('mongoskin')
    bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

var db = mongoskin.db('mongodb://@localhost:27017/music-group', {safe:true})

app.use('/presets', function(req, res, next) {
    req.collection = db.collection('presets')
    return next()
})

app.get('/presets', function(req, res, next) {
    req.collection.find({}, { limit: 10, sort: [['_id', -1]]})
        .toArray(function(e, results) {
            if(e) {
                return next(e)
            }
            res.send(results)
        })
})

app.post('/presets', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results) {
        if(e) {
            return next(e)
        }
        res.send(results)
    })
})

app.get('/presets/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send(result)
    })
})

app.put('/presets/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

app.delete('/presets/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

app.listen(3000)
