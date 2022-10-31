// each cart is button itself and has 2 buttons inside: coppy and properties !!!
// CSS - from figma


import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_shipProperties } from '../../slices'
import { getContractsInfo } from '../../services/request-utils'
import { ColumnContainer, RowContainer } from '../pages/login-page'

const AnotFont = styled.div`
  font-family: cursive;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 125%;

  color: #579BE3;
`

 
const Item = styled.div`
  font-family: cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;

  color: #333333;   
`

const Card = styled.div`
  box-sizing: border-box;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  width: 99vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
  :hover {
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
`


const CardsContain = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.6rem;
  margin-top: 0.7rem;
  margin-bottom:0.5rem;
  gap: 10px;
`


// transforming pole date from Date object
// ex: Date: {date: 2018-12-28 00:00:00.000000 ---> 28.12.18}
const flaterDate = (Date) =>{
  if (!Date || !Date.date) return ' — ' 

  const parts = Date.date.slice(0, 10).split('-')              // remove exact time from date(actualy zeroes), parse date into parts by '-' symbol 
  return `${parts[2]}.${parts[1]}.${parts[0].slice(2)}г.` 
}


const transformPriceFormat = (price) =>{
  if (!price) return  ' — '

  // inserting spacebar after each 3 digets of price number. ps cycle may be optimized 
  let i = price.length % 3
  let spacedPrice = price.slice(0, i) + ' '
  
  for (; i < price.length-3; i+=3)
      spacedPrice += price.slice(i, i+3) + ' '        // we don`t want spacing after '.' sign
  
  // handle last 3 chars(may be 3 digets or '.' and 2 digets)
  if (price.indexOf('.') !== -1) spacedPrice = spacedPrice.trimEnd()  // we don`t need spacing before fraction part

  return spacedPrice + price.slice(i,).replace('.', ',') + ' ₽' 
}






// generating configurable elements of line
const createLineElement = (pole, elWidth='100%') => {
  let anot, item
  if (pole) [anot, item] = pole
  return <div style={{width: elWidth}}>
            <AnotFont> { (!anot) ?  ' — ' : anot }: </AnotFont>
            <Item>     { (!item) ?  ' — ' : item }  </Item>
          </div>
}

// wrapping elements into line of configurable wigth
const wrapElements = (elements, width="100%") =>{
  return <RowContainer style={{width: width}}>
           { elements }
         </RowContainer>
}

// generating configurable lines
const createLine = (poles, width="100%", elWidth='100%') => {
  const elements = Object.values(poles).map(pole => createLineElement(pole, elWidth))
  return wrapElements(elements, width)         
}



const ContractCard = (props) => {

    const redirect = useNavigate()
    const dispatch = useDispatch()
    const apiKey = useSelector((state) => state.app_reducer.sessionData.apiToken)

    const { info, onCardSelected} = props
    const {
      id,
      name,
      counterpart,
      number,
      date,
      price,
      deadline,
      note,
      program_name} = info
    
    const Date = flaterDate(date)
    const Deadline = flaterDate(deadline)
    const Price = transformPriceFormat(price)

    const contracts = [['Наименование', name],    
                       ['Номер гос. контракта', number],
                       ['Дата подписания контракта', Date],
                       ['Окончание выполнения работ', Deadline],
                       ['Цена контракта',  Price],
                       ['Название программы', program_name],
                       ['Генподрядчик', counterpart],
                       ['Примечание', note]]
    
    const Top = contracts[0]
    const Body = contracts.slice(1, 5)
    const preBottom = [createLineElement(contracts[5], '25%'), 
                       createLineElement(contracts[6], '50%')]
    const Bottom = contracts[7]
    let items = []

    items.push(createLine([Top]))
    items.push(createLine(Body, '40%', '50%'))
    items.push(wrapElements(preBottom, '80%'))
    items.push(createLine([Bottom]))

    return (
      <Card key={id} onClick ={ async function(event) { 
            event.preventDefault()
            const charac = await getContractsInfo(apiKey, id, 'shipProperties')
            dispatch(set_shipProperties(charac))
            redirect(`/contracts/${id}/ship-properties`)} }>
      
      <CardsContain>
        {items}
      </CardsContain>
            
      </Card>
    )
}




export default ContractCard
export {transformPriceFormat, flaterDate}