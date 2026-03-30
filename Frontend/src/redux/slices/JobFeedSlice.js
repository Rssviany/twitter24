import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllJobs } from "../../api/JobsFeed.api";


export const fetchAllJobs = createAsyncThunk(
    'fetch/allJobs',
    async () => {
        const res = await AllJobs()
        return res.data.jobs
    }
);

const jobsFeedSlice = createSlice({
    name: 'jobsFeed',
    initialState: {
        feeds: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllJobs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllJobs.fulfilled, (state, action) => {
                state.feeds = action.payload;
                state.loading = false
            })
            .addCase(fetchAllJobs.rejected, state => {
                state.loading = false;
            })
    }
})

export default jobsFeedSlice.reducer