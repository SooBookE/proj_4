require('dotenv').config()
const mongoose = require('mongoose')

const USER = process.env.dbid;
const PWD = process.env.dbpw;
const HOST = process.env.dbhost;
const DB = 'base64'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`

mongoose.set(`strictQuery`, false)
mongoose
    .connect(mongodbURL, { useNewUrlParser: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.log(err));
const base64 = require('./base64.js')

module.exports = base64