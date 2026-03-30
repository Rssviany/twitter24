import mongoose from "mongoose"

const offerSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Radius"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    image: String,
    address: String,
    city: String,
    validTill: String
}, { timestamps: true })

export const Offer = mongoose.model("Offer", offerSchema);