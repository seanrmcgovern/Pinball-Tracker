import { GET_LOCATIONS_BY_ADDRESS, ADD_LOCATION, UPDATE_LOCATION_DETAILS, GET_MACHINES } from '../actions/types.js';

const initialState = {
    locations: [],
    locationDetails: null,
    machines: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LOCATIONS_BY_ADDRESS:
            return {
                ...state,
                locations: action.payload
            };
        case ADD_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.payload]
            };
        case UPDATE_LOCATION_DETAILS:
            return {
                ...state,
            };
        case GET_MACHINES:
            return {
                ...state,
                machines: action.payload
            }
        default:
            return state;
    }
};