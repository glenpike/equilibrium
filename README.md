#Dirty demo for an API to CRUD presets

Requires MongoDB, nodejs and bower
(npm install -g bower)

##usage

Install all the node modules with:

npm install

Install bower modules (client JS libs) with:

bower install

Populate a mongo DB called 'music-group' with:

cd data && node populate.js && cd ../

(test data is in data/test-data-1.js)

Run tests with:

cd ./tests

mocha auth-spec.js
mocha preset-spec.js

cd ../

Run server with:

node server.js

Visit http://localhost:3000

You should be prompted to login

Try:

user: george@monserrat.com
pass: george

Or

user: lee@theark.com
pass: lee

The GUI is a simple MarionetteJS/Backbone application with Bootstrap styling
and just shows a basic read-only view of "profile", the current user's presets
and a "detail view" for presets triggered by a route.

REST URL's to try:

See all your presets: http://localhost:3000/presets
See a single preset: http://localhost:3000/presets/300000000000000000000002
(Should only return data if the preset id matches your user)
Logout: http://localhost:3000/logout

Try visiting /presets when you are logged out.


