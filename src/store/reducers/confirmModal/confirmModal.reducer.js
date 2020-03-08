import { SHOW_CONFIRM_MODAL, LOAD_CONFIRM_MODAL, HIDE_CONFIRM_MODAL } from '../../contants'

const initialState = {
    isVisible: false,
    isLoading: false
};

const confirmModalReducer = (state=initialState, action) => {
    switch(action.type) {
        case SHOW_CONFIRM_MODAL: {
            return (
                Object.assign({}, state, {
                    isVisible: true,
                })
            )
        }

        case LOAD_CONFIRM_MODAL: {
            return (
                Object.assign({}, state, {
                    isLoading: true
                })
            )
        }
        case HIDE_CONFIRM_MODAL: {
            return (
                Object.assign({}, state, {
                    isVisible: false,
                    isLoading: false
                })
            )
        }
        default:
            return state
    }
}

export default confirmModalReducer;