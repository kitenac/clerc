/*
import axios from 'axios';      // to make it work - add "type" : "module" in package.json

const AxiosInstance = axios.create({
    baseURL: 'ttp://server.clerc.ru/api/v2.0/',
    headers: {'Authorization': token}
  });
*/

async function login() {
    var formdata = new FormData();
    formdata.append("username", "admin@ship.ru");
    formdata.append("password", "secret2");
    formdata.append("client_id", "1");
    formdata.append("client_secret", "c75IGwuqkjrO1RWCE4Ntn4zqpQdpgnEO2wGT9iMT");
    formdata.append("grant_type", "password");


/*
    let res = await axios.post('http://server.clerc.ru/api/v2.0/auth/login')
                .then((res) => console.log('\n\nresponse', res, '-----'))
                .catch((error) => console.log('error', error))
*/
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }


    let res = await fetch("http://server.clerc.ru/api/v2.0/auth/login", requestOptions)
                        .catch((error) => console.log('error: ', error))
    

    return res.text()  // remember - it`s just 'promise' to be awited in different async function
}



const getApiKey = (response) => {
    const jwt = JSON.parse(response).access_token;
    return 'Bearer ' + jwt;
}


async function getContracts(apiKey){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            Authorization: apiKey        
        }
    }
    

    const GET_param = 'order=position'

    let res = await fetch(`http://server.clerc.ru/api/v2.0/contracts?${GET_param}`, requestOptions)
      .then(response => response.text())
      .then(result => result)
      .catch(error => console.log('error', error))

    return JSON.parse(res)      // UNICODE decoding and converting to object by .parse
}


async function asyncWork(){
    const response = await login()
    const apiKey = getApiKey(response)
    console.log('\njwt aka api-key:\n', apiKey)

    const contracts = await getContracts(apiKey)
    console.log('\n\ncontracts :\n', contracts, '\n-------------------\n')
    
}


// !! Need for testing requests
// asyncWork()



const filter_tags = (tags, response_arr) => {
    return response_arr.map((el) => Object.fromEntries(
                                    tags.map((tag) => [tag, el[tag]])   ))  // making new objects from key:value pairs
}


const Rabbits = [
    { color: 'white',
      frindly: false,
      food: 'vegetables',
      speed: 53 },
    { color: 'brown',
      frindly: true,
      food: 'vegetables',
      speed: 57 }
]

const need_tags = ['color', 'fiendly']
console.log(`\n\n Testing filtering by tags: ${need_tags}:\n`, filter_tags(need_tags, Rabbits), '\n\n')


//TestResponse = '{"token_type":"Bearer","expires_in":31536000,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ3ZWQ5MzA0ODE5ODNhNGVkMzdhYTk3NzIwODk1NmNmYzJmY2YwOWY3OWFiYjUxODVkMzZlYWNmNzc0NGI1YmUyMGZkYjg0OTQ0ZDQ0NjcyIn0.eyJhdWQiOiIxIiwianRpIjoiZDdlZDkzMDQ4MTk4M2E0ZWQzN2FhOTc3MjA4OTU2Y2ZjMmZjZjA5Zjc5YWJiNTE4NWQzNmVhY2Y3NzQ0YjViZTIwZmRiODQ5NDRkNDQ2NzIiLCJpYXQiOjE2NjIzMjM0ODgsIm5iZiI6MTY2MjMyMzQ4OCwiZXhwIjoxNjkzODU5NDg4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.UMje1zY9ok3XiwUUTRFB3rPl-cMhIb1FVkkiLyAN2onCCvI8LzCTP4ZGO3OGnpBBpKIC_GTJaRC8u_bdP_YUzrn8OnyhRsYTUfVE8nUGQmTEEMIvXoQYxNG3ynRA0d9r_5eGtBAccPa-V3r4lSwgqvnyEaJtw1xux1AMb_-HGImoSIWNqqnq9kaHTkeYSPwiGFkuACTNDPw8h_rCxCxGy7Qz9hhD4QjcYOguWgvw4ETqC-PgD3Dh3a4weg1e2FRCeeJJZmYc2YvXLpnF0uwhOSbPA92tfYpo4lTwuO886hZYB-64X1t12oFN8tNKIRqDJWIeB0Ugw6PDCM7WqpNcYsew3yhuA6oZNKwGdQP8h9D8KgHGvKShbbUfZrL7Lv-TLaA9b9o0I-JY5LFGF3MzbkMBLUuVvRjL_jevjzTV7YH3FlD6Wp1fB6u7wTfe6Mepy0PKuCdgzJjAUp0bX9z3Oadp3bsowHNUqnSsgPyLT9UneZqlot2H62qR_9auTWRyhwafWSkQayoLHTirIXFj76p3dRH_Xe0LtzztYvzd112RK_MsUIruAiQorefCBR47V3eDeNaVwLB1sOB1Ol-VXFz4OeVRbz6nlRpRd3q0XK13kTM1JAVe9GGS_2pmFQmPyyhmwODxSPT1qQMbc7hlTKLVpJ5fTu0C2yTXGezwcgc","refresh_token":"def502008b566d5fd8a772529819f728389e6c405b4ed71ce025e4da02947b2ee9cb39ab31b4a162bfc51d77954ee1262170dee74f5f023fef44fed8f73d3dc40551d3ad357f7ed7ad90b4117729b708a59b1122352b77bf18d42efd1a79c2801583cb7fe68ec3fa582c4d6cd14217557c6418c69aac737f6e8cc9292b04e78068e183a1b252b2463d98ff44634db7a54e945e1d48ce851e45ded033c9b7a5790451ae0f11f84943f4ae170249c7b0488335bcf58b0be5b9880dad83e25348e07dc698657a05ea3b78ac0a8145805e91793d3469a6378c9f397f29c049ef93c8d8107243b7bb62d932cd6e48747e8effaad204e8de230971f70ead26b60a32999163f1d0c7a6c976c38a99d4c6680f782801fc39c74820c6751c42adc6c0061cd000641c6384074497292ff95e60db355e4067c728951db8fc23f2fabdc2df07d5b956e3efdf66469d0a12e3e1028b7b564a05e20dc5147c85c1c6fbf59c17b07a","role":1,"config":{"fontSize":"sm"},"id":1}'

//apiKey = getApiKey(TestResponse)
//console.log('API key:', apiKey)


