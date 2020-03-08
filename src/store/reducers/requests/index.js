import {combineReducers} from 'redux';
import assignToMeRequests from './post_assign_requests.reducer';

const requests = combineReducers({
    assignToMeRequests,
});

export default requests;