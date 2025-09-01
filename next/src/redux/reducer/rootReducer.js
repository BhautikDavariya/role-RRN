import { configureStore } from "@reduxjs/toolkit";
import authSlice from './../actions/authAction'
import userSlice from './../actions/userActions'



const rootReducer = configureStore({
    reducer: {
        // add reducers here
        auth: authSlice,
        users: userSlice
    },
    middleware: (GetDefaultEnhancersOptions) => GetDefaultEnhancersOptions({
        serializableCheck: false,
        thunk: {
            extraArgument: ""
        }
    })
})

export default rootReducer