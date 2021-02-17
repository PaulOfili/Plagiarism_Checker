
export const apiCall = async (
    requestType,
    url,
    customHeaders,
    requestBody,
    requestParams
) => {

    let headers = {
        "Content-type": "application/json",
        ...customHeaders
    };

    const requestOptions = {
        method: requestType,
        headers,
        body: requestBody ? JSON.stringify(requestBody) : undefined
    };

    if (requestParams) {

    }

    return fetch(url, requestOptions).then(handleResponse).catch(handleError)
}


const handleResponse = response => {
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.indexOf("application/json") !== -1;
    if (response.ok) {
        if (isJson) {
            return response.json();
        }
        return response.text();
    } else {
        if (isJson) {
            return response.json().then(error => {
                const errorMessage = error.message ||
                                        error.description;

                return Promise.reject(Object.assign(errorMessage, { response }))
                                    
            })
        } else {
            throw new Error('Something went wrong');
        }
    }
}

const handleError = error => {
    console.log(error, error.message)
    throw new Error('Something went wrong. Please try again later');
}