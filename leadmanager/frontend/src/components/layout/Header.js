import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Header = (props) => {

    const { isAuthenticated, user } = props.auth;

    const AuthLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
                <strong>
                    {user ? `Welcome ${user.username}` : ""}
                </strong>
            </span>
            <li className="nav-item">
                <button onClick={props.logout} className="nav-link btn btn-info btn-sm text-light">
                    Logout
                </button>
            </li>
        </ul>
    );

    const GuestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
        </ul>
    );

    return(
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Lead Manager</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    {isAuthenticated ? AuthLinks : GuestLinks}
                </div>
            </div>
        </nav>        
    )
};

// {/* <form className="d-flex">
//                         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//                         <button className="btn btn-outline-success" type="submit">Search</button>
//                     </form> */}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);