import { CREATE_MESSAGE, GET_ERRORS } from "./types";

export const createMessage = msg => {
    // dispatch the message to reducer
    return {
        type: CREATE_MESSAGE,
        payload: msg
    };
};

// action to return errors
export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}