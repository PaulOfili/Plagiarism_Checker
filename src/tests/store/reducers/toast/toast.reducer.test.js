import * as toastActions from '../../../../store/actions/toast';
import toastReducer from '../../../../store/reducers/toast';

describe('Actions', () => {
    describe('Toast Reducers', () => {
        it('should handle SHOW_TOAST', () => {
            const payload = {text: 'Test', type: 'info'};
            const initialState = {
                isHidden: true,
                text: '',
                type: ''
            };
            const newState = toastReducer(initialState, toastActions.showToast(payload));
            expect(newState).toEqual({...initialState, isHidden: false, text: 'Test', type: 'info' });
        })

        it('should handle HIDE_TOAST', () => {
            const initialState = {
                isHidden: false,
                text: 'Test',
                type: 'info'
            };
            const newState = toastReducer(initialState, toastActions.hideToast());
            expect(newState).toEqual({...initialState, isHidden: true, type: '', text: ''});
        })
    })
})