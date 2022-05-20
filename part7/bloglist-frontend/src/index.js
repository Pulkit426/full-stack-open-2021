import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import {
    BrowserRouter as Router
  } from "react-router-dom"

const store = configureStore({
    reducer: {
        blogs : blogReducer,
        users : usersReducer,
        notification : notificationReducer 
    }
})
ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
    <Router>
    <App />
    </Router>

</Provider>
);
