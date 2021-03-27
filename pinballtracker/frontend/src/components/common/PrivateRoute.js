import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route 
        {...rest} 
        render={props => {
            if (auth.isLoading) {
                return (
                    <div className="text-center d-flex justify-content-center mt-5">
                        <div className="spinner-border text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            } else if (auth.isAuthenticated) {
                return <Component {...props} />
            } else {
                return <Redirect to="/login" />
            }
        }}
     />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);