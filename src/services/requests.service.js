import { apiCall } from './apiUtility';
import * as API_URLS from './constants'


export function getAllPendingRequests() {
    let url = `${API_URLS.GET_ALL_PENDING_REQUESTS}`;

    return apiCall("GET", url, null, null);
}