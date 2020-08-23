import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, LOGIN_USER_SUCCESS } from '../../contants';

export function* loginUserSaga(action) {
    const user = action.payload;

    
    const userData = {
        uid: user.uid,
        username: (user.username) ? user.username : 'User',
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
