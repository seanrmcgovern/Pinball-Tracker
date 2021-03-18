import axios from 'axios';
import { createMessage, returnErrors } from "./messages";
import { GET_LOCATIONS_BY_ADDRESS, ADD_LOCATION, UPDATE_LOCATION_DETAILS, GET_MACHINES } from './types';
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
    if (location.coordinates.lat == "" || location.coordinates.lon == "") {
        dispatch(returnErrors({latlon: "Invalid latitude/longitude"}, 400));
    } else if (location.coordinates.lat < -90 || location.coordinates.lat > 90) {
        dispatch(returnErrors({latlon: "Latitude must be in the range [-90, 90]"}, 400));
    } else if (location.coordinates.lon < -180 || location.coordinates.lon > 180) {
        dispatch(returnErrors({latlon: "Longitude must be in the range [-180, 180]"}, 400));
    }
    else {
        axios.post("/api/locations/", location, tokenConfig(getState)).then(res => {
            // dispatch message to the messages reducer
            dispatch(createMessage({ addLocation: "Location Saved!" }));
            // dispatch ADD_LOCATION action to the locations reducer
            dispatch({
                type: ADD_LOCATION,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};

export const updateLocationDetails = (location) => (dispatch, getState) => 
    new Promise(function(resolve, reject) {
        axios.put(`/api/locations/${location.id}/`, location, tokenConfig(getState)).then((res) => {
            dispatch(createMessage({ locationChanges: "Changes Saved!" }));
            dispatch({
                type: UPDATE_LOCATION_DETAILS,
                payload: res.data
            });
            resolve(res);
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            reject(err);
        });
});

export const getMachines = () => (dispatch) => {
    axios.get("https://pinballmap.com/api/v1/machines.json").then((res) => {
        dispatch({
            type: GET_MACHINES,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    });
};

