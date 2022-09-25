import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name must be provided for user'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'email must be provided for user'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, 'password must be provided for user'] ,
        minLength: 8
    }
});


export default model("User", userSchema);