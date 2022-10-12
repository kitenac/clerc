import { useLocation, useNavigate, Route } from 'react-router-dom';

import Header from '../head';
import { RowContainer, ColumnContainer } from './login-page';
import { toCamel, getContractsInfo, toSnake } from '../../services/request-utils';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


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


async function ShowSubdetail(ev, options, path){
  ev.preventDefault()
  const {dispatch, redirect, apiKey} = options
  const detail = await getContractsInfo(apiKey, id, 'shipProperties')
  dispatch(action(detail))
  redirect(path)
  return 'I`ll draw fetched table from state soon :)'
}


// пойдёт рядом с шапкой!!!
const Navbar = ({id}) => {
  const redirect = useNavigate();
  const dispatch = useDispatch()
  const apiKey = useSelector((state) => state.app_reducer.sessionData.apiToken)
  
  
  const places = [
    ['Характеристики судна', `${id}/ship-properties`],
    ['Банковская гарантия', `${id}/bank-guarantees`],
    ['ФАИП', `${id}/limits`],
    ['Объекты', `${id}/objects`],
    ['Этапы платежей', `${id}/payment-stages`],
    ['Ключевые события', `${id}/key-events`],
    ['Претензионная работа', `${id}/claim-works`],
    ['Судебная работа', `${id}/judical-works`],
    ['Кассовое исполнение', `${id}/cash-execution`],
    ['Освоение', `${id}/developing`]
  ];
  
  TODO: add places[2] as action to be dispatched
  const options = {dispatch,redirect, apiKey}

  return <div>
            <Row style={{width: '80%'}}> 
               {places.map((el) => <NavCol onClick={ (ev) => ShowSubdetail(ev, options, `/contracts/${el[1]}`, el[2]) }>    
                                      <NavFont> 
                                        {el[0]} 
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
  const redirect = useNavigate();

  const state = useSelector((state) => state.app_reducer);
  const { sessionData, contractDetails } = state;
  const { table_cols, charecteristic } = contractDetails;

  const testTable = { Anot: table_cols.characteristic, Vals: charecteristic };
  console.log('test table:', testTable, 'cols:', table_cols.characteristic);

  let crumbs = location.pathname.split('/');
  const id = crumbs[2];
  const chosenTable = toCamel(crumbs[3]); // must be camelCased

  console.log('chosen: ', chosenTable);
  //getContractsInfo(sessionData.apiToken, id, chosenTable)
  //console.log('fetched data', getContractsInfo(sessionData.apiToken, id, chosenTable))

  //    <Table table = {chosenTable}/>
  return (
    <div>
      <Header />
      <Navbar id={id}/>

      <Table table={testTable} />
    </div>
  );
};

export default ContractDetails;
