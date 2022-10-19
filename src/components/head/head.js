import styled from "styled-components"
import { Navigate, useNavigate } from 'react-router-dom'
import { ColumnContainer, RowContainer } from '../pages/login-page'
import { waveLine, waveBorder, xlsPic, loginPicNonTransperent, exit, rightArrow } from '../../images'


const Line = styled.div`
    display: absolute;
    box-sizing: border-box;
    width: 100vw;
    border: 1px solid rgba(0, 0, 0, 0.1);
`


const L_Title = styled.text`
    font-family: cursive;
    font-size: 25px;
    font-weight: bolder;
    color: #333333;
`

const BreadCrumbText = styled.div`
    font-family: GothamBold;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 125%;
    color: #579BE3;
`


const ButtonContainer = styled(RowContainer)`
    box-sizing: border-box;
    width: 120px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
`


const BreadCrumbs = ({breadCrumbs})=>{
    const Redirect = useNavigate()
    // contractName - middle cumb(has no redirect, just name)
    const arrow = <img src={rightArrow} width={11} height={11}/>

    let parts = ['Контракты']
    if (breadCrumbs) {
        const {contractName, detail} = breadCrumbs
        parts.push(arrow, contractName, arrow, detail)}

    return <RowContainer>
            <img src={waveBorder} width={6} height={50} style={{marginRight: '1.5rem'}} />
            
            <BreadCrumbText
                onClick={() => { Redirect('/contracts') }}> 
            
            <RowContainer style={{gap: '20px'}} >
                {parts}
            </RowContainer>
            
            
            </BreadCrumbText>


        </RowContainer>
}


const LeftSide = ({breadCrumbs}) =>{
    

    return <RowContainer style={{gap: '7rem'}}>
                <ColumnContainer style={{gap: '1px', paddingBottom: '1px', paddingInlineStart: '5px'}}>
                    <L_Title> 
                        clerc 
                    </L_Title>
                    <img src={waveLine} width={100} height={7}/>
                </ColumnContainer>
            
            <BreadCrumbs breadCrumbs={breadCrumbs} />

            </RowContainer>
}

const RightSide = () =>{
    return <RowContainer style={{gap: '0.25rem'}}>
            <ButtonContainer style={{marginRight: '1.5rem'}}>
                * buttons *
            </ButtonContainer>

            <img src={waveBorder} width={6} height={50} style={{marginRight: '1rem'}}/>
            <img src={xlsPic}/>
            <img src={loginPicNonTransperent}/>     
            <img src={exit}/>

           </RowContainer>
}





const Header = ({breadCrumbs}) =>{
    
    return <ColumnContainer style={{gap: '1px'}}>
            
            <RowContainer style={{justifyContent: 'space-between'}}>
                <LeftSide breadCrumbs={breadCrumbs}/>
                <RightSide/>
            </RowContainer>

            <Line/>
           </ColumnContainer>
}


export default Header