import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, LOGIN_USER_SUCCESS } from '../../contants';

export function* loginUserSaga(action) {
    const user = action.payload;

    
    const userData = {
        uid: user.uid,
        firstname: (user.firstname) ? user.firstname : 'User',
        lastname: (user.lastname) ? user.lastname : null,
        matricNo: (user.matricNo) ? user.matricNo : null,
        lecturer_courses: (user.courses) ? user.courses : null,
        email: user.email,
        accountType: user.accountType,
    }

    yield put({
        type: LOGIN_USER_SUCCESS,
        payload: userData
    })
}

export function* loginUserWatcher() {
    yield takeLatest(LOGIN_USER, loginUserSaga);
}
