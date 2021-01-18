import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

const Register = (props) => {

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = state;
        if (password !== password2) {
            props.createMessage({ passwordsDoNotMatch: "Passwords do not match"});
        } else {
            const newUser = {
                username,
                password,
                email
            }
            props.register(newUser);
        }
    };

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value});
    };

    if (props.isAuthenticated) {
        return (<Redirect to="/" />)
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
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
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={onChange}
                            value={state.email}
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
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            onChange={onChange}
                            value={state.password2}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                    <p>
                        Already have an account? 
                        <Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);