import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import App from './App'
import LoginComponent from "./auth/LoginComponent";

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" component={LoginComponent} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;