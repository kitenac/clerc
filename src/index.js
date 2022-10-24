import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // already written HOC to simplify work between react and redux
import App from './components/app';

import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './slices';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';

import { gothamRegular, gothamBold } from './fonts';


// app_reducer - will be ~ identifier of this store:  UseSelector(state.app_reducer.propName)
const store = configureStore({
  reducer: {
    app_reducer: AppReducer,
  },
});


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <gothamRegular />
      <gothamBold />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// gives state outside react-components( ex: fetching function)
export default store;
