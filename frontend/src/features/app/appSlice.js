import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appService from './appService';


const initialState = {
    apps: [],
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
            return await appService.getApp(domain);
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


// Create slice
const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        // Reset apps state
        resetApp: (state) => {
            state.apps = [];
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
        // get app by domain name
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
            state.isLoading = true;
        });
        builder.addCase(getApp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apps = [...state.apps, ...action.payload];
            state.offset = state.offset + state.limit;
            state.hasMore = action.payload.length === state.limit;
        });
        builder.addCase(getApp.rejected, (state, action) => {
            state.isLoading = false;
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
    }
});



// Export reducer
export const { resetApp } = appSlice.actions;
export default appSlice.reducer;