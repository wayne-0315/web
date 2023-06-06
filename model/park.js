const mongoose = require("mongoose");
var parkSchema = mongoose.Schema({
    title: String,
    content: String, 
    postdate: Date,
    photos: String, 
    ipth: String,
    aaa: String 
    
});
parkSchema.set('collection', 'park');
const parkModel = mongoose.model("park", parkSchema);
module.exports = parkModel;