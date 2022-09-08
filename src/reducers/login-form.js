
// actualy, state here(and in other subreducers) is substate(acording to index.js)
const updateLoginData = (state, action) => {
    
    if (state === undefined )                 
        return{
                    username: '',
                    password: '',
                    client_id: '', 
                    client_secret: '',
                    grant_type: ''     
        }
    
    const payload = action.payload


    switch (action.type) {

      case 'INPUT_USER':
        return { ...state, username: payload }
  
      case 'INPUT_PSWD':
        return { ...state, password: payload }

      case 'INPUT_REST':
        const {
          client_id, 
          client_secret, 
          grant_type    } = payload

        return { 
                  ...state,
                  client_id, 
                  client_secret, 
                  grant_type
                }  

      default:
        return state
    }
    
  };

export default updateLoginData


