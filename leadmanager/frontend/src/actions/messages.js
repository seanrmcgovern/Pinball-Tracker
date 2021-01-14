import { CREATE_MESSAGE } from "./types";

export const createMessage = msg => {
    // dispatch the message to reducer
    return {
        type: CREATE_MESSAGE,
        payload: msg
    };
};