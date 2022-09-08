import React from 'react'
import { connect } from 'react-redux'
import ContractCard from '../contractCard'

import Head from '../head/head'

const ContractsPage = ({contractsPageData}) => {

    const Contracts = contractsPageData.map( (contract) => {
                      return  <ContractCard 
                                  info={contract} 
                                  onCardSelected={ (id)=>{console.log('chosen contract with id:', id)} }/> })

    return <div>
             <Head/>
             {Contracts}
           </div> 
}


const mapStateToProps = (state) => ({contractsPageData : state.contractsPageData})

export default connect(mapStateToProps)(ContractsPage)