const mongoose = require("mongoose");
const pointSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
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
    hour :{
        type: String,
        required: true,
    },
    minute :{
        type: String,
        required: true,
    }
    
});
const pointModel = mongoose.model("pointdate", pointSchema);
module.exports = pointModel;