const mongoose = require("mongoose");
const sitSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    sit: {
        type: String,
        required: true,
    }
    
});
const sitModel = mongoose.model("sit", sitSchema);
module.exports = sitModel;