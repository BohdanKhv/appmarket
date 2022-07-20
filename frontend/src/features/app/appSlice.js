import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appService from './appService';


const initialState = {
    apps: [],
    isLoading: false,
    isUpdating: false,
    isError: false,
    isSuccess: false,
    offset: 0,
    limit: 30,
    hasMore: true,
    msg: '',
};


// Get jobs
export const getApps = createAsyncThunk(
    'app/getApps',
    async (data, thunkAPI) => {
        try {
            // const { offset } = thunkAPI.getState().job;
            // return await appService.getApps({...data, offset});
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
const jobsSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        // ResetJobs state
        resetApps: (state) => {
            state.apps = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.isUpdating = false;
            state.offset = 0;
            state.limit = 30;
            state.hasMore = true;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // get apps
        builder.addCase(getApps.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getApps.fulfilled, (state, action) => {
            state.isLoading = false;
            state.jobs = [...state.jobs, ...action.payload];
            state.offset = state.offset + state.limit;
            state.hasMore = action.payload.length === state.limit;
        });
        builder.addCase(getApps.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});



// Export reducer
export const { resetApps } = jobsSlice.actions;
export default jobsSlice.reducer;