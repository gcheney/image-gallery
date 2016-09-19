var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true    
    },
    content: {
        type: String,
        maxlength: 100, 
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
    creator: { 
        type: String, 
        default: 'Anonymous'
    },
    title: { 
        type: String,
        maxlength: 25,
        default: 'Untitled'
    },
    likes: {
        type: Number,
        default: 0
    },
    description: { 
        type: String,
        maxlength: 40,
        default: 'No description provided.'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('Image', imageSchema, 'images');