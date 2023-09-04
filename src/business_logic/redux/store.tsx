import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import  userReducer  from './user/user';
import homeWeatherReducer from './weather/home_weather';

const middlewares: any[] =[];

// if(__DEV__){
//     const createDebugger = require("redux-flipper").default;
//     middlewares.push(createDebugger());
// }

export const store = configureStore({
    reducer:{ 
        user:userReducer,
        homeWeather:homeWeatherReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
}
)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;


