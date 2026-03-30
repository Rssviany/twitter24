import express from 'express'
import mongoose from 'mongoose'

const modelSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    category: String,
    description: String,
    aboutUs:String,
    images: [String],
    address: String,
    city: String,
    phone: String,
    services: [String],
    location:{
type:{
type:String,
enum:["Point"],
default:"Point"
},
coordinates:[Number] // [longitude, latitude]
},

rating:{
type:Number,
default:0
},

followers:{
type:Number,
default:0
},reviews:{
    type:Number,
    default:0
}
},{timestamps:true}
)
modelSchema.index({location:"2dsphere"});

export const Radius = mongoose.model("Radius",modelSchema)