import React from 'react';
import { connect } from 'react-redux';
import { 
         input_username, 
         input_password, 
         input_rest,
         update_token, 
         add_contracts,
         Login
         }    from '../../actions';

import {getApiKey, getContracts} from '../../services';


import styled from 'styled-components'


const InputLogin = styled.input`
  position: absolute;
  width: 342px;
  height: 50px;
  left: 549px;

  top: ${(props) => props.top};
  
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 0;
`


const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;

  position: absolute;
  width: 342px;
  height: 50px;
  left: 549px;
  top: 583px;

  background: #0F75BF;
  border-radius: 4px;
  border: 0;
`

const Title = styled.h2`
  position: absolute;
  width: 342px;
  left: 549px;
  top: 320px;
  text-align: center;

  font-size: 45px;
  font-family: cursive;
  color: #FFFFFF;
`


const Background = styled.div`
  position: absolute;
  width: 1440px;
  height: 1024px;
  left: 0px;
  top: 0px;
  background:linear-gradient(116.82deg, #364F6B 0%, #47688D 100%);
`




// "admin@ship.ru"   "secret2"


const LoginPage = ( {
                      input_username, 
                      input_password, 
                      input_rest, 
                      add_contracts,
                      token   } 
                  ) => {

    console.log('\n\n Is there token accessable?', token ,'\n\n')


    // classname 
    return <Background>
      
      <svg width="398" height="338" viewBox="0 0 398 238" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.49979 2C4.92344 2 3.2914 2.56987 1.58796 3.80874L0.411621 2.19126C2.37485 0.763463 4.40948 0 6.49979 0C8.59011 0 10.6247 0.763463 12.588 2.19126C14.2914 3.43013 15.9234 4 17.4998 4C19.0761 4 20.7082 3.43013 22.4116 2.19126C24.3748 0.763463 26.4095 0 28.4998 0C30.5901 0 32.6247 0.763463 34.588 2.19126C36.2914 3.43013 37.9234 4 39.4998 4C41.0761 4 42.7082 3.43013 44.4116 2.19126L45.588 3.80874C43.6247 5.23654 41.5901 6 39.4998 6C37.4095 6 35.3749 5.23654 33.4116 3.80874C31.7082 2.56987 30.0761 2 28.4998 2C26.9234 2 25.2914 2.56987 23.588 3.80874C21.6247 5.23654 19.5901 6 17.4998 6C15.4095 6 13.3748 5.23654 11.4116 3.80874C9.70818 2.56987 8.07615 2 6.49979 2Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4998 10C26.9234 10 25.2914 10.5699 23.588 11.8087L22.4116 10.1913C24.3748 8.76346 26.4095 8 28.4998 8C30.5901 8 32.6247 8.76346 34.588 10.1913C36.2914 11.4301 37.9234 12 39.4998 12C41.0761 12 42.7082 11.4301 44.4116 10.1913C46.3748 8.76346 48.4095 8 50.4998 8C52.5901 8 54.6247 8.76346 56.588 10.1913C58.2914 11.4301 59.9234 12 61.4998 12C63.0761 12 64.7082 11.4301 66.4116 10.1913L67.588 11.8087C65.6247 13.2365 63.5901 14 61.4998 14C59.4095 14 57.3749 13.2365 55.4116 11.8087C53.7082 10.5699 52.0761 10 50.4998 10C48.9234 10 47.2914 10.5699 45.588 11.8087C43.6247 13.2365 41.5901 14 39.4998 14C37.4095 14 35.3748 13.2365 33.4116 11.8087C31.7082 10.5699 30.0761 10 28.4998 10Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M204.5 2C202.923 2 201.291 2.56987 199.588 3.80874L198.412 2.19126C200.375 0.763463 202.409 0 204.5 0C206.59 0 208.625 0.763463 210.588 2.19126C212.291 3.43013 213.923 4 215.5 4C217.076 4 218.708 3.43013 220.412 2.19126C222.375 0.763463 224.409 0 226.5 0C228.59 0 230.625 0.763463 232.588 2.19126C234.291 3.43013 235.923 4 237.5 4C239.076 4 240.708 3.43013 242.412 2.19126L243.588 3.80874C241.625 5.23654 239.59 6 237.5 6C235.409 6 233.375 5.23654 231.412 3.80874C229.708 2.56987 228.076 2 226.5 2C224.923 2 223.291 2.56987 221.588 3.80874C219.625 5.23654 217.59 6 215.5 6C213.409 6 211.375 5.23654 209.412 3.80874C207.708 2.56987 206.076 2 204.5 2Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M226.5 10C224.923 10 223.291 10.5699 221.588 11.8087L220.412 10.1913C222.375 8.76346 224.409 8 226.5 8C228.59 8 230.625 8.76346 232.588 10.1913C234.291 11.4301 235.923 12 237.5 12C239.076 12 240.708 11.4301 242.412 10.1913C244.375 8.76346 246.409 8 248.5 8C250.59 8 252.625 8.76346 254.588 10.1913C256.291 11.4301 257.923 12 259.5 12C261.076 12 262.708 11.4301 264.412 10.1913L265.588 11.8087C263.625 13.2365 261.59 14 259.5 14C257.409 14 255.375 13.2365 253.412 11.8087C251.708 10.5699 250.076 10 248.5 10C246.923 10 245.291 10.5699 243.588 11.8087C241.625 13.2365 239.59 14 237.5 14C235.409 14 233.375 13.2365 231.412 11.8087C229.708 10.5699 228.076 10 226.5 10Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M72.4998 114C70.9234 114 69.2914 114.57 67.588 115.809L66.4116 114.191C68.3748 112.763 70.4095 112 72.4998 112C74.5901 112 76.6247 112.763 78.588 114.191C80.2914 115.43 81.9234 116 83.4998 116C85.0761 116 86.7082 115.43 88.4116 114.191C90.3748 112.763 92.4095 112 94.4998 112C96.5901 112 98.6247 112.763 100.588 114.191C102.291 115.43 103.923 116 105.5 116C107.076 116 108.708 115.43 110.412 114.191L111.588 115.809C109.625 117.237 107.59 118 105.5 118C103.409 118 101.375 117.237 99.4116 115.809C97.7082 114.57 96.0761 114 94.4998 114C92.9234 114 91.2914 114.57 89.588 115.809C87.6247 117.237 85.5901 118 83.4998 118C81.4095 118 79.3748 117.237 77.4116 115.809C75.7082 114.57 74.0761 114 72.4998 114Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M94.4998 122C92.9234 122 91.2914 122.57 89.588 123.809L88.4116 122.191C90.3748 120.763 92.4095 120 94.4998 120C96.5901 120 98.6247 120.763 100.588 122.191C102.291 123.43 103.923 124 105.5 124C107.076 124 108.708 123.43 110.412 122.191C112.375 120.763 114.409 120 116.5 120C118.59 120 120.625 120.763 122.588 122.191C124.291 123.43 125.923 124 127.5 124C129.076 124 130.708 123.43 132.412 122.191L133.588 123.809C131.625 125.237 129.59 126 127.5 126C125.409 126 123.375 125.237 121.412 123.809C119.708 122.57 118.076 122 116.5 122C114.923 122 113.291 122.57 111.588 123.809C109.625 125.237 107.59 126 105.5 126C103.409 126 101.375 125.237 99.4116 123.809C97.7082 122.57 96.0761 122 94.4998 122Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M270.5 114C268.923 114 267.291 114.57 265.588 115.809L264.412 114.191C266.375 112.763 268.409 112 270.5 112C272.59 112 274.625 112.763 276.588 114.191C278.291 115.43 279.923 116 281.5 116C283.076 116 284.708 115.43 286.412 114.191C288.375 112.763 290.409 112 292.5 112C294.59 112 296.625 112.763 298.588 114.191C300.291 115.43 301.923 116 303.5 116C305.076 116 306.708 115.43 308.412 114.191L309.588 115.809C307.625 117.237 305.59 118 303.5 118C301.409 118 299.375 117.237 297.412 115.809C295.708 114.57 294.076 114 292.5 114C290.923 114 289.291 114.57 287.588 115.809C285.625 117.237 283.59 118 281.5 118C279.409 118 277.375 117.237 275.412 115.809C273.708 114.57 272.076 114 270.5 114Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M292.5 122C290.923 122 289.291 122.57 287.588 123.809L286.412 122.191C288.375 120.763 290.409 120 292.5 120C294.59 120 296.625 120.763 298.588 122.191C300.291 123.43 301.923 124 303.5 124C305.076 124 306.708 123.43 308.412 122.191C310.375 120.763 312.409 120 314.5 120C316.59 120 318.625 120.763 320.588 122.191C322.291 123.43 323.923 124 325.5 124C327.076 124 328.708 123.43 330.412 122.191L331.588 123.809C329.625 125.237 327.59 126 325.5 126C323.409 126 321.375 125.237 319.412 123.809C317.708 122.57 316.076 122 314.5 122C312.923 122 311.291 122.57 309.588 123.809C307.625 125.237 305.59 126 303.5 126C301.409 126 299.375 125.237 297.412 123.809C295.708 122.57 294.076 122 292.5 122Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M138.5 226C136.923 226 135.291 226.57 133.588 227.809L132.412 226.191C134.375 224.763 136.409 224 138.5 224C140.59 224 142.625 224.763 144.588 226.191C146.291 227.43 147.923 228 149.5 228C151.076 228 152.708 227.43 154.412 226.191C156.375 224.763 158.409 224 160.5 224C162.59 224 164.625 224.763 166.588 226.191C168.291 227.43 169.923 228 171.5 228C173.076 228 174.708 227.43 176.412 226.191L177.588 227.809C175.625 229.237 173.59 230 171.5 230C169.409 230 167.375 229.237 165.412 227.809C163.708 226.57 162.076 226 160.5 226C158.923 226 157.291 226.57 155.588 227.809C153.625 229.237 151.59 230 149.5 230C147.409 230 145.375 229.237 143.412 227.809C141.708 226.57 140.076 226 138.5 226Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M160.5 234C158.923 234 157.291 234.57 155.588 235.809L154.412 234.191C156.375 232.763 158.409 232 160.5 232C162.59 232 164.625 232.763 166.588 234.191C168.291 235.43 169.923 236 171.5 236C173.076 236 174.708 235.43 176.412 234.191C178.375 232.763 180.409 232 182.5 232C184.59 232 186.625 232.763 188.588 234.191C190.291 235.43 191.923 236 193.5 236C195.076 236 196.708 235.43 198.412 234.191L199.588 235.809C197.625 237.237 195.59 238 193.5 238C191.409 238 189.375 237.237 187.412 235.809C185.708 234.57 184.076 234 182.5 234C180.923 234 179.291 234.57 177.588 235.809C175.625 237.237 173.59 238 171.5 238C169.409 238 167.375 237.237 165.412 235.809C163.708 234.57 162.076 234 160.5 234Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M336.5 226C334.923 226 333.291 226.57 331.588 227.809L330.412 226.191C332.375 224.763 334.409 224 336.5 224C338.59 224 340.625 224.763 342.588 226.191C344.291 227.43 345.923 228 347.5 228C349.076 228 350.708 227.43 352.412 226.191C354.375 224.763 356.409 224 358.5 224C360.59 224 362.625 224.763 364.588 226.191C366.291 227.43 367.923 228 369.5 228C371.076 228 372.708 227.43 374.412 226.191L375.588 227.809C373.625 229.237 371.59 230 369.5 230C367.409 230 365.375 229.237 363.412 227.809C361.708 226.57 360.076 226 358.5 226C356.923 226 355.291 226.57 353.588 227.809C351.625 229.237 349.59 230 347.5 230C345.409 230 343.375 229.237 341.412 227.809C339.708 226.57 338.076 226 336.5 226Z" fill="white" fill-opacity="0.03"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M358.5 234C356.923 234 355.291 234.57 353.588 235.809L352.412 234.191C354.375 232.763 356.409 232 358.5 232C360.59 232 362.625 232.763 364.588 234.191C366.291 235.43 367.923 236 369.5 236C371.076 236 372.708 235.43 374.412 234.191C376.375 232.763 378.409 232 380.5 232C382.59 232 384.625 232.763 386.588 234.191C388.291 235.43 389.923 236 391.5 236C393.076 236 394.708 235.43 396.412 234.191L397.588 235.809C395.625 237.237 393.59 238 391.5 238C389.409 238 387.375 237.237 385.412 235.809C383.708 234.57 382.076 234 380.5 234C378.923 234 377.291 234.57 375.588 235.809C373.625 237.237 371.59 238 369.5 238C367.409 238 365.375 237.237 363.412 235.809C361.708 234.57 360.076 234 358.5 234Z" fill="white" fill-opacity="0.03"/>
      </svg>

      
      <Title> clerc </Title>
        <form>          
          <InputLogin 
            placeholder='Логин'
            top='443px'
            onChange={ (event) => {
              event.preventDefault()
              input_username(event.target.value)}}/>
          
          <InputLogin 
            placeholder='Пароль'
            top='513px'
            onChange={ (event) => {
              event.preventDefault()
              input_password(event.target.value)}}/>
          
          <SubmitButton
            onClick={ async function (event){   // async - only way to use await 
                        event.preventDefault()
                        // **** temporary measure ****
                        // TODO: see docs to know: how to get this poles to different users 
                        input_rest({ 
                           client_id: '1',
                           client_secret: 'c75IGwuqkjrO1RWCE4Ntn4zqpQdpgnEO2wGT9iMT',
                           grant_type: 'password'})
                        
                        /*  Login code:
                          // to call thunk(nested function) - we need ()() 
                          const response = await Login()()
                          console.log('got response on login:', response)
                          update_token( getApiKey(response) )
                          add_contracts( await getContracts(token) )
                        */
            }}>
              Войти
          </SubmitButton>
              
        </form>
            
    </Background>
}



const mapStateToProps = (state) => ( {token: state.sessionData.token})


// wrapping actions into dispatch
const mapDispatchToProps = {
  input_username, 
  input_password, 
  input_rest,
  add_contracts }



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);