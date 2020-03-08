// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

//Hack to suppress some warnings when testing. The tests work finem but the errors are obstrucive
import React from "react";
React.useLayoutEffect = React.useEffect;

//Hack to simulate window._env_ object while in dev
window._env_ = {
    REACT_APP_PASSPORT: 'test',
    REACT_APP_CLIENT_ID: '1234',
    REACT_APP_BASE_URL: 'test'
}
