import { combineReducers } from 'redux'
import userReducer from './reducer/userReducer'
import authReducer from './reducer/authReducer'


const rootReducer = combineReducers({
    // add reducers here
    auth: authReducer,
    users: userReducer
})

export default rootReducer