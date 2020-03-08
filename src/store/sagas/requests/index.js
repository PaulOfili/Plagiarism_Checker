import { all } from 'redux-saga/effects';
import { postAssignRequestsWatcher } from './post_assign_requests.saga';
import { getAllPendingRequestsWatcher } from './pending_requests.saga';

export default function* requestsSaga() {
    yield all([
        postAssignRequestsWatcher(),
        getAllPendingRequestsWatcher(),
    ])
}