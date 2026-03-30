import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    resetOTP:String,
    resetOTPExpires:Date,
},
{timestamps:true}
);

export const User=mongoose.model('User',UserSchema)