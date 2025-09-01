



const authReducer = (state = {
    token: null
}, action) => {
    switch (action?.type) {
        case "LOGIN":
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

export default authReducer