import { useLocation, useNavigate, Route } from 'react-router-dom';

import Header from '../head';
import { RowContainer, ColumnContainer } from './login-page';
import { toCamel, getContractsInfo, toSnake } from '../../services/request-utils';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// пойдёт рядом с шапкой!!!
const Navbar = () => {
  const places = [];
};

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

const Row = styled(RowContainer)`
  gap: 50px;
  padding: 5px;
  width: 100vw;
  justify-content: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
`;

const Col = styled(ColumnContainer)`
  justify-content: flex-start;
  align-items: flex-start;
  column-gap: 50px;
  padding: 10px;
  width: 50%;
`;

const Line = styled.div`
  display: absolute;
  box-sizing: border-box;
  width: 80vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

// white-list(of tags) filter for object(response array)
const filter_tags = (tags, response_arr) => {
  return response_arr.map((el) => Object.fromEntries(tags.map((tag) => [tag, el[tag]]))); // making new objects from key:value pairs
};

// Table-generator. !!! table = {anot, values}
// |anot| = n - вручную пишем заголовки
// |values| = n*m, m - число строк(объектов) - достаём из стейта

// Vals - массив объектов
// каждый объет - образует строку
// строка содержит некоторые поля объекта Anot.key
// Anot: [{key, val}, ...]

// le kostyl`:
//  Anot - array of objects with {key, value} poles
//  key - some key, idx - index of object with such key
const find_idx = (key, Anot) => {
  let idx = 0;
  for (let el of Anot) {
    if (el.key === key) return idx;
    idx++;
  }
  return -1; // if no match
};

const Table = ({ table }) => {
  // |values| = n*m => 2 maps
  const { Anot, Vals } = table;

  const Anotation = Anot.map((anot) => {
    return <AnotFont>{!anot.value ? ' — ' : anot.value}</AnotFont>;
  });

  let Cols = [];
  // initing multi-dimentional(dim = Anotation.length) array - colomuns
  for (let i = 0; i < Anotation.length; ++i) Cols.push([Anotation[i]]);

  // Pushing needed keys from array of objects to columns from Cols

  for (let val of Vals)
    for (let [key, value] of Object.entries(val)) {
      const idx = find_idx(key, Anot);

      if (idx !== -1) Cols[idx].push(<TableFont>{!value ? ' — ' : value}</TableFont>);
    }

  // wrapping each array into column tag
  Cols = Cols.map((col) => <Col> {col} </Col>);

  // Taking needed keys from array of objects
  const Lines = Vals.map((val) => {
    return (
      <Row>
        {Anot.map((anot) => {
          const key = anot.key;
          return (
            <Col key={anot.id}>
              {' '}
              <TableFont>{!val[key] ? ' — ' : val[key]}</TableFont>{' '}
            </Col>
          );
        })}
      </Row>
    );
  });

  /*
    let Tabl = []
    for (let i = 0; i < Vals.length; ++i){
        let Line = []
        for (let j = 0; j < Cols.length; ++j)
            Line.push(Cols[i][j])
        Tabl.push(<Row> {Line} </Row>)
    }
    */

  return (
    <div>
      {/*Normal cols:*/}
      {/*<Row>{Cols}</Row>*/}
      Normal lines:
      {Lines}
    </div>
  );
  /*
    // columns goes in a row
    return  <table>
              <Row>
                {Anotation}
              </Row>   
                {Lines} 
            </table>
    */
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

  console.log('chosen ', chosenTable);
  //getContractsInfo(sessionData.apiToken, id, chosenTable)
  //console.log('fetched data', getContractsInfo(sessionData.apiToken, id, chosenTable))

  //    <Table table = {chosenTable}/>
  return (
    <div>
      <Header />

      <Table table={testTable} />
    </div>
  );
};

export default ContractDetails;
