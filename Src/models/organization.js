import { Schema } from "mongoose"
import mongoose from "mongoose"
import { nanoid } from "nanoid"
import { string } from "joi"
const orgSchema = new Schema({
    _id:{
        type:String,
        default: ()=>nanoid()
    },
    userId: {
        type: String,
        required:true
    },
    orgName:{
        type:String,
        required:false
    },
    address:{
        addressLine1: {
        type: String,
        required: false,
        },
        addressLine2: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        zipCode: {
            type: Number,
            required: false
        } ,
        required:false   
    },
    active:{
        type:Boolean,
        default:false
    }
   
},
    { timestamps: true }
)
const orgnaization=mongoose.model("org",orgSchema)
export default  orgnaization