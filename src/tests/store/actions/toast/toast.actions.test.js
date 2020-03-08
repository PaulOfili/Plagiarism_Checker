import * as toastActions from '../../../../store/actions/toast';
import { SHOW_TOAST, HIDE_TOAST } from '../../../../store/contants';

describe('Actions', () => {
    describe('Toast Actions', () => {
        it('should create an action to show the toast message', () => {
            const data = {};
            const expectedAction = {
                type: SHOW_TOAST,
                payload: data
            }
            expect(toastActions.showToast(data)).toEqual(expectedAction);
        })

        it('should create an action to hide the toast message', () => {
            const expectedAction = {
                type: HIDE_TOAST
            }
            expect(toastActions.hideToast()).toEqual(expectedAction);
        })
    })
})