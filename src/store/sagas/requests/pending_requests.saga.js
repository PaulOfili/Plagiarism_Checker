import { put, takeLatest, call } from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import { getAllPendingRequests } from '../../../services/requests.service';


import {
    GET_ALL_PENDING_REQUESTS,
    // LOAD_CONFIRM_MODAL,
    // HIDE_CONFIRM_MODAL,
    // SHOW_TOAST,
    // POST_SUBMIT_REPORT_ERROR,
    // POST_SUBMIT_REPORT_SUCCESS,
}
    from "../../contants";

function* getAllPendingRequestsStart(action) {
    try {        

        const response = yield call(getAllPendingRequests)
 

        // yield put({
        //     type: POST_SUBMIT_REPORT_SUCCESS,
        // });

        // yield put({
        //     type: HIDE_CONFIRM_MODAL
        // })

        // const options = {
        //     text: 'You have successfully submitted this report',
        //     type: 'success'
        // }

        // yield put({
        //     type: SHOW_TOAST,
        //     payload: options
        // });  
  
    } catch (error) {
        console.log(error)
        // yield put({
        //     type: POST_SUBMIT_REPORT_ERROR
        // });

        // yield put({
        //     type: HIDE_CONFIRM_MODAL
        // })

        // const options = {
        //     text: error.message,
        //     type: 'error'
        // }

        // yield put({
        //     type: SHOW_TOAST,
        //     payload: options
        // });
    }
}

export function* getAllPendingRequestsWatcher() {
    yield takeLatest([GET_ALL_PENDING_REQUESTS], getAllPendingRequestsStart);
}