import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';     // already written HOC to simplify work between react and redux
import reducer from './reducers';
import App from './components/app';
import thunk from 'redux-thunk';

// init new redux-store with already created reducer


// to pass enhancer and applyMiddleWare and ... - manualy we oughta create single function
const composedParams = compose(  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                                 applyMiddleware(thunk))

const store = createStore(
  reducer,
  composedParams
  );  

  /* 
    2-nd param - for redux plugin
    thunk - for accessing redux-store`s data via functions (situated in ./actions due redux paradigm)
  */       
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

