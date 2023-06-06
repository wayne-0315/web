const mongoose = require("mongoose");
var cloudSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
cloudSchema.set('collection', 'cloud');
const cloudModel = mongoose.model("cloud", cloudSchema);
module.exports = cloudModel;