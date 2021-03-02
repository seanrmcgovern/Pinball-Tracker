import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = (props) => {

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        props.login(state.username, state.password);
    };

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value});
    };

    if (props.isAuthenticated) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={onChange}
                            value={state.username}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={onChange}
                            value={state.password}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <h6 className="font-weight-normal text-muted">
                        Don't have an account? 
                        <Link to="/register" style={{textDecoration: "none"}}> Register</Link>
                    </h6>
                </form>
            </div>
        </div>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);