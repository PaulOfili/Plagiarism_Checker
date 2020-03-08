import * as authActions from '../../../../store/actions/auth';
import { LOGIN_USER, LOGOUT_USER } from '../../../../store/contants';

describe('Actions', () => {
    describe('Auth Actions', () => {
        it('should create an action to login the user', () => {
            const data = 'test_token';
            const expectedAction = {
                type: LOGIN_USER,
                payload: data
            }
            expect(authActions.loginUser(data)).toEqual(expectedAction);
        })

        it('should create an action to logout the user', () => {
            const expectedAction = {
                type: LOGOUT_USER
            }
            expect(authActions.logoutUser()).toEqual(expectedAction);
        })
    })
})