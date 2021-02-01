import axios from 'axios';
import { createMessage, returnErrors } from "./messages";
import { GET_MACHINES_BY_ADDRESS, GET_MACHINES_BY_LATLON } from './types';
import { tokenConfig } from "./auth";

// Get machines based on address
export const getMachinesByAddress = (address, maxDist) => (dispatch, getState) => {
    axios.get(`https://pinballmap.com/api/v1/locations/closest_by_address.json?address=${address}&max_distance=${maxDist}&send_all_within_distance=true`)
        .then(res => {
            // dispatch GET_MACHINES_BY_ADDRESS action to reducer
            dispatch({
                type: GET_MACHINES_BY_ADDRESS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data)));
};


// Get machines based on latitude and longitude