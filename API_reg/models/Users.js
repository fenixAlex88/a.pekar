import mongoose, {Schema} from "mongoose";


const User = new Schema({
    username: {type: String, unique:true, required: true},
    password: {type: String, required: true},
    score: {type: Number, unique:false, required: false}
});

export default mongoose.model('User', User);