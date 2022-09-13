

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {LoginPage, ContractsPage, ContractCard} from '../pages';   
import TestReduxToolkit from './testReduxToolkit';


const App = () => {
    return <div>

        <Router>
            <Routes>
                <Route exact path="/"           element={<h2>There must be redirect to /login or /contracts soon</h2>} />
                <Route exact path="/login"      element={<LoginPage/>} />
                <Route exact path="/contracts"  element={<ContractsPage/>} />
                <Route exact path="/card"  element={<ContractCard/>} />

                <Route exact path="/test"       element={<TestReduxToolkit/>} />

            </Routes>
        </Router>


    </div>    
}

/* ALL ROUTES:

<Route exact path="/login"      element={<LoginPage/>} />
<Route exact path="/contracts"  element={<ContractsPage/>} />
<Route exact path="/card"  element={<ContractCard/>} />
 
 */


export default App;