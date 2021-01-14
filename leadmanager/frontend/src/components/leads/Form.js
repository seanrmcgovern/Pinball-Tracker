import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';
import { usePrevious } from '../../hooks/hooks';

const Form = (props) => {

    const [lead, setLead] = useState({
        name: '',
        email: '',
        message: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        props.addLead(lead);
    };

    const onChange = (e) => {
        setLead({ ...lead, [e.target.name]: e.target.value })
    };

    const prevMessage = usePrevious(props.message);
    useEffect(() => {
        if(props.message !== prevMessage) {
            if (props.message.addLead) {
                setLead({name: '', email: '', message: ''});  
            }
        }
    }), [props.message];

    return (
        <div className="card card-body mt-4 mb-4">
            <h2>Add Lead</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={onChange}
                        value={lead.name}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={onChange}
                        value={lead.email}
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="message"
                        onChange={onChange}
                        value={lead.message}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

Form.propTypes = {
    addLead: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    message: state.messages
});

export default connect(mapStateToProps, { addLead })(Form);