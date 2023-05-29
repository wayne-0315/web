const mongoose = require("mongoose");
const lostSchema = mongoose.Schema({
    year :{
        type: String,
        required: true,
    },
    month :{
        type: String,
        required: true,
    },
    date :{
        type: String,
        required: true,
    },
    imagePath: {
        type : String 
      }
    

});
const lostModel = mongoose.model("lost", lostSchema);
module.exports = lostModel;