import { all } from 'redux-saga/effects';
import authSaga from './auth';
import requestsSaga from './requests';
import searchReport from './searchReport';

export default function* rootSaga() {
    yield all([
        authSaga(),
        requestsSaga(),
        searchReport()
    ]);
}