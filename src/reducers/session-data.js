
const updateSession = (state, action) =>{

    if (state === undefined)
        return {   apiToken: ''  }
    

    switch(action.type){
        case 'UPDATE_TOKEN':
            return { ...state,  apiToken: action.payload}
        default:
            return state
    }
    

}

export default updateSession