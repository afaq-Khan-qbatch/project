import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from './axios.js';

export const get_cart = createAsyncThunk(
    "getting_cart",
    async()=>{
        const item = await axios.get('/get_cart');
        //console.log(item , "ok");
        return item.data;
    }
)

export const delete_cart = createAsyncThunk(
    "delete_cart",
    async(Id , ThunkAPI)=>{
        const config = {
            method: 'DELETE',
            url: '/delete_cart',
            data:{"items_Id": Id}
        }
        //console.log(Id)
        const {data} = await axios(config);
        return data;
    }
)

const cart_slice = createSlice({
    name: "cart_items",
    initialState:{
        count: 0,
        cart_item: [],
    },
    extraReducers:{
        
      
        [get_cart.fulfilled]: (state , action) => {
            state.cart_item = action.payload;
            state.count = 0;
            console.log("cart red");
            action.payload.forEach(element =>{
                state.count = state.count + element.quantity;
            })
        },
        [delete_cart.fulfilled]: (state , action)=>{
            state.cart_item = state.cart_item.filter(element =>{
                return action.payload._id !== element._id
            })
        },
    },
    reducers:{
        
        setCount: (state , action) => {
          state.count = state.count + action.payload;
        },
        
    }
})

export const { setCount } = cart_slice.actions; 
export default cart_slice.reducer;