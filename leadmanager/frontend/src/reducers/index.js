import { combineReducers } from 'redux';
import leads from './leads';
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import machines from "./machines";

export default combineReducers({
    machines,
    leads,
    errors,
    messages,
    auth
});