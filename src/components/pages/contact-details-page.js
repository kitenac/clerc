import { useLocation, useNavigate, Route } from 'react-router-dom';

import Header from "../head"
import { RowContainer, ColumnContainer} from "./login-page"
import { toCamel, getContractsInfo, toSnake } from '../../services/request-utils'
import styled from 'styled-components'
import { useSelector } from 'react-redux';



// пойдёт рядом с шапкой!!!
const Navbar = () => {
    const places = [

    ]
}

const AnotFont = styled.text`
    font-family: 'Gotham Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 125%;

    color: #37516D;
`

const TableFont = styled(AnotFont)`
    color: #333333;
`

const Row = styled(RowContainer)`
    row-gap: 50px;
    width: 80%;
    text-align: left;
    border: 1px solid grey;
`


const Col = styled(ColumnContainer)`
    column-gap: 50px;
`




// white-list(of tags) filter for object(response array) 
const filter_tags = (tags, response_arr) => {
    return response_arr.map((el) => Object.fromEntries(
                                    tags.map((tag) => [tag, el[tag]])   ))  // making new objects from key:value pairs
}



// Table-generator. !!! table = {anot, values}
// |anot| = n - вручную пишем заголовки
// |values| = n*m, m - число строк(объектов) - достаём из стейта

// Vals - массив объектов
// каждый объет - образует строку
// строка содержит некоторые поля объекта Anot.key
// Anot: [{key, val}, ...]


const Table = (props) =>{
                    
    // |values| = n*m => 2 maps
    const {table} = props
    const {Anot, Vals} = table

    const Anotation = Anot.map((anot) => {
        return <Col>
                 { (!anot.value) ?  ' — ' : anot.value } 
               </Col>})


    // Taking needed keys from array of objects
    const Lines = Vals.map((val)=> {
        return <Row> 
                {
                    Anot.map((anot) => {
                        const key = anot.key
                        return <Col> <TableFont> 
                                    { (!val[key]) ?  ' — ' : val[key] }
                              </TableFont> </Col> })
                }
               </Row> })
    
    // columns goes in a row
    return  <table>
              <Row>
                {Anotation}
              </Row>   
                {Lines} 
            </table>
}









// TODO: сделать тут отображение нужной таблицы в зависимости от текущего урла!!!
const ContractDetails = () =>{
    const location = useLocation()
    const redirect = useNavigate()

    const state = useSelector((state) => state.app_reducer)
    const {sessionData, contractDetails} = state
    const {table_cols, charecteristic} = contractDetails
    
    const testTable = { Anot: table_cols.characteristic, Vals: charecteristic } 
    console.log('test table:', testTable, 'cols:', table_cols.characteristic)

    let crumbs = location.pathname.split('/')
    const id = crumbs[2]
    const chosenTable = toCamel(crumbs[3])      // must be camelCased

    console.log('chosen ', chosenTable)
    //getContractsInfo(sessionData.apiToken, id, chosenTable)
    //console.log('fetched data', getContractsInfo(sessionData.apiToken, id, chosenTable))

//    <Table table = {chosenTable}/>    
    return <div>
                <Header/> 
                <Table table = {testTable}/>
           </div>
    
}

export default ContractDetails