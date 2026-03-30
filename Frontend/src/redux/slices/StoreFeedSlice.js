import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allStores, nearByStore } from "../../api/RadiusFeed.api";


export const fetchNearByStores = createAsyncThunk(
    'fetch/nearByStores',
    async () => {
        const res = await allStores();
        return res.data;
    }
);

const storeFeedSlice = createSlice({
    name: 'storeFeed',
    initialState: {
        storeFeeds: [],
        loading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearByStores.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNearByStores.fulfilled, (state, action) => {
                state.storeFeeds = action.payload,
                    state.loading = false
            })
            .addCase(fetchNearByStores.rejected, (state) => {
                state.loading = false
            })
    }
}
)

export default storeFeedSlice.reducer
