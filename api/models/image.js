var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true    
    },
    content: {
        type: String,
        required: true    
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var imageSchema = new mongoose.Schema({
    url: { 
        type: String, 
        required: true 
    },
    creator: String,
    title: { 
        type: String, 
        default: 'Untitled'
    },
    likes: {
        type: Number,
        default: 0
    },
    description: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('Image', imageSchema, 'images');