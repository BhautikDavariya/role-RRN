"use client"
import React from 'react'
import { Provider } from 'react-redux'
import rootReducer from './reducer/rootReducer'

const ReduxStore = ({ children }) => {
    const store = rootReducer
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxStore
