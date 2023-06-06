const mongoose = require("mongoose");
var muslinSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
muslinSchema.set('collection', 'muslin');
const muslinModel = mongoose.model("muslin", muslinSchema);
module.exports = muslinModel;