import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided for user']
    },
    email: {
        type: String,
        required: [true, 'email must be provided for user']
    },
    password: { 
        type: String,
        required: [true, 'password must be provided for user'] 
    },
    id: { 
        type: String
    },
});

export default mongoose.model("User", userSchema);