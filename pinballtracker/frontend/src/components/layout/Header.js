import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import headerLogo from '../../images/headerLogo.png';

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
            <li className="nav-item mr-3">
                <Link to="/profile" className="nav-link">
                    Profile
                </Link>
            </li>
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

    const [isCollapsed, setIsCollapsed] = useState(true);

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{height: isCollapsed ? '7.5vh' : '100%', minHeight: '50px'}}>
            <div className="container-fluid">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="nav-link navbar-brand" >
                    <img src={headerLogo} style={{height: "40px", width: "40px", marginRight: 10}}/>
                    <div style={{ display: "inline-block"}}>Pinball Tracker</div>
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