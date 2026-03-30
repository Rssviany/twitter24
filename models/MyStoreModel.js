import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: String,

        category: {
            type: String,
            required: true,
        },

        location: {
            type: String,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [commentSchema],
        reviews: [reviewSchema],
        averageRating: {
            type: Number,
            default: 0,
        },

        numReviews: {
            type: Number,
            default: 0,
        },
        services: [
            {
                type: String
            }
        ],
        followers: {
            type: Number
        },
        // storeModel.js

        timings: {
            open: String,   // "10:00 AM"
            close: String,  // "7:00 PM"
        },

        workingDays: [String], // ["Mon", "Tue", "Wed"]

        phone: String,

        address: String,

        distance: String // optional: "1.2 km away"
    },
    { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;