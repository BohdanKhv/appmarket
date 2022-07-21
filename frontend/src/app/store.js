import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import localReducer from '../features/local/localSlice';
import userReducer from '../features/user/userSlice';


export const store = configureStore({
    reducer: {
        app: appReducer,
        local: localReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});