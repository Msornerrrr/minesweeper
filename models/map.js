const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: [true, 'grid num must be provided']
    },
    isExplored: {
        type: Boolean,
        default: false
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    isMine: {
        type: Boolean,
        default: false
    }
});

const mapSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "no title"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    difficulty: {
        type: Number,
        min: 0,
        max: 2.5,
        default: 2.5,
    },
    width: {
        type: Number,
        min: 1,
        max: 25,
        required: [true, 'map width must be provided']
    },
    height: {
        type: Number,
        min: 1,
        max: 25,
        required: [true, 'map height must be provided']
    },
    map: {
        type: [[gridSchema]],
        required: [true, 'map must be provided']
    }
    /* future added
    creator:{
        type: String,
        required: [true, 'creator of map must be provided']
    },
    comments:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
    */
});

module.exports = mongoose.model('Map', mapSchema);