import styled from "styled-components"
import { Navigate, useNavigate } from 'react-router-dom'
import { ColumnContainer, RowContainer } from '../pages/login-page'
import { waveLine, waveBorder, xlsPic, loginPicNonTransperent, exit } from '../../images'


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

const BreadCrumbText = styled.text`
    font-family: 'Gotham Pro';
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


const BreadCrumbs = (props)=>{
    const Redirect = useNavigate()
    
    // name - middle cumb(has no redirect, just name)
    const {name, current} = props
    let Crumbs = []  
    if (name) Crumbs.append(['login', name, ''] )


    return <RowContainer>
            <img src={waveBorder} width={6} height={50} style={{marginRight: '1.5rem'}} />
            
            <BreadCrumbText
                onClick={() => { Redirect('/login') }}> 
                Контракты 
            </BreadCrumbText>


        </RowContainer>
}


const LeftSide = () =>{
    return <RowContainer style={{gap: '7rem'}}>
                <ColumnContainer style={{gap: '1px', paddingBottom: '1px', paddingInlineStart: '5px'}}>
                    <L_Title> 
                        clerc 
                    </L_Title>
                    <img src={waveLine} width={100} height={7}/>
                </ColumnContainer>
            
            <BreadCrumbs/>

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





const Header = () =>{
    return <ColumnContainer style={{gap: '1px'}}>
            
            <RowContainer style={{justifyContent: 'space-between'}}>
                <LeftSide/>
                <RightSide/>
            </RowContainer>

            <Line/>
           </ColumnContainer>
}


export default Header