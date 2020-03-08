import { SHOW_CONFIRM_MODAL, HIDE_CONFIRM_MODAL } from '../../contants';

export const showConfirmModal = (options) => {
    return {
        type: SHOW_CONFIRM_MODAL,
    }
}

export const hideConfirmModal = () => {
    return {
        type: HIDE_CONFIRM_MODAL,
    }
}