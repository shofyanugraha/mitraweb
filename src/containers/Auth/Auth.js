import React, { Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './Auth.css';
import Register from './Register/Register';
import Login from './Login/Login';

class Auth extends Component {
    render () {
        return (
            <div className="Auth">
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Redirect from="/" to="/register" />
                    <Route render={() => <h1>Not found</h1>}/>
                    
                </Switch>
            </div>
        );
    }
}

export default Auth;