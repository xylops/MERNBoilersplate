import React, { Component } from 'react';
//Redux dependencies
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './redux/reducer'

//Component
import PublicLayout from './component/publicLayout'
//View
import MainPage from './view' 
import LoginScreen from './view/loginScreen'
import Dashboard from './view/dashboard'

const history = createBrowserHistory({
    basname: '',
    hashType: 'slash'
  })

let middlewares = []
middlewares.push(thunk);
middlewares.push(logger);

let initialState = {}
let store = createStore(
    rootReducer, 
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
                <PublicLayout>
                    <Switch>
                        <Route exact path="/" render={() => {
                            return <Redirect to="/login"/>
                        }}/>
                        <Route path="/login" render={()=><LoginScreen/> } />
                        <Route path="/dashboard" render={()=><Dashboard/> } />
                        <Route component={NoMatch}/>
                    </Switch>
                </PublicLayout>
            </Provider>
        )
    }
}

const NoMatch = ({ location }) => (
    <div>
        <h3><code>404</code></h3>
    </div>
)

export default App;