import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { videoEffector } from './effects/videoEffector';
import { playlistEffector } from './effects/playlistEffector';
import { tagEffector } from './effects/tagEffector';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const effectorMiddleware = store => next => action => {
  // Let reducers process the action first
  const result = next(action);

  // Then allow effectors to react and dispatch follow-ups
  void videoEffector(action, store.dispatch);
  void playlistEffector(action, store.dispatch);
  void tagEffector(action, store.dispatch);

  return result;
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(effectorMiddleware, thunk))
);

export default store;
