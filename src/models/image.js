var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    url: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    isPublic: {type: Boolean, required: true} 
});

module.exports = mongoose.model('Image', imageSchema, 'images');