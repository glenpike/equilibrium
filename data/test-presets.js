/* jshint sub: true */
/* global require */

// Hack to convert the test-data - a string of presets - into a JavaScript array.
var fs = require('fs');
var text = fs.readFileSync('./data/presets.json', 'utf8');
var data = text.split('\n');
data.pop();
var presets =  JSON.parse('[' + data.join(',') + ']');

module.exports = {
    presets: presets
};
