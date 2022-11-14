
import axios from 'axios';  


// ideal doc on configuring axios-instance: https://axios-http.com/docs/req_config 
export const AxiosInstance = axios.create({
    baseURL: 'http://server.clerc.ru/api/v2.0',
    redirect: 'follow',

  });




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

    let res
    try{
        res = await AxiosInstance.post('/auth/login', formdata) }
    catch(err){
        console.log('error', err) }
                
    // response struct: https://axios-http.com/docs/res_schema
    return res;
}



// make format api-key outta response
const getApiKey = (response) => {
    const jwt = response.access_token
    return 'Bearer ' + jwt
}

// requesting all contracts.  to be used in async function 
async function useAPI(apiKey, url){
    
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: apiKey }}
    
    let res = {}
    try{ 
        res = await AxiosInstance.get(url, requestOptions)
    }
    catch(err){
        console.log('error', err)
    }

    console.log('Hello from useAPI:', res.data.data)
    return res.data.data
}

async function getContracts(apiKey){
    return await useAPI(apiKey, '/contracts?order=position')
}


//  detail - path - MUST be in camelCase !!! - use toCamel bellow
async function getContractsInfo(apiKey, id, detail){
    
    // this part wasn`t implimented for POST requests, so useing GET \_(o_o)_/
    if (detail == 'familiarization')
        return await useAPI(apiKey, `http://server.clerc.ru/api/v2.0/contracts/${id}/${detail}?order=position`)
    
        

    // 'filter' in POST  - server`s api for accessing SQL 
    const requestOptions = {  
        filter: [
            {
                column: "contract_id",
                operator: "=",
                value: id
            },
        ]
        }

    // Content-Type needed - bc server needs to know we pass to it JSON encoded data
    const headers = {
        Authorization: apiKey,
        "Content-Type": "application/json"
    } 

    let res
    try{ 
        res = await AxiosInstance.post(`${detail}/search`, JSON.stringify(requestOptions), {headers: headers})
    }
    catch(err){
        console.log('error', err)
    }

    console.log('Hello from POST-based getInfo:', res.data.data)
    return res.data.data
}


// requires camelCase - use toCamel bellow
async function GETgetContractsInfo(apiKey, id, detail){
    const url = `http://server.clerc.ru/api/v2.0/${detail}?order=position&filter[0][column]=contract_id&filter[0][operator]==&filter[0][value]=${id}`
    return await useAPI(apiKey, url)
}




/*
 - we ignore "position" pole => serv sets itself
data: {
    "name": "Новый контракт",
    "counterpart": "Дубликат контракта",
    "number": "КИ-777-2077",
    "price": "1000000.00",
    "note": "Новая заметка",
    "deadline": "2021-12-12",
    "date": "2021-11-12",
    "program_name": "Название программы"
}                                                       */

export async function AddContract(apiKey, data){
    
    const headers = {
        Authorization: apiKey,
        "Content-Type": "application/json" }
    
    try{ 
       AxiosInstance.post("contracts", JSON.stringify(data), {headers: headers})
    }
    catch(err){
        console.log('error', err)
    }

}


const toCamel = (s) => {
    // search for a-z starts with '-' ignoring case('i'), $1 - recived match
    return s.replace(/([-][a-z])/ig, ($1) => {
      // uppering match and removing '-'
      return $1.toUpperCase()
             .replace('-', '')          
    })
}

const toSnake = (s) =>  {
    return s.replace(/([-][a-z])/ig, ($1) => {
      return  $1.replace('-', '_')          
    })
}



export {getApiKey, getContracts, getContractsInfo, login, toCamel, toSnake}