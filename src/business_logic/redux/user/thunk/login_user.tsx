import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeUsername } from "../../../../data/local storage/user";
import {User} from "../user"
import { AppError } from "../../../interfaces/errors";

export const loginUser = createAsyncThunk<User ,string, {rejectValue: AppError, fulfilledMeta: void, rejectMeta:void}>(
    'user/loginUser',
    async(enteredName,thunkApi) => {
        try{
            const result = await storeUsername(enteredName);
            return thunkApi.fulfillWithValue({name:enteredName})
        } catch(e){
            return thunkApi.rejectWithValue(new AppError('Could not save user name. Please try again'));
        }
    }
)