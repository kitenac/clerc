import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, ContractsPage, ContractCard, ContractDetails } from '../pages';
import TestReduxToolkit from './testReduxToolkit';
import { useSelector } from 'react-redux';

const App = () => {
  const { isLoginned } = useSelector((state) => state.app_reducer.sessionData);

  const defaultRedirect = (isLoginned) =>
    isLoginned ? <Navigate to='/contracts' /> : <Navigate to='/login' />;

  
  // about ThemeProvider: https://styled-components.com/docs/advanced
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={defaultRedirect(isLoginned)} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/contracts' element={<ContractsPage />} />
          <Route exact path='/card' element={<ContractCard />} />

          <Route exact path='/contracts/:id/:category' element={<ContractDetails />} />

          <Route exact path='/test' element={<TestReduxToolkit />} />
        </Routes>
      </Router>
  );
};

export default App;
