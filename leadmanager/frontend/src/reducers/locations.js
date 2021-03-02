import { GET_LOCATIONS_BY_ADDRESS, ADD_LOCATION } from '../actions/types.js';

const initialState = {
    locations: [],
    locationDetails: null
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
                // testing
                locations: [...state.locations, action.payload]
            };
        default:
            return state;
    }
};