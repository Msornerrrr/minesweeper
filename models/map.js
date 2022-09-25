import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gridSchema = new Schema({
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

const mapSchema = new Schema({
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
        max: 5,
        default: 2.5,
    },
    hint: {
        type: String,
        default: "no hint, gook luck"
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

export default model('Map', mapSchema);