import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';

export const get_items = createAsyncThunk(
    "getting_items",
    async () => {
        const item = await axios.get('/get_items');
        return item;
    }
)

const item_slice = createSlice({
    name: "getting_items",
    initialState: {
        data: [],
    },
    extraReducers: {

        [get_items.fulfilled]: (state, action) => {

            state.data = action.payload.data;
        },

    }
})

export default item_slice.reducer;