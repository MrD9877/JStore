'use client'
import { Provider } from 'react-redux'
import { makeStore } from './Store'

const StoreProvider = ({ children }) => {

    return <Provider store={makeStore}>{children}</Provider>
}

export default StoreProvider