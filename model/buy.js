const mongoose = require("mongoose");
var buySchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String,
    price: String 
    
});
buySchema.set('collection', 'buy');
const buyModel = mongoose.model("buy", buySchema);
module.exports = buyModel;