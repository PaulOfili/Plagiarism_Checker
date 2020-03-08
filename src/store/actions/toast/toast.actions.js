import { SHOW_TOAST, HIDE_TOAST } from '../../contants';

export const showToast = (options) => {
    return {
        type: SHOW_TOAST,
        payload: options
    }
}

export const hideToast = () => {
    return {
        type: HIDE_TOAST,
    }
}