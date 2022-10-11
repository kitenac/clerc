import { createSlice } from '@reduxjs/toolkit'
import table_cols from './tables-columns'

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
      charecteristic: [],
      bank_garanty: [],
      limits: [],
      contract_objects: [],
      payment_stages: [],
      key_events: [],
      claim_works: [],
      judical_works: [], 
      cash_executions: [],
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

        // contractDetails:
        add_charecteristic:   (state, action) => {state.contractDetails.charecteristic.push(...action.payload)},
        add_bank_garanty:     (state, action) => {state.contractDetails.bank_garanty.push(...action.payload)},
        add_limits:           (state, action) => {state.contractDetails.limits.push(...action.payload)},
        add_contract_objects: (state, action) => {state.contractDetails.contract_objects.push(...action.payload)},
        add_payment_stages:   (state, action) => {state.contractDetails.payment_stages.push(...action.payload)},
        add_key_events:       (state, action) => {state.contractDetails.key_events.push(...action.payload)},
        add_claim_works:      (state, action) => {state.contractDetails.claim_works.push(...action.payload)},
        add_judical_works:    (state, action) => {state.contractDetails.judical_works.push(...action.payload)},
        add_cash_executions:  (state, action) => {state.contractDetails.cash_executions.push(...action.payload)},
        add_familiarization:  (state, action) => {state.contractDetails.familiarization.push(...action.payload)},

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
              
               add_charecteristic,
               add_bank_garanty,
               add_limits,
               add_contract_objects,
               add_payment_stages,
               add_key_events,
               add_claim_works,
               add_judical_works, 
               add_cash_executions,
               add_familiarization  } = AppSlice.actions

// needed in store
export default AppSlice.reducer