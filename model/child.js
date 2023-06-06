const mongoose = require("mongoose");
var childSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String,
    
    
});
childSchema.set('collection', 'child');
const childModel = mongoose.model("child", childSchema);
module.exports = childModel;