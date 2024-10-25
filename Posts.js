var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    image: String,
    categoria: String,
    conteudo: String,
    slug: String
},{collection: 'posts'})

var Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;