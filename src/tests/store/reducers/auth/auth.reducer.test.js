import * as authActions from '../../../../store/actions/auth';
import authReducer from '../../../../store/reducers/auth';

describe('Actions', () => {
    describe('Auth Reducers', () => {
        it('should handle LOGIN USER ATTEMPT', () => {
            const payload = 'test_token';
            const initialState = {
                userData: {},
                isLoading: false,
                isLoggedIn: false
            };
            const newState = authReducer(initialState, authActions.loginUser(payload));
            expect(newState).toEqual({...initialState, isLoading: true });
        })

        it('should handle LOGOUT_USER', () => {
            const initialState = {
                userData: {first_name: 'Test'},
                isLoading: false,
                isLoggedIn: true
            };
            const newState = authReducer(initialState, authActions.logoutUser());
            expect(newState).toEqual({...initialState, isLoggedIn: false, userData: {}});
        })
    })
})