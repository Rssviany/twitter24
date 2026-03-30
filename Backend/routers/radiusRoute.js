import express from 'express';
import { protect } from '../middleware/authentication.js';
import { createStore, getAllStores, getNearbyStores } from '../controllers/RadiusStore.js';

const radiusRouter=express.Router();

radiusRouter.get('/nearby',protect,getNearbyStores);
radiusRouter.get('/all_stores',protect,getAllStores);
radiusRouter.post('/post/store',protect,createStore);

export default radiusRouter;