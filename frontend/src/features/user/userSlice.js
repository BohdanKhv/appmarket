import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDeveloper } from '../developer/developerSlice';
import userService from './userService';


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// Register user
export const register = createAsyncThunk(
    'user/register',
    async (user, thunkAPI) => {
        try {
            return await userService.register(user);
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


// Log out
export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await userService.logout();
    }
);


// Login
export const login = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
        try {
            return await userService.login(user);
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


// Edit user
export const updateUser = createAsyncThunk(
    'user/edit',
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await userService.updateUser(userData, token);
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


// Sent reset password email
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (data, thunkAPI) => {
        try {
            return await userService.forgotPassword(data);
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


// Create new password
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (data, thunkAPI) => {
        try {
            return await userService.resetPassword(data);
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
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reset state
        resetUser: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // Register user
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.user = null;
        });

        // Log out
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
        });

        // Login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
            state.isSuccess = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.user = null;
        });

        // Edit user
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Send User password email
        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.msg = action.payload.msg;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create new password
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload.msg;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Become developer
        builder.addCase(createDeveloper.fulfilled, (state, action) => {
            state.user.type = 'developer';
            const local = JSON.parse(localStorage.getItem('user'));
            local.type = 'developer';
            localStorage.setItem('user', JSON.stringify(local));
        });
    }
});


// Export reducer
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;