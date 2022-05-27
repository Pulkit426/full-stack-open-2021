import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const usersSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        setUsers(state,action){
            console.log('INSIDE SETUSERS')
            state = action.payload
            return state
        },

        appendUser(state,action){
            const user= action.payload

            return state.concat(user)
        },

        setToken(state,action){
            console.log('INSIDE SETTOKEN')
            const user = action.payload
            blogService.setToken(user.token)
        }
    }
})

export const {setUsers, appendUser, setToken} = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    console.log("LOGGED USER", loggedUser)
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUsers(user))
      blogService.setToken(user.token);
    }
    }
}

export const login = (username, password) => {
    return async dispatch => {
      const userLogged = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(userLogged));
      console.log("INSIDE LOGIN", userLogged)
      dispatch(setUsers(userLogged))
      dispatch(setToken(userLogged))
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(setUsers(null))
        blogService.setToken(null);
    }
}

export default usersSlice.reducer