import { createSlice } from '@reduxjs/toolkit'

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

const initialState = {
  sessionData: { apiToken: '' }, 

  loginFormData:{
      username: '',
      password: '',
      client_id: '', 
      client_secret: '',
      grant_type: ''     },

  contractsPageData: default_contracts      // TODO
}

const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        // !!!!!!! Не забывай про {} в reducer`ах тк они не должны возвращать значение, иначе никакого эффекта !!!!!!!!!!!!!!!!!!!!!!
        input_username: (state, action) =>   {state.loginFormData.username = action.payload},
        input_password: (state, action) =>   {state.loginFormData.password = action.payload},
        input_rest: (state, action)     =>   {
          const { client_id, client_secret, grant_type } = action.payload

          state.loginFormData.client_id = client_id
          state.loginFormData.client_secret = client_secret
          state.loginFormData.grant_type = grant_type
        },

        add_contracts: (state, action)  =>   {state.contractsPageData.contracts = action.payload},
        update_token:  (state, action)  =>   {state.sessionData.apiToken = action.payload}

    }
})

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { input_username, 
               input_password, 
               input_rest,
               add_contracts, 
               update_token } = AppSlice.actions

// needed in store
export default AppSlice.reducer