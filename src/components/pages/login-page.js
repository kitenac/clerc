import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';

import {
  input_username,
  input_password,
  input_rest,
  update_token,
  toggle_logined,
  add_contracts,
} from '../../slices';

import { login, getApiKey, getContracts } from '../../services';
import state from '../../index';

import styled from 'styled-components';

import { waves, waveLine, loginPic, lock } from '../../images';

// Maby bad practice, but I know no way except this to pass state into non-react function

// container class to wrap inputs on a login page
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  row-gap: 20px;
  text-align: center;
`;

const RowContainer = styled.div`
  align-items: center;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const InputBox = styled(RowContainer)`
  gap: 10px;
  width: 342px;
  height: 50px;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 0;
`;

const Input = styled.input`
  width: 342px;
  height: 50px;
  color: white;
  font-family: Gotham Pro;
  outline: 0;
  border: 0;
  background: transparent;
`;

const SubmitButton = styled.button`
  width: 342px;
  height: 50px;

  background: ${({ theme }) => theme.backgrounds.blue};
  border-radius: 4px;
  border: 0;
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h2`
  width: 342px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  font-size: 45px;
  font-family: cursive;
  color: #ffffff;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  background: ${(props) => `url(${props.Pic})`};
  background-repeat: repeat;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(116.82deg, #364f6b 0%, #47688d 100%);

  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const InputField = (props) => {
  const { img, title, action, dispatch } = props;

  return (
    <InputBox>
      <img src={img} style={{ marginLeft: '10px' }} />
      <Input
        placeholder={title}
        onChange={(ev) => {
          ev.preventDefault();
          dispatch(action(ev.target.value));
        }}
      />
    </InputBox>
  );
};

// "admin@ship.ru"   "secret2"

const LoginPage = () => {
  console.log('waves after waves:', waves);

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = useNavigate();

  const { isLoginned } = useSelector((state) => state.app_reducer.sessionData);
  if (!isLoginned) redirect('/login');

  return (
    <Background Pic={waves}>
      <ColumnContainer>
        <Title>
          clerc
          <img src={waveLine} width={152} height={20} style={{ alignSelf: 'center' }} />
        </Title>

        <form>
          <ColumnContainer>
            <InputField img={loginPic} title='Логин' action={input_username} dispatch={dispatch} />

            <InputField img={lock} title='Пароль' action={input_password} dispatch={dispatch} />

            <SubmitButton
              // TODO: write function from onClick as separate function
              onClick={async function (event) {
                // async - only way to use await
                event.preventDefault();
                // **** temporary measure ****
                // TODO: look at oAuth 2.0 => know id and secret
                dispatch(
                  input_rest({
                    client_id: '1',
                    client_secret: 'c75IGwuqkjrO1RWCE4Ntn4zqpQdpgnEO2wGT9iMT',
                    grant_type: 'password',
                  }),
                );

                const loginFormData = state.getState().app_reducer.loginFormData;

                // TODO: handle error here by catching: try {login()} catch(err) { *set some state in store* }
                // then return <Navigate to="/contracts" /> from LoginPage
                const response = await login(loginFormData);
                if (response.status >= 200 && response.status < 300) {
                  dispatch(toggle_logined());
                  redirect('/contracts');
                }

                const responseData = response.data;
                const token = getApiKey(responseData);
                const contracts = await getContracts(token);

                dispatch(update_token(token));
                dispatch(add_contracts(contracts));
              }}
            >
              Войти
            </SubmitButton>
          </ColumnContainer>
        </form>
      </ColumnContainer>
    </Background>
  );
};

export default LoginPage;
export { Title, ColumnContainer, RowContainer };
