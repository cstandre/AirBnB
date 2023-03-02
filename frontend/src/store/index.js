import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotReducer from './spots';

const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotReducer
});

let enhancer;

// sets different store enhancers depending on if the Node environment is in development or production.

if (process.env.NODE_ENV === 'production') {
    // production, enhancer only applies thunk middleware
    enhancer = applyMiddleware(thunk)
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    // uses redux tools
    // uses thunk and logger middleware
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
