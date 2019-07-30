import React, { Component} from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Auth.css';
import Register from './Register/Register';

class Auth extends Component {
    state = {
        auth : false
    }

    render () {
        return (
            <div className="Auth">
                <Switch>
                    <Route path="/" component={Register}/>
                    {/* <Route path="/login" component /> */}
                    <Route render={() => <h1>Not found</h1>}/>
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Auth;