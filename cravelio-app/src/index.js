import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import App from './views/App'
import authReducer from './reducers/authReducer'
import bookingReducer from './reducers/bookingReducer'

const reducers = combineReducers(
    {
        auth: authReducer,
        booking: bookingReducer
    }
)

const reduxStore = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>,
    document.getElementById("root")
)