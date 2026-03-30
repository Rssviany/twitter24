import express from "express";
import {
    createStore,
    getStores,
    getStoreById,
    addComment,
    addReview,
    toggleLikeStore,
} from "../controllers/MyStore.js";
import { protect } from "../middleware/authentication.js";



const myStoreRouter = express.Router();

myStoreRouter.post("/myStore_create", protect, createStore);
myStoreRouter.get("/mystore_getAll", getStores);
myStoreRouter.get("/mystore/:id", getStoreById);

myStoreRouter.post("/mystore/:id/comment", protect, addComment);
myStoreRouter.post("/mystore/:id/review", protect, addReview);
myStoreRouter.put("/mystore/:id/like", protect, toggleLikeStore);

export default myStoreRouter;