import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appService from './appService';
import { createReview, deleteReview, deleteRating, rateApp } from '../rating/ratingSlice';


const initialState = {
    apps: [],
    detailedApp: null,
    appLoading: null,
    isLoading: false,
    isUpdating: false,
    isError: false,
    isSuccess: false,
    updateSuccess: false,
    offset: 0,
    limit: 30,
    hasMore: true,
    msg: '',
};


// Get all apps created by logged in user
export const getMe = createAsyncThunk(
    'app/getMe',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.getMe(token);
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


// Get app by domain name
export const getApp = createAsyncThunk(
    'app/getApp',
    async (domain, thunkAPI) => {
        try {
            const token = thunkAPI.getState()?.user?.user?.token || null;
            return await appService.getApp(domain, token);
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


// Get app by domain name
export const getDeveloperApps = createAsyncThunk(
    'app/getDeveloperApps',
    async (id, thunkAPI) => {
        try {
            const { limit, offset } = thunkAPI.getState().app;
            return await appService.getDeveloperApps({ id, limit, offset });
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


// Get app by domain name
export const getAppsByCategory = createAsyncThunk(
    'app/getAppsByCategory',
    async (category, thunkAPI) => {
        try {
            const { limit, offset } = thunkAPI.getState().app;
            return await appService.getAppsByCategory({ category, limit, offset });
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


// Search apps
export const getAppsBySearch = createAsyncThunk(
    'app/getAppsBySearch',
    async (query, thunkAPI) => {
        try {
            const { limit, offset } = thunkAPI.getState().app;
            return await appService.getAppsBySearch({ query, limit, offset });
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


// Create app
export const createApp = createAsyncThunk(
    'app/createApp',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.createApp(data, token);
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


// Create app
export const updateAppMeta = createAsyncThunk(
    'app/updateAppMeta',
    async (domain, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.updateAppMeta(domain, token);
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


// Create app
export const updateApp = createAsyncThunk(
    'app/updateApp',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.updateApp(data, token);
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


// Delete app
export const deleteApp = createAsyncThunk(
    'app/deleteApp',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.deleteApp(data, token);
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
export const addToList = createAsyncThunk(
    'app/addToList',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.addToList(data, token);
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
export const removeFromList = createAsyncThunk(
    'app/removeFromList',
    async (appId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await appService.removeFromList(appId, token);
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


// Create slice
const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        // Reset apps state
        resetApp: (state) => {
            state.apps = [];
            state.detailedApp = null;
            state.appLoading = null;
            state.isError = false;
            state.isSuccess = false;
            state.updateSuccess = false;
            state.isLoading = false;
            state.isUpdating = false;
            state.offset = 0;
            state.limit = 30;
            state.hasMore = true;
            state.msg = '';
        },
    }, extraReducers: (builder) => {
        // get get my apps
        builder.addCase(getMe.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apps = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get app by domain name
        builder.addCase(getApp.pending, (state, action) => {
            state.appLoading = action.meta.arg;
        });
        builder.addCase(getApp.fulfilled, (state, action) => {
            state.appLoading = null;
            state.detailedApp = action.payload.app;
            state.detailedApp.userReview = action.payload.userReview;
            state.detailedApp.userFavorite = action.payload.userFavorite;
        });
        builder.addCase(getApp.rejected, (state, action) => {
            state.appLoading = null;
            state.isError = true;
            state.msg = action.payload;
        });

        // get apps by developer id
        builder.addCase(getDeveloperApps.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getDeveloperApps.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apps = [...state.apps, ...action.payload];
            state.offset = state.offset + state.limit;
            state.hasMore = action.payload.length === state.limit;
        });
        builder.addCase(getDeveloperApps.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get apps by category
        builder.addCase(getAppsByCategory.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAppsByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apps = [...state.apps, ...action.payload];
            state.offset = state.offset + state.limit;
            state.hasMore = action.payload.length === state.limit;
        });
        builder.addCase(getAppsByCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Search apps
        builder.addCase(getAppsBySearch.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAppsBySearch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apps = [...state.apps, ...action.payload];
            state.offset = state.offset + state.limit;
            state.hasMore = action.payload.length === state.limit;
        });
        builder.addCase(getAppsBySearch.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create app
        builder.addCase(createApp.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(createApp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.apps.push(action.payload);
        });
        builder.addCase(createApp.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Update app's meta
        builder.addCase(updateAppMeta.pending, (state, action) => {
            state.isSuccess = false;
            state.appLoading = state.apps.find(app => app.domain === action.meta.arg).domain;
            state.isError = false;
            state.msg = '';
            state.updateSuccess = false;
        });
        builder.addCase(updateAppMeta.fulfilled, (state, action) => {
            state.appLoading = null;
            const index = state.apps.findIndex(app => app._id === action.payload._id);
            state.apps[index] = action.payload;
            state.updateSuccess = true;
        });
        builder.addCase(updateAppMeta.rejected, (state, action) => {
            state.appLoading = null;
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Update app
        builder.addCase(updateApp.pending, (state, action) => {
            state.appLoading = state.apps.find(app => app.domain === action.meta.arg).domain;
            state.isSuccess = false;
            state.isError = false;
            state.msg = '';
            state.updateSuccess = false;
        });
        builder.addCase(updateApp.fulfilled, (state, action) => {
            state.appLoading = null;
            const index = state.apps.findIndex(app => app._id === action.payload._id);
            state.apps[index] = action.payload;
            state.updateSuccess = true;
        });
        builder.addCase(updateApp.rejected, (state, action) => {
            state.appLoading = null;
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // delete app
        builder.addCase(deleteApp.pending, (state, action) => {
            state.appLoading = state.apps.find(app => app.domain === action.meta.arg).domain;
            state.isSuccess = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(deleteApp.fulfilled, (state, action) => {
            state.appLoading = null;
            state.apps = state.apps.filter(app => app._id !== action.payload._id);
        });
        builder.addCase(deleteApp.rejected, (state, action) => {
            state.appLoading = null;
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        builder.addCase(rateApp.fulfilled, (state, action) => {
            state.detailedApp.userReview.rating = action.payload.userRating;
            state.detailedApp.upVotes = action.payload.appUpvote;
            state.detailedApp.downVotes = action.payload.appDownvote;
        });

        builder.addCase(deleteRating.fulfilled, (state, action) => {
            state.detailedApp.userReview.rating = '0';
            state.detailedApp.upVotes = action.payload.appUpvote;
            state.detailedApp.downVotes = action.payload.appDownvote;
            state.msg = action.payload;
        });

        builder.addCase(addToList.fulfilled, (state, action) => {
            state.detailedApp.userFavorite = true;
            state.detailedApp.favorites = state.detailedApp.favorites + 1;
        });

        builder.addCase(removeFromList.fulfilled, (state, action) => {
            state.detailedApp.userFavorite = false;
            state.detailedApp.favorites = state.detailedApp.favorites - 1;
            state.msg = action.payload;
        });

        builder.addCase(createReview.fulfilled, (state, action) => {
            state.detailedApp.userReview.review = action.payload.review.review;
            state.detailedApp.reviews = state.detailedApp.reviews + 1;
        });

        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.detailedApp.userReview.review = undefined;
            state.detailedApp.reviews = state.detailedApp.reviews - 1;
        });
    }
});



// Export reducer
export const { resetApp } = appSlice.actions;
export default appSlice.reducer;