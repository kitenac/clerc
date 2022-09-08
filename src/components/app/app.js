// !!! По поводу стилей - обрати внимание, что они автоматически подстраиваются 
//      под изменение страницы(размер окна, масштаб, открытие консоли)
//      может поможет bootstrap, youtube + посмотреть приходящий 
//      html <Head> - может там уже есть линки

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {LoginPage, ContractsPage, ContractCard} from '../pages';   

const login = 'admin@ship.ru';
const pass = 'secret2';
const secret = 'c75IGwuqkjrO1RWCE4Ntn4zqpQdpgnEO2wGT9iMT';




const App = () => {
    return <div className='background'>

        <Router>
            <Routes>
                <Route exact path="/"           element={<h2>There must be redirect to /login or /contracts soon</h2>} />
                <Route exact path="/login"      element={<LoginPage/>} />
                <Route exact path="/contracts"  element={<ContractsPage/>} />
                <Route exact path="/card"  element={<ContractCard/>} />
            </Routes>
        </Router>


    </div>    
}

export default App;