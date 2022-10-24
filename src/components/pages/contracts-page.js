import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ContractCard from '../contractCard'
import Header from '../head'
import { getContractsInfo } from '../../services/request-utils'

import { ColumnContainer, RowContainer } from '../pages/login-page'



const ContractsPage = () => {

    const state = useSelector((state) => state.app_reducer)
    const {contractsPageData, sessionData} = state

  
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
            </ColumnContainer>
          </div>
}

export default ContractsPage