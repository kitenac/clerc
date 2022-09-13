// each cart is button itself and has 2 buttons inside: coppy and properties !!!
// CSS - from figma


import React from 'react'
import styled from 'styled-components'


const AnotFont = styled.div`
  font-family: cursive;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 125%;

  color: #579BE3;
`


const Item = styled.div`
  font-family: 'Gotham Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;

  margin-left: 0.5rem;

  color: #333333;   
`

const Card = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  row-gap: 8px;

  box-sizing: border-box;
  margin-top: 0.5rem;
  flex-wrap: wrap;

  width: 97vw;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Pair = styled.div`
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  margin-top: 0.7rem;
  margin-bottom:0.5rem;
`


// ex: 2018-12-28 00:00:00.000000 ---> 28.12.18
const transformDateFormat = (date) =>{
  const parts = date.slice(0, 10).split('-')              // remove exact time from date(actualy zeroes), parse date into parts by '-' symbol 
  return `${parts[2]}.${parts[1]}.${parts[0].slice(2)}г.` 
}



const ContractCard = (props) => {

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

    const Date = transformDateFormat(date.date)
    const Deadline = transformDateFormat(deadline.date)


    const contracts = [['Наименование', name],    
                       ['Номер гос. контракта', number],
                       ['Дата подписания контракта', Date],
                       ['Окончание выполнения работ', Deadline],
                       ['Цена контракта',  price],
                       ['Наименование программы', program_name],
                       ['Контрагент', counterpart],
                       ['Примечание', note]
                      ]
    


    const items = Object.values(contracts).map((contract) => {
                  const [anot, item] = contract 
                  return <Pair>
                            <AnotFont> {anot}: </AnotFont>
                            <Item> {item ? item : ' - '} </Item>
                          </Pair> 
    })
  
    const Head = items[0]
    const Body = items.slice(1,)

    return (
      <Card key={id} onClick={(id) => onCardSelected(id)}>
        {items}    
      </Card>
    )
  }




export default ContractCard