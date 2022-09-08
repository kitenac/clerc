import { connect } from "react-redux"


// sending already filled form to server
async function Login( loginFormData ) {
    var formdata = new FormData();

    const {
        username,
        password,
        client_id, 
        client_secret,
        grant_type     } = loginFormData

    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("client_id", client_id);
    formdata.append("client_secret", client_secret);
    formdata.append("grant_type", grant_type);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }


    let res = await fetch("http://server.clerc.ru/api/v2.0/auth/login", requestOptions)
                        .catch((error) => console.log('error: ', error))
                        
    return res.text();          // !!! remember - it`s just 'promise' to be awited in different async function
}


// taking props from Redux-store
const mapStateToProps = (state) => {
    const {loginFormData} = state
    return loginFormData
}


// ask Redux to give us(Login funtion) Store props and methods to affecr`em

export default connect(mapStateToProps)(Login)
