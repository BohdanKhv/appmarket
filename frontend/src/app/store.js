import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import developerReducer from '../features/developer/developerSlice';
import appReducer from '../features/app/appSlice';
import localReducer from '../features/local/localSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        developer: developerReducer,
        app: appReducer,
        local: localReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});