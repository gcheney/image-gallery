var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: String,
    text: String,
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var imageSchema = new mongoose.Schema({
    url: { 
        type: String, 
        required: true 
    },
    user: String,
    title: { 
        type: String, 
        required: true,
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
    isPublic: {
        type: Boolean,
        required: true,
        default: true
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('Image', imageSchema, 'images');