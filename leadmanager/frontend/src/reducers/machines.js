import { GET_MACHINES_BY_ADDRESS, GET_MACHINES_BY_LATLON } from '../actions/types.js';

const initialState = {
    machines: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MACHINES_BY_ADDRESS:
        case GET_MACHINES_BY_LATLON:
            return {
                ...state,
                machines: action.payload
            };
        default:
            return state;
    }
};