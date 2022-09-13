import React from 'react';
import { 
         input_username,
         input_password, 
         input_rest,
         update_token, 
         add_contracts,
         }    from '../../slices';

import {login, getApiKey, getContracts} from '../../services';

import styled from 'styled-components'
import { connect, useSelector, useDispatch } from 'react-redux'

import {waves, waveLine, loginPic} from '../../images'

// Maby bad practice, but I know no way except this to pass state into non-react function
import state from '../../index'


// container class to wrap inputs on a login page
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  row-gap: 20px;
`


const InputLogin = styled.input`
  width: 342px;
  height: 50px;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 0;
`


const SubmitButton = styled.button`  
  width: 342px;
  height: 50px;

  background: #0F75BF;
  border-radius: 4px;
  border: 0;
`

const Title = styled.h2`
  width: 342px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  font-size: 45px;
  font-family: cursive;
  color: #FFFFFF;
`

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  background: ${props => `url(${props.Pic})`};
  background-repeat: repeat; 
  width: 100vw;
  height: 100vh;
  background:linear-gradient(116.82deg, #364F6B 0%, #47688D 100%);
`




// "admin@ship.ru"   "secret2"


const LoginPage = () => {
    
    const dispatch = useDispatch()
    //const state = useSelector((state) => state.app_reducer.loginFormData) 
    
    //const token = useSelector((state) => state.app_reducer.sessionData.apiToken)  // about app_reducer - look top index.js
    //console.log('\n\n Is there token accessable?', token ,'\n\n')

    return <Background Pic={waves}>
    
      <LoginContainer>

        <Title> 
          clerc 
          <img src={waveLine} width={152} height={20} style={{alignSelf: 'center'}}/>
        </Title>


        <form>
        <LoginContainer>     
            
            <div>
              
              <img src={loginPic} style={{alignSelf: 'center'}}/>
                <InputLogin
                placeholder='Логин'
                onChange={ (event) => {
                  event.preventDefault()
                  dispatch(input_username(event.target.value))
                  }}/>
              
              
            </div>

            <InputLogin 
              placeholder='Пароль'
              onChange={ (event) => {
                event.preventDefault()
                dispatch(input_password(event.target.value))
                }}/>

            <SubmitButton
              onClick={ async function (event){   // async - only way to use await 
                          event.preventDefault()
                          // **** temporary measure ****
                          // TODO: see docs to know: how to get this poles to different users 
                          dispatch(input_rest({ 
                             client_id: '1',
                             client_secret: 'c75IGwuqkjrO1RWCE4Ntn4zqpQdpgnEO2wGT9iMT',
                             grant_type: 'password'}))
                          

                          // *** После диспатча сверху состояние-то поменялось, а доступа к нему нет доступа ***
                          //const state = useSelector((state) => state.app_reducer.loginFormData) // state has been updated - so call it here
                          

                          const loginFormData = state.getState().app_reducer.loginFormData
                          console.log('formData from state:', loginFormData)

                          const response = await login(loginFormData)
                          console.log('got response on login:', response)
                          const token = getApiKey(response)
                          const contracts = await getContracts(token)
                          update_token(token)
                          add_contracts(contracts)
                          
              }}>
                Войти
            </SubmitButton>

        </LoginContainer>
        </form>

      </LoginContainer>
            
    </Background>
  
}


/*
const mapStateToProps = (state) => (state.app_reducer)

// wrapping actions into dispatch
const mapDispatchToProps = {
  input_username,
  input_password, 
  input_rest,
  add_contracts }



export default connect(mapStateToProps, )(LoginPage);
*/

export default LoginPage