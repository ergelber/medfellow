import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import throttle from 'lodash/throttle';
import omit from 'lodash/omit';

import { loadState, saveState } from './helpers/local_storage';
import rootReducer from './reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add logger for development
const storeType = () => {
  if (process.env.NODE_ENV === "development") {
    return composeEnhancers(applyMiddleware(thunk, logger));
  }
  return composeEnhancers(applyMiddleware(thunk));
}

const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    storeType()
  );

  store.subscribe(throttle(() => {
    const excludedProperties = ['flash'];

    const state = store.getState();
    const stateToSave = omit(
      state,
      ...excludedProperties
    );
    saveState(stateToSave);
  }, 1000));

  return store;
}

export default configureStore;