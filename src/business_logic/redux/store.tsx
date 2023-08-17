import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import  user  from './user/user';

const middlewares: any[] =[];

// if(__DEV__){
//     const createDebugger = require("redux-flipper").default;
//     middlewares.push(createDebugger());
// }

export const store = configureStore({
    reducer:{ 
        user
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(middlewares),
}
)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;


