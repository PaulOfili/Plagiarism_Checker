import { apiCall } from './apiUtility';
import * as API_URLS from './constants'
// import axios from './interceptor';
// import EventEmitter from './EventEmitter';


export function submitSearchReport(requestId, requestBody) {
    let url = `${API_URLS.SUBMIT_SEARCH_REPORT}`;
    
    return apiCall("POST", url, null, requestBody);
}
