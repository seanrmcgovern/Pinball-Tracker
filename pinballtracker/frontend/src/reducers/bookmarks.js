import { GET_BOOKMARKS, ADD_BOOKMARK, DELETE_BOOKMARK, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
    bookmarks: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BOOKMARKS:
            return {
                ...state,
                bookmarks: action.payload
            };
        case ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload]
            };
        case DELETE_BOOKMARK:
            return {
                ...state,
                bookmarks: state.bookmarks.filter(loc => loc.id != action.payload)
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                bookmarks: []
            };
        default: 
            return state;
    }
};