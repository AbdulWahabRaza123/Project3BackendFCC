const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    url:
    {
        type: String,
        required: true
    },
    shortUrl:
    {
        type: Number,
        unique:true
    }
})
const shortUrl = new mongoose.model("URLShortener", urlSchema);
module.exports = shortUrl;
