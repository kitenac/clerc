
// sending already filled form to server
async function login( loginFormData ) {
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






// make format api-key outta response
const getApiKey = (response) => {
    const jwt = JSON.parse(response).access_token
    return 'Bearer ' + jwt
}

// requesting all contracts.  to be used in async function 
async function getContracts(apiKey){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            Authorization: apiKey }
    }
    

    // ALERT: в доке этого нет => может измениться, когда бэк перепишут как параметр, так и URI
    const GET_param = 'order=position'

    let res = await fetch(`http://server.clerc.ru/api/v2.0/contracts?${GET_param}`, requestOptions)
      .then(response => response.text())
      .then(result => result)
      .catch(error => console.log('error', error))

    return JSON.parse(res)      // UNICODE decoding and converting to object by .parse
}

export {getApiKey, getContracts, login}