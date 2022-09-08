
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

const default_state = dummy_response.contracts.data

const updateContracts = (state, action) =>{

    // !!! TODO default_state - temporary mesure - must be contracts: [] !!!
    if (state === undefined)
        return default_state
            
    switch(action.type){
        case 'ADD_CONTRACTS':
            return {...state,  contracts: action.payload}
    
    // !!! TODO - same
        default:
            return default_state
    }
    

}

export default updateContracts;