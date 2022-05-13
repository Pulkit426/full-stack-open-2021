import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
       showNotification(state,action){
            const content = action.payload
            return content
        },

        removeNotification(state,action){

            return ``
        }
    }

})

export const {showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification,time) => {
    return dispatch => {
        dispatch(showNotification(notification))
        setTimeout(() => dispatch(removeNotification()), time)
    }
}

export default notificationSlice.reducer