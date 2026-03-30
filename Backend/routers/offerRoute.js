import express from 'express'
import { protect } from '../middleware/authentication.js';
import { createOffer, getAllOffers, getMyOffers, getOffersByCity } from '../controllers/OffersStore.js';

const offerRouter=express.Router();

offerRouter.post('/post_offers',protect,createOffer);
offerRouter.get('/get_offers',protect,getAllOffers);
offerRouter.get('/offers_by_city',protect,getOffersByCity);
offerRouter.get('/get_my_offers',protect,getMyOffers);

export default offerRouter