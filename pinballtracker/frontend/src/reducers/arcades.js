import { GET_ARCADES_BY_ADDRESS, OPEN_ARCADE_DETAILS, CLOSE_ARCADE_DETAILS } from '../actions/types.js';

const initialState = {
    arcades: [],
    arcadeDetails: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ARCADES_BY_ADDRESS:
            return {
                ...state,
                arcades: action.payload
            };
        case OPEN_ARCADE_DETAILS:
            return {
                ...state,
                arcadeDetails: action.payload
            };
        case CLOSE_ARCADE_DETAILS:
            return {
                ...state,
                arcadeDetails: null
            };
        default:
            return state;
    }
};