import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localService from './localService';


// get theme from local storage
const theme = localStorage.getItem('theme');


const initialState = {
    theme: theme ? theme : 'light',
    ethPrice: 0,
}




const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
    extraReducers: (builder) => {
        // Fetch eth price
    }
});


export const { setTheme } = localSlice.actions;
export default localSlice.reducer;