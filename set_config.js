"use strict"

require('dotenv').config()

var shell = require('shelljs');

shell.mkdir('-p', './src/config')
shell.echo(`export var API_URL="${process.env.API_URL}"`).to("./src/config/api.js")