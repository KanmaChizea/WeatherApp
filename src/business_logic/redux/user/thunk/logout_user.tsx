import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUsername } from "../../../../data/local storage/user";
import { AppError } from "../../../interfaces/errors";

export const logoutUser = createAsyncThunk< string, void, {rejectValue: AppError, fulfilledMeta: void, rejectMeta:void}>(
    'user/logoutUser',
    async (_,thunkApi) => {
        try {
            await deleteUsername();
           return thunkApi.fulfillWithValue('');
        } catch(e) {
           return thunkApi.rejectWithValue(new AppError('Could not logout'));
        }
    }
)