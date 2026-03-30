import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice'
import localSliceReducer from '../slices/LocalFeedSlice'
import storeSliceReducer from '../slices/StoreFeedSlice'
import offerSliceReducer from '../slices/OfferFeedSlice'
import jobSliceReducer from '../slices/JobFeedSlice'
import MyStoreSliceReducer from '../slices/MyStoreSlice'

export const store = configureStore({
    reducer: {
        user: authReducer,
        localFeeds: localSliceReducer,
        storeFeed: storeSliceReducer,
        offerFeed: offerSliceReducer,
        jobsFeed: jobSliceReducer,
        stores: MyStoreSliceReducer
    }
})