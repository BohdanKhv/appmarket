import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import developerService from "./developerService";


const initialState = {
    developer: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: "",
};


// get me
export const getMe = createAsyncThunk(
    "developer/getMe",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await developerService.getMe(token);
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


// get developer by id
export const getDeveloper = createAsyncThunk(
    "developer/getDeveloper",
    async (id, thunkAPI) => {
        try {
            return await developerService.getDeveloper(id);
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


// create developer
export const createDeveloper = createAsyncThunk(
    "developer/createDeveloper",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await developerService.createDeveloper(data, token);
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


// create developer
export const updateDeveloper = createAsyncThunk(
    "developer/updateDeveloper",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await developerService.updateDeveloper(data, token);
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


const developerSlice = createSlice({
    name: "developer",
    initialState,
    reducers: {
        resetDeveloper: (state) => {
            state.developer = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
        }
    },
    extraReducers: (builder) => {
        // get me
        builder.addCase(getMe.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.developer = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.msg = "";
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // get developer by id
        builder.addCase(getDeveloper.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
        });
        builder.addCase(getDeveloper.fulfilled, (state, action) => {
            state.developer = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.msg = "";
        });

        // create developer
        builder.addCase(createDeveloper.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
        });
        builder.addCase(createDeveloper.fulfilled, (state, action) => {
            state.developer = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.msg = "";
        });
        builder.addCase(createDeveloper.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // update developer
        builder.addCase(updateDeveloper.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
        });
        builder.addCase(updateDeveloper.fulfilled, (state, action) => {
            state.developer = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.msg = "";
        });
        builder.addCase(updateDeveloper.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });
    }
});


export const { resetDeveloper } = developerSlice.actions;
export default developerSlice.reducer;