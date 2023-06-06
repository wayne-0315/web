const mongoose = require("mongoose");
var chinSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
chinSchema.set('collection', 'chin');
const chinModel = mongoose.model("chin", chinSchema);
module.exports = chinModel;