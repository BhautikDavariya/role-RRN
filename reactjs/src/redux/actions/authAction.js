import apiService from "../../helper/axiosHelper"


export const loginApi = (data) => async (dispatch) => {
    const apiData = await apiService.post('/login', data)
    localStorage.setItem('token', apiData.data.token)
    dispatch({
        type: 'LOGIN',
        payload: apiData.data
    })
    return apiData.data
}

export const CreateAccountApi = (data) => async (dispatch) => {
    const apiData = await apiService.post('/create-account', data)
    dispatch({
        type: 'CreateAccount',
        payload: apiData.data
    })
    return apiData.data
}