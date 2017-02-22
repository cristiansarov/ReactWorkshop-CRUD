import rootReducer from 'core/config/rootReducer';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const store = compose(
  applyMiddleware(
    promiseMiddleware({
      promiseTypeSuffixes: ['loading', 'success', 'error']
    }),
    thunk
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(rootReducer);


export default store;
