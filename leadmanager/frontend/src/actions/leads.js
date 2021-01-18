import axios from 'axios';
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from './types';
import { tokenConfig } from "./auth";

// GET LEADS action
export const getLeads = () => (dispatch, getState) => {
    axios.get('/api/leads/', tokenConfig(getState)).then(res => {
        // dispatch GET_LEADS action to the reducer
        dispatch({
            type: GET_LEADS,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ deleteLead: "Lead Deleted"}));
        // dispatch DELETE_LEADS action to the reducer
        dispatch({
            type: DELETE_LEAD,
            payload: id
        });
    }).catch(err => console.log(err));
};

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
    axios.post("/api/leads/", lead, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ addLead: "Lead Added" }));
        // dispatch ADD_LEADS action to the reducer
        dispatch({
            type: ADD_LEAD,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
        // {
        //     const errors = {
        //         msg: err.response.data,
        //         status: err.response.status
        //     };
        //     dispatch({
        //         type: GET_ERRORS,
        //         payload: errors
        //     }); 
        // });
};