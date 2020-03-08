import { SHOW_TOAST, HIDE_TOAST } from '../../contants'

const initialState = {
    isHidden: true,
    text: '',
    type: ''
};

const  toastReducer = (state=initialState, action) => {
    switch(action.type) {
        case SHOW_TOAST: {
            return (
                Object.assign({}, state, {
                    isHidden: false,
                    type: action.payload.type,
                    text: action.payload.text

                })
            )
        }
        case HIDE_TOAST: {
            return (
                Object.assign({}, state, {
                    isHidden: true,
                    type: '',
                    text: ''
                })
            )
        }
        default:
            return state
    }
}

export default toastReducer;