import { createSlice } from "@reduxjs/toolkit";

const initialState= false

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state,action){
            const content= action.payload
            return content
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer