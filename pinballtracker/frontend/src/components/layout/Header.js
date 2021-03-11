import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Header = (props) => {

    const { isAuthenticated, user } = props.auth;

    const AuthLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/explore" className="nav-link">
                    Explore
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/locations" className="nav-link">
                    Locations
                </Link>
            </li>
            {/* <li className="nav-item mr-3">
                <Link to="/profile" className="nav-link">
                    Profile
                </Link>
            </li> */}
            <span className="navbar-text mr-3">
                <strong>
                    {user ? `Welcome ${user.username}` : ""}
                </strong>
            </span>
            <li className="nav-item">
                <button onClick={props.logout} className="nav-link btn btn-info btn-sm"> 
                    Logout
                </button>
            </li>
        </ul>
    );

    const GuestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/explore" className="nav-link">
                    Explore
                </Link>
            </li>
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
        // navbar-light bg-light
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <a className="navbar-brand nav-link" href="#">Pinball Tracker</a> */}
                <Link to="/" className="nav-link navbar-brand">
                    Pinball Tracker
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    {isAuthenticated ? AuthLinks : GuestLinks}
                </div>
            </div>
        </nav>        
    )
};

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);