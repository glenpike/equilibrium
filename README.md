#Dirty demo for an API to CRUD presets

##usage

Install all the node modules with:

npm install

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

You should be prompted to login with a 'dirty' login form

Try:

user: george@monserrat.com
pass: george

Or

user: lee@theark.com
pass: lee

URL's to try:

See all your presets: http://localhost:3000/presets
See a single preset: http://localhost:3000/presets/300000000000000000000002
(Should only return data if the preset id matches your user)
Logout: http://localhost:3000/logout

Try visiting /presets when you are logged out.
