import { EDIT_ASSIGN_TO_ME_REQUESTS, POST_ASSIGN_REQUESTS_SUCCESS, POST_ASSIGN_REQUESTS_ERROR } from '../../contants';

const initialState = {
    data: []
};

const assignRequestsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case EDIT_ASSIGN_TO_ME_REQUESTS:
        {

            return {
                ...state,
                data: action.payload
            };
        }

        case POST_ASSIGN_REQUESTS_SUCCESS:
        {
            return {
                ...state,
                data: []
            }
        }
        case POST_ASSIGN_REQUESTS_ERROR:
        {
            return state
        }
        default:
        {
            return state;
        }
    }
};

export default assignRequestsReducer;