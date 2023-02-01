const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const base64 = new Schema({
    key: String,    //이미지파일 이름 : file.name
    text: String,   //이미지 파일 base64 : src
});

module.exports = mongoose.model('base64', base64);
