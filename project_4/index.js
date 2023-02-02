/*eslint-disable*/
require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const port = 3000
const base64 = require('./CRUD_ori.js')
const _path = path.join(__dirname, './dist')
// console.log(_path);
app.use('/', express.static(_path))
app.use(logger('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', function (req, res) {
  console.log('응답햇디롱')
  const main = async () => {
    const _data = {
      key: req.body.key,
      text: req.body.text
    }
    console.log(_data)
    const new_base64 = new base64(_data)
    const t = await new_base64.save()
    console.log(t)
  }
  main()
})

app.listen(port, () => {
  console.log(port + '에서 서버 동작 완료.')
})
