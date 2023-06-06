const mongoose = require("mongoose");
var newsSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
newsSchema.set('collection', 'news');
const newsModel = mongoose.model("news", newsSchema);
module.exports = newsModel;