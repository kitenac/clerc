import updateLoginData    from "./login-form"
import updateContracts    from "./contracts-page"
import updateSession      from "./session-data"      


const reducer = (state = {}, action = { payload: {} }) => {
    return{
        sessionData:        updateSession(state.sessionData , action),
        loginFormData:      updateLoginData(state.loginFormData , action),
        contractsPageData:  updateContracts(state.contractsPageData , action)
    }
}
  
export default reducer