import mongoose from "mongoose";

const localFeedSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        links: [
            {
                label: String,
                url: String
            }
        ],

        address: {
            type: String
        },

        city: {
            type: String,
            required: true
        },

        radius: {
            type: Number,
            default: 0
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        likesCount: {
            type: Number,
            default: 0
        },
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                text: String,
                createdAt: Date
            }
        ],
        commentsCount: {
            type: Number,
            default: 0
        },

        viewsCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export const LocalFeed = mongoose.model("LocalFeed", localFeedSchema);