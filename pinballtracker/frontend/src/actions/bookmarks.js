import axios from 'axios';
import { GET_BOOKMARKS, ADD_BOOKMARK, DELETE_BOOKMARK } from './types';
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getBookmarks = () => (dispatch, getState) => {
    axios.get('/api/bookmarks/', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_BOOKMARKS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data));
        });
};

export const addBookmark = (location) => (dispatch, getState) => {
    axios.post('/api/bookmarks/', location, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ addBookmark: "Bookmark Saved!" }));
            dispatch({
                type: ADD_BOOKMARK,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data));
        });
};

export const deleteBookmark = (id) => (dispatch, getState) => {
    axios.delete(`api/bookmarks/${id}`, tokenConfig(getState))
        .then(() => {
            dispatch(createMessage({ deleteBookmark: "Bookmark removed"}));
            dispatch({
                type: DELETE_BOOKMARK,
                payload: id
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data));
        });
};