import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Radius"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    companyName: String,
    salary: String,
    experience: String,
    type: String,
    timings: String,
    description: String,
    skills: [String],
    image: String,
    address: String,
    city: String
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);