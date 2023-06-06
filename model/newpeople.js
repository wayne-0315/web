const mongoose = require("mongoose");
var newpeopleSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
newpeopleSchema.set('collection', 'newpeople');
const newpeopleModel = mongoose.model("newpeople", newpeopleSchema);
module.exports = newpeopleModel;