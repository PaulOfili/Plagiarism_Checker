import {takeLatest } from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';


import {
    GET_ALL_PENDING_REQUESTS,
}
    from "../../contants";

function* getAllPendingRequestsStart(action) {
    try {        
        yield '';
        // const response = yield call(getAllPendingRequests)
 
    } catch (error) {
        console.log(error)
    }
}

export function* getAllPendingRequestsWatcher() {
    yield takeLatest([GET_ALL_PENDING_REQUESTS], getAllPendingRequestsStart);
}