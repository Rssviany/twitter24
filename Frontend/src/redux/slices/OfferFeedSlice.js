import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allOffers } from "../../api/OfferFeed.api";


export const fetchAllOffers = createAsyncThunk(
    'fetch/allOffers',
    async () => {
        const res = await allOffers();
        return res.data.offers;
    }
);

export const fetchLocalOffers = createAsyncThunk(
    "fetch/localOffers",
    async (city) => {
        const res = await getOffersByCity(city);
        return res.data.offers;
    }
);

export const fetchMyOffers = createAsyncThunk(
    "fetch/myOffers",
    async () => {
        const res = await getMyOffers();
        return res.data.offers;
    }
);

const offerFeedSlice = createSlice({
    name: 'offerFeed',
    initialState: {
        localFeeds: [],
        globalFeeds: [],
        myFeeds: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // GLOBAL OFFERS
            .addCase(fetchAllOffers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllOffers.fulfilled, (state, action) => {
                state.globalFeeds = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllOffers.rejected, (state) => {
                state.loading = false;
            })

            // LOCAL OFFERS
            .addCase(fetchLocalOffers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLocalOffers.fulfilled, (state, action) => {
                state.localFeeds = action.payload;
                state.loading = false;
            })
            .addCase(fetchLocalOffers.rejected, (state) => {
                state.loading = false;
            })

            // MY POSTS
            .addCase(fetchMyOffers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyOffers.fulfilled, (state, action) => {
                state.myFeeds = action.payload;
                state.loading = false;
            })
            .addCase(fetchMyOffers.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default offerFeedSlice.reducer