import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiService from "../../helper/axiosHelper"

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (data, { dispatch }) => {
    const apiData = await apiService.get('/users', data)
    return apiData.data
})

export const createUser = createAsyncThunk('user/createUser', async (data, { dispatch }) => {
    const apiData = await apiService.post('/users/add', data)
    return apiData.data
})

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, data }, { dispatch }) => {
    const apiData = await apiService.put(`/users/${id}`, data)
    return apiData.data
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { dispatch }) => {
    const apiData = await apiService.delete(`/users/${id}`)
    dispatch(fetchUsers())
    return apiData.data
})

export const getByIdUser = createAsyncThunk('user/getByIdUser', async (id, { dispatch }) => {
    const apiData = await apiService.get(`/users/${id}`)
    return apiData.data
})


const userSlice = createSlice({
    initialState: {
        users: [],
    },
    name: 'user',
    extraReducers: builder => builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
    })
})

export default userSlice.reducer;  // export reducer for store