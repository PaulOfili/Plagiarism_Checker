import { combineReducers } from 'redux';
import auth from './auth';
import toast from './toast';
import confirmModal from './confirmModal';
import requests from './requests';
import searchReport from './searchReport'

const rootReducer = combineReducers({
    auth,
    toast,
    confirmModal,
    requests,
    searchReport,
})

export default rootReducer;