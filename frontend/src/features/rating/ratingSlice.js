import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ratingService from './ratingService';


const initialState = {
    reviews: [],
    reviewLoading: null,
    offset: 0,
    limit: 10,
    isError: false,
    isSuccess: false,
    hasMore: true,
    isLoading: false,
    msg: '',
};


// Get Reviews for an app
export const getReviewsByApp = createAsyncThunk(
    'review/getReviewsByApp',
    async (appId, thunkAPI) => {
        try {
            return await ratingService.getReviewsByApp(appId);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create a review
export const createReview = createAsyncThunk(
    'review/createReview',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user?.user?.token;
            return await ratingService.createReview(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create a review
export const deleteReview = createAsyncThunk(
    'review/deleteReview',
    async (appId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user?.user?.token;
            return await ratingService.deleteReview(appId, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Rate app
export const rateApp = createAsyncThunk(
    'review/rateApp',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await ratingService.rateApp(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete rating
export const deleteRating = createAsyncThunk(
    'review/deleteRating',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await ratingService.deleteRating(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        resetReview: (state) => {
            state.reviews = [];
            state.reviewLoading = null;
            state.userReview = null;
            state.offset = 0;
            state.limit = 10;
            state.isError = false;
            state.isSuccess = false;
            state.hasMore = true;
            state.isLoading = false;
            state.msg = '';
        }
    }, extraReducers: (builder) => {
        // Get Reviews for an app
        builder.addCase(getReviewsByApp.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getReviewsByApp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = [...state.reviews, ...action.payload];
            state.offset = state.offset + state.limit;
            state.hasMore = action.payload.length === state.limit;
        });
        builder.addCase(getReviewsByApp.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create a review
        builder.addCase(createReview.pending, (state, action) => {
            state.reviewLoading = true;
        });
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.reviewLoading = null;
            state.isSuccess = true;
            state.reviews = [action.payload, ...state.reviews];
        });
        builder.addCase(createReview.rejected, (state, action) => {
            state.reviewLoading = null;
            state.isError = true;
            state.msg = action.payload;
        });

        // Delete a review
        builder.addCase(deleteReview.pending, (state, action) => {
            state.reviewLoading = true;
        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.reviewLoading = null;
            state.isSuccess = true;
            state.reviews = state.reviews.filter(review => review._id !== action.payload._id);
        });
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.reviewLoading = null;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});



export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;