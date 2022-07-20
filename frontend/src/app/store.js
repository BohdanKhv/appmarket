import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import localReducer from '../features/local/localSlice';


export const store = configureStore({
    reducer: {
        app: appReducer,
        local: localReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});