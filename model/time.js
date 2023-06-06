const mongoose = require("mongoose");
const timeSchema = mongoose.Schema({
    get_date: {
        type: String,
        required: true,
    },
    get_region: {
        type: String,
        required: true,
    }
    
});
const timeModel = mongoose.model("times", timeSchema);
module.exports = timeModel;