import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {throttle} from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { loadStoreFromSessionStorage, saveStoreToSessionStorage } from '../session/sessionStorage'

const composeEnhancers = composeWithDevTools({  
    trace: true, 
    traceLimit: 25 
}); 

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const persistedState = loadStoreFromSessionStorage();

const store = createStore(
    rootReducer,
    persistedState,
    enhancer
);

sagaMiddleware.run(rootSaga);

store.subscribe(
    throttle(() => {
        saveStoreToSessionStorage({
            auth: {
                userData: store.getState().auth.userData,
                isLoggedIn: store.getState().auth.isLoggedIn,
                isLoading: store.getState().auth.isLoading,
            }
        });
    }, 1000)
);
export default store;