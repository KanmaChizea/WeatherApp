import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeUsername } from "../../../../data/local storage/user";
import { UpdateUser, User } from "../user";
import { AppError } from "../../../interfaces/errors";

export const updateUser = createAsyncThunk< UpdateUser, UpdateUser, {rejectValue: AppError, fulfilledMeta: void, rejectMeta:void}>(
    'user/updateUser',
    async(user, thunkApi) => {
        try{
            await storeUsername(user.name, user.image);
           return thunkApi.fulfillWithValue({
            name:user.name,
             image:user.image
            });
        } catch(e){
           return thunkApi.rejectWithValue(new AppError('Could not update user info'));
        }
    }
)