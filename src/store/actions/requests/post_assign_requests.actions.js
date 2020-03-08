import { POST_ASSIGN_REQUESTS, EDIT_ASSIGN_TO_ME_REQUESTS } from '../../contants';

export const postAssignRequests = (data) => ({
    type: POST_ASSIGN_REQUESTS,
    payload: data
});

export const editAssignRequests = (data) => ({
    type: EDIT_ASSIGN_TO_ME_REQUESTS,
    payload: data
});