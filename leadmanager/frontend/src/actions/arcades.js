import axios from 'axios';
import { createMessage, returnErrors } from "./messages";
import { GET_ARCADES_BY_ADDRESS, OPEN_ARCADE_DETAILS, CLOSE_ARCADE_DETAILS } from './types';
import { tokenConfig } from "./auth";

// Pinball machine locations based off of 3rd party api
// Get arcade locations based on address
export const getArcadesByAddress = (address, maxDist) => (dispatch) => 
    new Promise(function(resolve, reject) {
        axios.get(`https://pinballmap.com/api/v1/locations/closest_by_address.json?address=${address}&max_distance=${maxDist}&send_all_within_distance=true`)
            .then(res => {
                // dispatch GET_ARCADES_BY_ADDRESS action to reducer
                dispatch({
                    type: GET_ARCADES_BY_ADDRESS,
                    payload: res.data
                });
                resolve(res);
            }).catch(err => {
                dispatch(returnErrors(err.response.data));
                reject(err);
            });
});

export const openArcadeDetails = (arcade) => (dispatch) => {
    dispatch({
        type: OPEN_ARCADE_DETAILS,
        payload: arcade
    });
};

export const closeArcadeDetails = () => (dispatch) => {
    dispatch({
        type: CLOSE_ARCADE_DETAILS
    });
};
