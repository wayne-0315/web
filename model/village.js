const mongoose = require("mongoose");
var villageSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
villageSchema.set('collection', 'village');
const villageModel = mongoose.model("village", villageSchema);
module.exports = villageModel;