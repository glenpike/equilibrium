# Equilibrium

Simple Rest API & Front-End demo for users to store presets from digital consoles, etc.

Written in Express, Backbone & MarionetteJS

Requires
* MongoDB database running on 27017 called 'equilibrium'
* nodejs
* bower (npm install -g bower)

# Usage

## Install

Install all the node modules with:

`npm install`

Install bower modules (client JS libs) with:

`bower install`

Populate your mongo DB called 'equilibrium' with:

`npm run setup`

Run server with:

`npm start`

Run tests with:

`npm test` 

(requires server to be running)

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
