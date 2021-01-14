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
            alert.error(`Name: ${props.error.msg.name.join()}`);
        }
        if (error.msg.email) {
            alert.error(`Email: ${props.error.msg.email.join()}`);
        }
        if (error.msg.message) {
            alert.error(`Message: ${props.error.msg.message.join()}`);
        }
    }, [props.error]);

    useEffect(() => {
        const message = props.message;
        if (message !== prevMessage) {
            if (message.deleteLead) {
                alert.success(message.deleteLead);
            }
            if (message.addLead) {
                alert.success(message.addLead);
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