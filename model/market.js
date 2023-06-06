const mongoose = require("mongoose");
var marketSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
marketSchema.set('collection', 'market');
const marketModel = mongoose.model("market", marketSchema);
module.exports = marketModel;