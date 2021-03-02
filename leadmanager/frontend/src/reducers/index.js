import { combineReducers } from 'redux';
import leads from './leads';
import arcades from "./arcades";
import locations from "./locations";
import auth from "./auth";
import messages from "./messages";
import errors from "./errors";

export default combineReducers({
    leads,
    arcades,
    locations,
    auth,
    messages,
    errors,
});