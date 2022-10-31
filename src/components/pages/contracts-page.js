import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ContractCard from '../contractCard'
import Header from '../head'
import { getContractsInfo, AddContract } from '../../services/request-utils'

import { ColumnContainer, RowContainer } from '../pages/login-page'



const ButtonAdd = styled.button`
  width: 233px;
  height: 34px;

  background: ${({ theme }) => theme.backgrounds.hardBlue};
  border-radius: 4px;
  border: 0;
  color: ${({ theme }) => theme.colors.white};
`

const ContractsPage = () => {

    const state = useSelector((state) => state.app_reducer)
    const {contractsPageData, sessionData} = state
    const {apiToken} = sessionData
  
    const redirect = useNavigate()

    // if (!sessionData.isLoginned) return <Navigate to="/login" /> 

    //const contractsPageData = useSelector((state) => state.app_reducer.contractsPageData)
    const Contracts = contractsPageData.map( (contract) => {
                      return  <ContractCard 
                                  key={contract.id}
                                  info={contract}/> })


    return<div>
            <Header/>
            <ColumnContainer style={{paddingInlineStart: '5px', gap: '5px', textAlign: 'start', flexWrap: 'nowrap'}}>
              {Contracts}

      
              <ButtonAdd
                 onClick={async function (event){
                   //event.preventDefault()
                   await AddContract(apiToken)}  
              }>

                Добавить новый контракт
              </ButtonAdd>
            </ColumnContainer>
          </div>
}

export default ContractsPage