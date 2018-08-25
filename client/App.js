import React, { Component } from 'react';
//Redux dependencies
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './redux/reducer'

//View
import MainPage from './view' 

const history = createBrowserHistory()

let middlewares = []
middlewares.push(thunk);
middlewares.push(logger);
middlewares.push(routerMiddleware(history))

let initialState = {}
let store = createStore(
    connectRouter(history)(rootReducer), 
    initialState, 
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path={'/'} component={()=><MainPage/> } />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App;