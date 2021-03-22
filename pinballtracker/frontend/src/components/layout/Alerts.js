import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usePrevious } from '../../hooks/hooks';

const Alerts = (props) => {

    const alert = useAlert();

    const prevMessage = usePrevious(props.message);

    useEffect(() => {
        const error = props.error;
        if (error.msg.name) {
            // name property is an array
            // join to convert the message into a string
            alert.error(`Name: ${error.msg.name.join()}`);
        }
        if (error.msg.city) {
            alert.error(`City: ${error.msg.city.join()}`);
        }
        if (error.msg.street) {
            alert.error(`Street: ${error.msg.street.join()}`);
        }
        if (error.msg.email) {
            alert.error(`Email: ${error.msg.email.join()}`);
        }
        if (error.msg.message) {
            alert.error(`Message: ${error.msg.message.join()}`);
        }
        if (error.msg.non_field_errors) {
            alert.error(error.msg.non_field_errors.join());
        }
        if (error.msg.username) {
            alert.error(error.msg.username.join());
        }
        if (error.msg.coordinates) {
            alert.error('Location with these coordinates already exists.');
        }
        if (error.msg.latlon) {
            alert.error(error.msg.latlon);
        }
    }, [props.error]);

    useEffect(() => {
        const message = props.message;
        if (message !== prevMessage) {
            if (message.addLocation) {
                alert.success(message.addLocation);
            }
            if (message.deleteLead) {
                alert.success(message.deleteLead);
            }
            if (message.addLead) {
                alert.success(message.addLead);
            }
            if (message.passwordsDoNotMatch) {
                alert.error(message.passwordsDoNotMatch);
            }
            if (message.locationChanges) {
                alert.success(message.locationChanges);
            }
            if (message.addBookmark) {
                alert.success(message.addBookmark);
            }
            if (message.deleteBookmark) {
                alert.success(message.deleteBookmark);
            }
        }
    }), [props.message];

    return (
        <Fragment />
    );
};

Alerts.propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(Alerts);