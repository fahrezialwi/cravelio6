import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import App from './components/App'
import authReducer from './reducers/authReducer'

const reducers = combineReducers(
    {
        auth: authReducer
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