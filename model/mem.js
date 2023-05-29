const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    pw: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
const memberModel = mongoose.model("member", memberSchema);
module.exports = memberModel;