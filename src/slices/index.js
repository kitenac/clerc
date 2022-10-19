import { createSlice } from '@reduxjs/toolkit'
import table_cols from './tables-columns'
import table_urls from './table-urls'

/*
const dummy_response = {
    contracts :
 {
  data: [
    {
      id: 7,
      position: 3,
      name: '«Строительство многофункционального аварийно-спасательного судна мощностью 7 МВт. Многофункциональное аварийно-спасательное судно мощностью 7 МВт (проект MPSV06)»',
      counterpart: 'Акционерное Общество "Объединенная судостроительная корпорация" (АО "ОСК")',
      number: 'КИ-344-2018',
      date: { date: "2018-12-28 00:00:00.000000", timezone_type: 3, timezone: "Europe/Moscow" },
      price: '4611200000',
      deadline: { date: "2021-12-01 00:00:00.000000", timezone_type: 3, timezone: "Europe/Moscow" },
      note: null,
      program_name: 'Государственная программа Российской Федерации "Развитие транспортной системы"'
    },
    {
      id: 14,
      position: 5,
      name: '«Строительство многофункционального аварийно-спасательного судна \n' +
        'мощностью 4 МВт. Многофункциональное аварийно-спасательное судно мощностью 4 МВт проекта MPSV07»',
      counterpart: 'Общество с ограниченной ответственностью «Судостроительный завод «Залив» (ООО "СЗ "ЗАЛИВ")',
      number: 'КИ-336-2015',
      date: { date: "2015-11-26 00:00:00.000000", timezone_type: 3, timezone: "Europe/Moscow" },
      price: '3712999980',
      deadline:  { date: "2019-11-25 00:00:00.000000", timezone_type: 3, timezone: "Europe/Moscow" },
      note: 'Планируется продление срока исполнения Контракта до 15 июня 2020',
      program_name: null
    }]
}
}

const default_contracts = dummy_response.contracts.data
*/

const initialState = {
  sessionData: { 
    apiToken: '',
    isLoginned: false
  }, 

  loginFormData:{
      username: '',
      password: '',
      client_id: '', 
      client_secret: '',
      grant_type: ''     },

  contractsPageData: [],


  contractDetails:{
      table_cols,
      table_urls,
      shipProperties: [],
      bankGuarantees: [],
      limitBudgetaryObligations: [],
      contractObjects: [],
      paymentStages: [],
      keyEvents: [],
      claimWorks: [],
      judicialWorks: [],
      cashExecutions: [],
      familiarization: []
  }

}

// TODO: maby make slice for each substate
const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        // !!!!!!! Не забывай про {} в reducer`ах тк они не должны возвращать значение, иначе никакого эффекта !!!!!!!!!!!!!!!!!!!!!!
        
        // loginFormData:
        input_username: (state, action) =>   {state.loginFormData.username = action.payload},
        input_password: (state, action) =>   {state.loginFormData.password = action.payload},
        input_rest: (state, action)     =>   {
          const { client_id, client_secret, grant_type } = action.payload

          state.loginFormData.client_id = client_id
          state.loginFormData.client_secret = client_secret
          state.loginFormData.grant_type = grant_type
        },

        // contractsPageData:
        add_contracts: (state, action)  =>   {state.contractsPageData.push(...action.payload)},
        set_contracts: (state, action)  =>   {state.contractsPageData = action.payload},

        // contractDetails:
        add_shipProperties:             (state, action) => {state.contractDetails.shipProperties.push(...action.payload)},
        add_bankGuarantees:             (state, action) => {state.contractDetails.bankGuarantees.push(...action.payload)},
        add_limitBudgetaryObligations:  (state, action) => {state.contractDetails.limitBudgetary.push(...action.payload)},
        add_contractObjects:            (state, action) => {state.contractDetails.contractObjects.push(...action.payload)},
        add_paymentStages:              (state, action) => {state.contractDetails.paymentStages.push(...action.payload)},
        add_keyEvents:                  (state, action) => {state.contractDetails.keyEvents.push(...action.payload)},
        add_claimWorks:                 (state, action) => {state.contractDetails.claimWorks.push(...action.payload)},
        add_judicialWorks:              (state, action) => {state.contractDetails.judicialWorks.push(...action.payload)},
        add_cashExecutions:             (state, action) => {state.contractDetails.cashExecutions.push(...action.payload)},
        add_familiarization:            (state, action) => {state.contractDetails.familiarization.push(...action.payload)},

        set_shipProperties:             (state, action) => {state.contractDetails.shipProperties  = action.payload},
        set_bankGuarantees:             (state, action) => {state.contractDetails.bankGuarantees  = action.payload},
        set_limitBudgetaryObligations:  (state, action) => {state.contractDetails.limitBudgetary  = action.payload},
        set_contractObjects:            (state, action) => {state.contractDetails.contractObjects = action.payload},
        set_paymentStages:              (state, action) => {state.contractDetails.paymentStages   = action.payload},
        set_keyEvents:                  (state, action) => {state.contractDetails.keyEvents       = action.payload},
        set_claimWorks:                 (state, action) => {state.contractDetails.claimWorks      = action.payload},
        set_judicialWorks:              (state, action) => {state.contractDetails.judicialWorks   = action.payload},
        set_cashExecutions:             (state, action) => {state.contractDetails.cashExecutions  = action.payload},
        set_familiarization:            (state, action) => {state.contractDetails.familiarization = action.payload},

        

        // sessionData:
        update_token:  (state, action)  =>   {state.sessionData.apiToken = action.payload},
        
        // ! Temporary measure: TODO: make some function to check if token is valid
        //   => if it`s true: toggle loggined state  (with rights of authenticated user)
        toggle_logined:(state, action)  =>   {state.sessionData.isLoginned = ! state.sessionData.isLoginned}

    }
})

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { input_username, 
               input_password, 
               input_rest,

               add_contracts, 

               update_token,

               toggle_logined,
              
               add_shipProperties,     
               add_bankGuarantees,            
               add_limitBudgetaryObligations,
               add_contractObjects,           
               add_paymentStages,             
               add_keyEvents,                 
               add_claimWorks,                
               add_judicialWorks,             
               add_cashExecutions,            
               add_familiarization,
               
               set_shipProperties,     
               set_bankGuarantees,            
               set_limitBudgetaryObligations,
               set_contractObjects,           
               set_paymentStages,             
               set_keyEvents,                 
               set_claimWorks,                
               set_judicialWorks,             
               set_cashExecutions,            
               set_familiarization } = AppSlice.actions

// needed in store
export default AppSlice.reducer