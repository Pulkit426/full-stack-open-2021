import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationForVote(state,action){
            const content = action.payload
            return `you voted '${content}'`
        },

        setNotificationForAdd(state,action){
            const content = action.payload
            return `you added '${content}'`
        },

        removeNotification(state,action){

            return ``
        }
    }

})

export const {setNotificationForAdd,setNotificationForVote, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer