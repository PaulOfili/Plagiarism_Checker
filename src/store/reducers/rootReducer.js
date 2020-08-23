import { combineReducers } from 'redux';
import auth from './auth';
import toast from './toast';
import confirmModal from './confirmModal';

const rootReducer = combineReducers({
    auth,
    toast,
    confirmModal,
})

export default rootReducer;