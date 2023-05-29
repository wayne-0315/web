const mongoose = require("mongoose");
const linkSchema = mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});
const LinkModel = mongoose.model("Link", linkSchema);
module.exports = LinkModel;