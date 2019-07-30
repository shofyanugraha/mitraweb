import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
    return (
        <Fragment>
            <section className="Login">
                <h3>Login</h3>
                <p>This will be login page</p>
                <p>
                    <Link className="btn" to="/register">Register</Link>
                </p>
            </section>
        </Fragment>
    );
}

export default Login;