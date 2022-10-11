// To call reducer`s 'api' we need to call  store.dispatch( {type: ACTION_NAME} )
// so here we served action {type: ACTION_NAME} for each api`s function

export const input_username = (username) => ({ type: 'INPUT_USER', payload: username });
export const input_password = (password) => ({ type: 'INPUT_PSWD', payload: password });
export const input_rest = (rest) => ({ type: 'INPUT_REST', payload: rest });

export const update_token = (token) => ({ type: 'UPDATE_TOKEN', payload: token });

export const add_contracts = (contracts) => ({ type: 'ADD_CONTRACTS', payload: contracts });

// Login is the "thunk action creator":
export function Login() {
  // thunk itself: can be anonymous
  return async function LoginThunk(dispatch, getState) {
    var formdata = new FormData();

    const loginFormData = getState().loginFormData;

    const { username, password, client_id, client_secret, grant_type } = loginFormData;

    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('client_id', client_id);
    formdata.append('client_secret', client_secret);
    formdata.append('grant_type', grant_type);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    let res = await fetch('http://server.clerc.ru/api/v2.0/auth/login', requestOptions).catch(
      (error) => console.log('error: ', error),
    );

    return res.text(); // !!! remember - it`s just 'promise' to be awited in different async function
  };
}
