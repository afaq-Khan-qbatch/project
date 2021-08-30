import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';

export const get_items = createAsyncThunk(
    "getting_items",
    async () => {
        const { data } = await axios.get('/get_items');
        return data;
    }
)

export const getDescription = createAsyncThunk(
    "getting_Description",
    async (_id , ThunkApi) => {
        try{
            const { data } = await axios.get(`/getDescription/${_id}`);
            return data;
        }catch(e){
            return ThunkApi.rejectWithValue(e.message);
        }
    }
)

const item_slice = createSlice({
    name: "getting_items",
    initialState: {
        data: [],
        Description: [],
        status: null

    },
    extraReducers: {
        [get_items.pending]: (state, action) => ({
            ...state,
            status: 'pending'
        }),
        [get_items.fulfilled]: (state, action) => ({
            ...state,
            data: action.payload,
            status: 'fulfilled'
        }),
        [get_items.rejected]: (state, action) => ({
            ...state,
            status: 'rejected'
        }),
        [getDescription.fulfilled]: (state, action) => {

            state.Description = action.payload;
        },
    },
})

export default item_slice.reducer;