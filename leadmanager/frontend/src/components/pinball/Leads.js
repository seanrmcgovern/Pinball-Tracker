import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from  '../../actions/leads';

const Leads = (props) => {

    // leads come down from reducer as a prop
    useEffect(() => {
        props.getLeads();
    }, []);

    return (
        <div>
            <h2>Leads</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.leads.map((lead, index) => (
                        <tr key={index}>
                            <td>{lead.id}</td>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.message}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => props.deleteLead(lead.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

Leads.propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
}

// maps redux state to component props
// state.leads = leads reducer
// .leads = state of the leads reducer
const mapStateToProps = state => ({
    leads: state.leads.leads
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);