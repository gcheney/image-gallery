var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    lead: { type: String },
    description: { type: String },
    creator: { type: String },
    date : { type: Date },
    isPublic: { type: Boolean, required: true } 
});

module.exports = mongoose.model('Image', imageSchema, 'images');