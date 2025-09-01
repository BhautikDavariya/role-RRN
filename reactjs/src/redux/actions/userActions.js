import apiService from "../../helper/axiosHelper"


export const fetchUsers = (data) => async (dispatch) => {
    const apiData = await apiService.get('/users', data)
    dispatch({
        type: 'fetchUsers',
        payload: apiData.data
    })
    return apiData.data
}



export const createUser = (data) => async (dispatch) => {
    const apiData = await apiService.post('/users/add', data)
    dispatch({
        type: 'createUser',
        payload: apiData.data
    })
}


export const updateUser = (id, data) => async (dispatch) => {
    const apiData = await apiService.put(`/users/${id}`, data)
    dispatch({
        type: 'updateUser',
        payload: apiData.data
    })
    return apiData.data
}

export const deleteUser = (id) => async (dispatch) => {
    const apiData = await apiService.delete(`/users/${id}`)
    dispatch({
        type: 'deleteUser',
        payload: apiData.data
    })
    dispatch(fetchUsers())
}

export const getByIdUser = (id) => async (dispatch) => {
    const apiData = await apiService.get(`/users/${id}`)
    return apiData.data
}