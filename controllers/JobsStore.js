import { Job } from "../models/JobModel.js";

export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, job });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getJobsByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const jobs = await Job.find({ city }).populate("userId");
        res.json({ success: true, jobs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("userId");
        res.json({ success: true, jobs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};