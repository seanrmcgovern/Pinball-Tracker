import axios from 'axios';
import { createMessage, returnErrors } from "./messages";
import { GET_LOCATIONS_BY_ADDRESS, ADD_LOCATION } from './types';
import { tokenConfig } from "./auth";

// Pinball machine locations based off of community submissions
// Get community locations based on address

// for now just get all locations, later change to limit by default 25 mile radius, or maxDist
export const getLocationsByAddress = (address) => (dispatch, getState) => 
    new Promise(function(resolve, reject) {
        axios.get('/api/locations/', tokenConfig(getState))
            .then(res => {
                // dispatch GET_LOCATIONS_BY_ADDRESS action to reducer
                dispatch({
                    type: GET_LOCATIONS_BY_ADDRESS,
                    payload: res.data
                });
                resolve(res);
            }).catch(err => {
                dispatch(returnErrors(err.response.data));
                reject(err);
            });
});

// ADD LOCATION
export const addLocation = (location) => (dispatch, getState) => {
    axios.post("/api/locations/", location, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ addLocation: "Location Saved!" }));
        // dispatch ADD_LOCATION action to the reducer
        dispatch({
            type: ADD_LOCATION,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};