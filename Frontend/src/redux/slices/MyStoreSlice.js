import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, getAllStores, getSingleStore, likesToggle, reviewPost } from "../../api/MyStore.api";



export const fetchStores = createAsyncThunk(
  "stores/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await getAllStores();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const fetchStoreById = createAsyncThunk(
  "stores/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await getSingleStore(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const createComment = createAsyncThunk(
  "stores/addComment",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await addComment(id, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const createReview = createAsyncThunk(
  "stores/addReview",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await reviewPost(id, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const toggleLike = createAsyncThunk(
  "stores/toggleLike",
  async (id, thunkAPI) => {
    try {
      const res = await likesToggle(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const storeSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    singleStore: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      //  FETCH ALL
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  FETCH ONE
      .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleStore = action.payload;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  COMMENT
      .addCase(createComment.fulfilled, (state, action) => {
        state.singleStore.comments = action.payload.comments;
      })

      //  REVIEW
      .addCase(createReview.fulfilled, (state) => {
        // refetch later or update manually
      })

      // LIKE
      .addCase(toggleLike.fulfilled, (state, action) => {
        if (state.singleStore) {
          state.singleStore.likesCount = action.payload.likes;
        }
      });
  },
});

export default storeSlice.reducer;