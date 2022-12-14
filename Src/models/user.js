import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import {nanoid} from 'nanoid'
const userSchema = new Schema({
    _id:{
        type:String,
        default: ()=>nanoid()
    },
    userName:{
        type:String,
        unique: true
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    changePassword:{
        type:Boolean,
        required:false
    }
},
    { timestamps: true }
)
userSchema.pre('save', async function (next) {
    try {
        const savedPassword = await bcrypt.hash(this.password, 5)
        this.password = savedPassword
        next()
    }
    catch {
        next(error)
    }
})

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
});
const user = mongoose.model("User", userSchema);
export default user
