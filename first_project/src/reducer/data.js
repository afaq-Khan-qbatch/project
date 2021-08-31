import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';
import { getCookie, setCookie } from '../cookie';

export const get_items = createAsyncThunk(
    "getting_items",
    async () => {
        const { data } = await axios.get('/get_items');
        //console.log(data);
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

export const siguUP = createAsyncThunk(
    'signUP',
    async(user_data , ThunkApi) =>{
        console.log("signup", user_data);
        try{
            const config = {
                method: 'POST',
                url: '/auth/signup',
                data: user_data
            }
            const { data } = axios(config);
            return data;
        }catch{
            return ThunkApi.rejectWithValue(e.message);
        }
    }
)

export const signIn = createAsyncThunk(
    'signIn',
    async(user_data , ThunkApi) =>{
        console.log("signin ", user_data);
        try{
            const config = {
                method: 'POST',
                url: '/auth/login',
                data: user_data
            }
            const data = await axios(config);
            console.log("data", data.data);
            return data.data;
        }catch{
            return ThunkApi.rejectWithValue(e.message);
        }
    }
)


const item_slice = createSlice({
    name: "getting_items",
    initialState: {
        data: [],
        Description: [],
        status: null,
        signUP: null,
        signIN: null,
        islogin: false
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
        [siguUP.panding]: (state , action) =>({
            ...state,
            signUP: 'pandind'
        }),
        [siguUP.fulfilled]: (state , action) =>({
            ...state,
            signUP: action.payload
        }),
        [siguUP.rejected]: (state , action) =>({
            ...state,
            signUP: 'rejected'
        }),

        [signIn.panding]: (state , action) =>({
            ...state,
            signIN: 'pandind'
        }),
        [signIn.fulfilled]: (state , action) =>
        {
            console.log("action", action)
            setCookie('token' , action.payload.token);
            return {
            ...state,
            signIN: true,
        }},
        [signIn.rejected]: (state , action) =>({
            ...state,
            signIN: 'rejected'
        }),
    },
})

export default item_slice.reducer;