import { apiCall } from './apiUtility';
import * as API_URLS from './constants'

export function getSimilarityResult(requestBody) {
    let url = `${API_URLS.GET_SIMILARITY_RESULT}`;
    return apiCall("POST", url, null, requestBody);
}