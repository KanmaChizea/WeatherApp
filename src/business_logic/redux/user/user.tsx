import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initializeUser } from "./thunk/initialize_user";
import { loginUser } from "./thunk/login_user";
import { AppError } from "../../interfaces/errors";
import { logoutUser } from "./thunk/logout_user";
import { updateUser } from "./thunk/update_user";

export interface User {
    name: string;
    image?: string;
}
export interface UpdateUser {
    name?: string;
    image?: string;
}

interface UserState {
    user?:User,
    error?:AppError,
    loading:boolean,
}
export const initialState: UserState = {
    error:undefined,
    loading:false,
     
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}, 
    extraReducers:(builder)=>{
        builder.addCase(initializeUser.fulfilled, (state, action)=>{
            if(action.payload !== null){
                 state.user = {name: action.payload };
                 state.loading = false;
                } else {
                    state.loading = false;

                }
        });
        builder.addCase(initializeUser.pending, (state,action)=>{
            state.loading = true;
        });
        builder.addCase(initializeUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = {name: action.payload.name}
            state.loading = false;
        });
        builder.addCase(loginUser.pending, (state,action)=>{
            state.loading = true;
        });
        builder.addCase(loginUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.user = undefined;
            state.loading = false;
        });
        builder.addCase(logoutUser.pending, (state,action)=>{
            state.loading = true;
        });
        builder.addCase(logoutUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const newUser = {
                name: action.payload.name ?? state.user?.name,
                image: action.payload.image ?? state.user?.image,
            }
            state.loading = false;
        });
        builder.addCase(updateUser.pending, (state,action)=>{
            state.loading = true;
        });
        builder.addCase(updateUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        });
    }
})

export const selectUser =(state: RootState)=> state.user.user
export const selectUserLoading =(state: RootState)=> state.user.loading
export const selectUserError =(state: RootState)=> state.user.error 



export default userSlice.reducer;


