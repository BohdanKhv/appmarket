import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import developerReducer from '../features/developer/developerSlice';
import appReducer from '../features/app/appSlice';
import ratingReducer from '../features/rating/ratingSlice';
import localReducer from '../features/local/localSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        developer: developerReducer,
        app: appReducer,
        rating: ratingReducer,
        local: localReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});