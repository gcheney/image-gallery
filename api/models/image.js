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
        required: true
    },
    title: { 
        type: String,
        maxlength: 25,
        required: true,
        default: 'Untitled'
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    description: { 
        type: String,
        maxlength: 40,
        required: true,
        default: 'No description provided.'
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('Image', imageSchema, 'images');