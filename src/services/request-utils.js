
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

export {getApiKey, getContracts}