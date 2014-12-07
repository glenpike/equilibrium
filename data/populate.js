/* global require */
var data = require('./test-data-1'),
    PopulatorMongoDB = require('node.populator-mongodb'),

    db = 'mongodb://@localhost:27017/populator_test',

    populator = new PopulatorMongoDB(db, data);

populator.populate(function() {
    console.log('populated data')
});
