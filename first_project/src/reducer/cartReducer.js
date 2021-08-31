import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';

export const get_cart = createAsyncThunk(
    "getting_cart",
    async (id) => {
        console.log(id);
        const { data } = await axios.get(`/get_cart/${id}`);
        console.log("data get_cart: " , data);
        return data;
    }
)

export const delete_cart = createAsyncThunk(
    "delete_cart",
    async (Id, ThunkAPI) => {
        const config = {
            method: 'DELETE',
            url: '/delete_cart',
            data: { "items_Id": Id }
        }
        const { data } = await axios(config);
        return data;
    }
)

export const addInCart = createAsyncThunk(
    "add_to_cart",
    async (userdata , ThunkApi) => {
        console.log('id', userdata);
        const config = {
            method: 'POST',
            url: '/save_to_cart',
            data: {id: userdata.id , userId: userdata.userId}
        }
        try {
            const { data } = await axios(config);
            console.log(data);
            return data;
        } catch (e) {
            return ThunkApi.rejectWithValue(e.message);
        }
    }
)

const cart_slice = createSlice({
    name: "cart_items",
    initialState: {
        count: 0,
        cart_item: [],
    },
    extraReducers: {

        [get_cart.fulfilled]: (state, action) => {
            state.cart_item = action.payload;
            state.count = 0;
            action.payload.forEach(element => {
                state.count = state.count + element.quantity;
            })
        },
        [delete_cart.fulfilled]: (state, action) => {
            state.cart_item = state.cart_item.filter(element => {
                return action.payload._id !== element._id
            })
        },
    },
    reducers: {

        setCount: (state, action) => {
            state.count = state.count + action.payload;
        },

    }
})

export const { setCount } = cart_slice.actions;
export default cart_slice.reducer;