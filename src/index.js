import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';     // already written HOC to simplify work between react and redux
import App from './components/app';



import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './slices'



// app_reducer - will be ~ identifier of this store:  UseSelector(state.app_reducer.propName)
const store = configureStore({
  reducer: {
    app_reducer: AppReducer,
  },
})


  /* 
    2-nd param - for redux plugin
    thunk - for accessing redux-store`s data via functions (situated in ./actions due redux paradigm)
  */       
ReactDOM.render(
  <Provider store={store}>
    <App/> 
  </Provider>,
  document.getElementById('root'));

// gives state outside react-components( ex: fetching function)
export default store

