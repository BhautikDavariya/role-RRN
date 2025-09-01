



const userReducer = (state = [], action) => {
    switch (action?.type) {
        case "fetchUsers":
            return [...action.payload];
        default:
            return state;
    }
}

export default userReducer