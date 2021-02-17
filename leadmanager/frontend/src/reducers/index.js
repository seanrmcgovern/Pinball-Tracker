import { combineReducers } from 'redux';
import leads from './leads';
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import arcades from "./arcades";

export default combineReducers({
    arcades,
    leads,
    errors,
    messages,
    auth
});