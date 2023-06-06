const mongoose = require("mongoose");
var createSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
createSchema.set('collection', 'create');
const createModel = mongoose.model("create", createSchema);
module.exports = createModel;