const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017/article', {useNewUrlParser: true});
var articleSchema = mongoose.Schema({
    // account: String,
    // name: String,
    // type: String,
    title: String,
    content: String, 
    // like: Array,
    // comment: Array,
    postdate: Date,
    photos: String, 
    ipth: String 
    
});
articleSchema.set('collection', 'article');
const articleModel = mongoose.model("article", articleSchema);
module.exports = articleModel;