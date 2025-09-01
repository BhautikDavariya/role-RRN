import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiService from "../../helper/axiosHelper"

export const loginApi = createAsyncThunk('auth/loginApi', async (data, { dispatch }) => {
    const apiData = await apiService.post('/login', data)
    localStorage.setItem('token', apiData.data.token)
    return apiData.data
})

export const CreateAccountApi = createAsyncThunk('auth/CreateAccountApi', async (data, { dispatch }) => {
    const apiData = await apiService.post('/create-account', data)
    return apiData.data
})


const authSlice = createSlice({
    initialState: {
        token: null,
    },
    name: 'auth',
    extraReducers: builder => builder.addCase(loginApi.fulfilled, (state, action) => {
        state.token = action.payload.token
    })
})

export default authSlice.reducer;  // export reducer for store