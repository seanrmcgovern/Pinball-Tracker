import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import Footer from '../layout/Footer';
import PropTypes from 'prop-types';

const Home = (props) => {

    const { isAuthenticated, user } = props.auth;

    return (
        <Fragment>
            <Parallax strength={500} bgImage={require('../../images/pinballmachine0.jpg')} bgImageStyle={{opacity: 0.6}} blur={1}>
                <div style={{ height: '75vh', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                    <h1 className="text-light display-3" style={{textShadow: '0 4px 0 #756B6C'}}>Discover pinball machines near you!</h1>
                </div>
            </Parallax>
            <Parallax>
                <div style={{ height: '50vh', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <h1 className="display-4" style={{color: "#00B875"}}>Features thousands of crowdsourced locations</h1>
                    <div class="d-flex justify-content-center">
                        {!isAuthenticated && (
                            <Fragment>
                                <Link to="/register">
                                    <button className="btn btn-outline-primary btn-lg rounded mr-5" style={{paddingLeft: 50, paddingRight: 50}}>
                                        Sign Up
                                    </button>
                                </Link>
                                <Link to="/login">
                                    <button className="btn btn-primary btn-lg rounded" style={{paddingLeft: 50, paddingRight: 50}}>
                                        Login
                                    </button>
                                </Link>
                            </Fragment>
                        )}
                    </div>
                </div>
            </Parallax>
            <Parallax strength={500} bgImage={require('../../images/pinball0.jpg')} bgImageStyle={{opacity: 0.8}} blur={1}>
                <div style={{ height: '75vh', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                    <h1 className="text-light display-4" style={{textShadow: '0 4px 0 #756B6C'}}>Save your favorite locations</h1>
                </div>
            </Parallax>
            <Parallax>
                <div style={{ height: '50vh', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <h1 className="display-4" style={{color: "#00B875"}}>Know the details before you go.</h1>
                </div>
            </Parallax>
            <Parallax strength={500} bgImage={require('../../images/pinballmachine1.jpg')} bgImageStyle={{opacity: 0.8}} blur={1}>
                <div style={{ height: '75vh', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                    <h1 className="text-light display-4" style={{textShadow: '0 3px 0 #4B3C3E'}}>Submit new machines for the Pinball Tracker community!</h1>
                </div>
            </Parallax>
            <Parallax>
                <div style={{ height: '50vh', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <h1 className="display-4" style={{color: "#00B875"}}>Project inspired by the <a href="https://pinballmap.com/api/v1/docs/1.0" target="_blank">Pinball Map API</a></h1>
                </div>
            </Parallax>
            <Parallax bgImage={require('../../images/pinball1.jpg')}>
                <div style={{ height: '75vh' }} />
            </Parallax>
            <Footer/>
        </Fragment>
    );
};

Home.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);