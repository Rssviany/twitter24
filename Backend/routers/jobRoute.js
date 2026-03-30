import express from "express";
import { protect } from "../middleware/authentication.js";
import { createJob, getJobsByCity, getAllJobs } from "../controllers/JobsStore.js";


const jobRouter = express.Router();

jobRouter.post("/job_create", protect, createJob);
jobRouter.get("/city/:city", protect, getJobsByCity);
jobRouter.get("/all_jobs", protect, getAllJobs);

export default jobRouter;