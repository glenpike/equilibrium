var express = require('express'),
    mongo = require('mongodb'),
    ObjectID = mongo.ObjectID,
    mongoskin = require('mongoskin'),
    BSON = mongoskin.BSONPure,
    presets = express.Router(),
    dbConf = require('../config/database');

var db = mongoskin.db(dbConf.url, {safe:true})


var MongoClient = require('mongodb').MongoClient;



//Every route requires the database...
presets.use('/', function(req, res, next) {
    req.collection = db.collection('presets');
    return next()
    // Connect to the db
    // MongoClient.connect(dbConf.url, function(err, db) {
    //     if(err) { return console.dir(err); }

    //     req.collection = db.collection('presets');
    //     return next()

    // });

})

presets.get('/', function(req, res, next) {
    console.log('presets, user is ', req.user)
    req.collection.find({'_user': req.user._id }, { limit: 10, sort: [['_id', -1]]})
        .toArray(function(e, results) {
            if(e) {
                return next(e)
            }
            res.send(results)
        })

})

//Anyone can post a new preset, they just might not get it back.
presets.post('/', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results) {
        if(e) {
            return next(e)
        }
        res.send(results)
    })
})

presets.get('/:id', function(req, res, next) {
    req.collection.findOne({_id: new ObjectID(req.params.id), _user: req.user._id }, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send(result)
    })
})

presets.put('/:id', function(req, res, next) {
    //Annoyance from Backbone - we should use Mongoose and translate _id to id in schema so Backbone id works.
    //http://dzello.com/blog/2011/12/24/tame-the-mongoid-id-field-in-your-rails-and-backbone-js-app/
    //http://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
    delete req.body._id;

    req.collection.update({_id: new ObjectID(req.params.id), '_user': req.user._id }, {$set:req.body}, {safe:true, multi:false}, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

presets.delete('/:id', function(req, res, next) {
    req.collection.remove({_id: new ObjectID(req.params.id), '_user': req.user._id }, function(e, result) {
        if(e) {
            return next(e)
        }
        res.send((1===result) ? {msg:'success'}:{msg:'error'})
    })
})

module.exports = presets;
