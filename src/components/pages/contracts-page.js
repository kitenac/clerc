import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ContractCard from '../contractCard'
import Header from '../head'

const ContractsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  row-gap: 5px;

`


const ContractsPage = () => {

    const contractsPageData = useSelector((state) => state.app_reducer.contractsPageData)
    const Contracts = contractsPageData.map( (contract) => {
                      return  <ContractCard 
                                  key={contract.id}
                                  info={contract} 
                                  onCardSelected={ (id)=>{console.log('chosen contract with id:', id)} }/> })

    return <ContractsContainer>
             <Header/>
             {Contracts}
            </ContractsContainer>
}

export default ContractsPage