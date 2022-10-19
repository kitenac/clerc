import { useLocation, useNavigate, Route } from 'react-router-dom';

import Header from '../head';
import { RowContainer, ColumnContainer } from './login-page';
import { getContractsInfo, toSnake } from '../../services/request-utils';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { set_shipProperties,     
         set_bankGuarantees,            
         set_limitBudgetaryObligations,
         set_contractObjects,           
         set_paymentStages,             
         set_keyEvents,                 
         set_claimWorks,                
         set_judicialWorks,             
         set_cashExecutions,            
         set_familiarization  } from '../../slices'

import { flaterDate, transformPriceFormat } from '../contractCard';

// KOSTYL`
// TODO: devide slices => can import staff bellow from single file as 'actions' without duplicating code
const actions = [ 
  set_shipProperties,     
  set_bankGuarantees,            
  set_limitBudgetaryObligations,
  set_contractObjects,           
  set_paymentStages,             
  set_keyEvents,                 
  set_claimWorks,                
  set_judicialWorks,             
  set_cashExecutions,            
  set_familiarization ]



const AnotFont = styled.span`
  font-family: 'Gotham Pro';
  font-style: normal;
  font-weight: 550;
  font-size: 14px;
  line-height: 125%;
  width: 100%;
  text-align: left;

  color: #37516d;
`;

const TableFont = styled(AnotFont)`
  font-weight: 400;
  color: #333333;
`;

const NavFont = styled(AnotFont)`
  white-space: nowrap;

  height: 18px;
  color: rgba(55, 81, 109, 0.4);
`

const Row = styled(RowContainer)`
  padding: 5px;
  width: 100vw;
  justify-content: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
`;


// width - helps to make pseudo columns(50% - due we have 2 columns)
const Col = styled(ColumnContainer)`
  justify-content: flex-start;
  align-items: flex-start;
  
  padding: 10px;
  width: 50%;
`;


// white-list(of tags) filter for object(response array)
const filter_tags = (tags, response_arr) => {
  return response_arr.map((el) => Object.fromEntries(tags.map((tag) => [tag, el[tag]]))); // making new objects from key:value pairs
};



const NavCol = styled(Col)`
  border: '0';

`



// converting each complex pole of object into simple pole & formating data(prices, time, etc)
// Alert: complexResponse - must be array of objects which are to be flatten 
const makeFlatenFormated = (complexResponse) => {
  let flatResponse = complexResponse
  const Dates = [
    'date', 'validity', 'last_modified_date', 'start_date', 
    'expiration_date_planned', 'expiration_date_real', 
    'statement_claim_date', 'court_hearing_date', 
    'payment_date_planned', 'payment_date'
  ]
  const Prices = ['amount', 'price', 'amount_paid']

  complexResponse.forEach((complexPole, idx) => {

    for (let Date of Dates)
        if ( Object.keys(complexPole).includes(Date) )
           flatResponse[idx][Date] = flaterDate(complexPole[Date])

    for (let Price of Prices)
        if ( Object.keys(complexPole).includes(Price) )
           flatResponse[idx][Price] = transformPriceFormat(complexPole[Price])  
  })

  return flatResponse
}


async function ShowSubdetail(ev, options, path, action){
  ev.preventDefault()

  console.log('action is', action)

  const parts = path.split('/');
  const id = parts[2];
  const {dispatch, redirect, apiKey} = options

  const subDetail = action.type.replace('App/set_', '')

  let info = await getContractsInfo(apiKey, id, subDetail)
  info = makeFlatenFormated(info)

  dispatch(action(info))
  redirect(path)
}




// пойдёт рядом с шапкой!!!
const Navbar = ({id}) => {
  const redirect = useNavigate();
  const dispatch = useDispatch()
  const apiKey   = useSelector((state) => state.app_reducer.sessionData.apiToken)
  const places = useSelector((state) => state.app_reducer.contractDetails.table_urls) 
  
   
  const options = {dispatch, redirect, apiKey}


  return <div>
            <Row style={{width: '80%'}}> 
               {places.map((el, idx) => <NavCol onClick={ async function(ev) { 
                                            return await ShowSubdetail(ev, options,
                                                         `/contracts/${id}/${el[1]}`, actions[idx])} }>    
                                      <NavFont> 
                                        {el[2]}  
                                      </NavFont>   
                                   </NavCol>)} 
            </Row>
            <Row style={{width: '100%', marginTop: '-0.5%'}}/>
         </div>

};






/* Table-generator. !!! table = {anot, values}
  |anot| = n - вручную пишем заголовки
  |values| = n*m, m - число строк(объектов) - достаём из стейта
  
  Vals - массив объектов
  каждый объет - образует строку
  строка содержит некоторые поля объекта Anot.key
  Anot: [{key, val}, ...]
  
  le kostyl`:
   Anot - array of objects with {key, value} poles
  key - some key, idx - index of object with such key */

  const Table = ({ table }) => {
  // |values| = n*m => 2 maps
  const { Anot, Vals } = table;

  const Anotation = Anot.map((anot) => {
    return <Row style={{ border: '0' }}> 
                <AnotFont>{!anot.value ? ' — ' : anot.value}</AnotFont> 
           </Row> 
  });

  // Taking needed keys from array of objects
  // row - consists of columns
  const Lines = Vals.map((val) => {
    return (
      <Row>
        {Anot.map((anot) => {
          const key = anot.key;
          return (
            <Col key={anot.id}>
              {' '}
              <TableFont>{!val[key] ? ' — ' : val[key]}</TableFont>
              {' '}
            </Col>
          );
        })}
      </Row>
    );
  });

  return (
    <div>
      <Row> {Anotation} </Row> 
      {Lines}
    </div>
  );
};

// TODO: сделать тут отображение нужной таблицы в зависимости от текущего урла!!!
const ContractDetails = () => {
  const location = useLocation();
  const state = useSelector((state) => state.app_reducer);
  const { sessionData, contractDetails, contractsPageData} = state;
  const { table_cols, table_urls, ship_properties } = contractDetails;

  let crumbs = location.pathname.split('/');
  const id = crumbs[2]
  const url = crumbs[3]  


  let chosenTable, detailName
  for (let el of table_urls)
      if (el[1] === url){ 
          chosenTable = el[0]
          detailName = el[2]
          break}


  const testTable = { Anot: table_cols[chosenTable],
                      Vals: contractDetails[chosenTable] };

  console.log('chosen: ', chosenTable);

  let idx
  contractsPageData.forEach( (el, IDX) => {
    if (el.id === Number(id)){
        idx = IDX
        return }
    })
  
  console.log(`${idx}'st el of contractsPageData has id = ${id} - right?`)
  
  const breadCrumbs = {
    contractName: contractsPageData[idx]['number'], 
    detail: detailName}

  return (
    <div>
      <Header breadCrumbs={breadCrumbs}/>
      <Navbar id={id}/>

      <Table table={testTable} />
    </div>
  );
};

export default ContractDetails;
