import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllLocalFeeds } from "../../api/LocalFeed.api";



export const fetchLocalFeeds = createAsyncThunk(
    'localFeeds/fetch',
    async () => {
        const res = await AllLocalFeeds();
        return res.data;
    }
);

const localSlice = createSlice({
    name: 'localFeeds',
    initialState: {
        feeds: [],
        loading: false
    },
    reducers: {
        updatePostLike: (state, action) => {
            const { postId, likesCount, isLiked } = action.payload;

            const post = state.feeds.find((feed) => feed._id === postId);

            if (post) {
                post.likesCount = likesCount;
                post.isLiked = isLiked;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocalFeeds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLocalFeeds.fulfilled, (state, action) => {
                state.loading = false;
                state.feeds = action.payload
            })
            .addCase(fetchLocalFeeds.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const { updatePostLike } = localSlice.actions;

export default localSlice.reducer;