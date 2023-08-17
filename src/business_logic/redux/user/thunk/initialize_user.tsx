import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsername } from "../../../../data/local storage/user";
import { AppError } from "../../../interfaces/errors";

export const initializeUser = createAsyncThunk<string|null ,void,{rejectValue: AppError, fulfilledMeta:void,rejectedMeta:void}>(
    'user/initializeUser',
    async(_, thunkApi) => {
        try{
        var result = await getUsername();
        return thunkApi.fulfillWithValue(result?.name ?? null);
        } catch(e){
            return thunkApi.rejectWithValue(new AppError());
        }
    }
)