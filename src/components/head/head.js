import styled from "styled-components"

const Line = styled.div`
    top: 50px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`

const Title = styled.text`
    font-size: 25px;
    font-weight: bolder;
    font-family: Arial, sans-serif;
    color: #333333;
`


const Header = () =>{
    return <div>
            <Title> clerc </Title>
            <Line/>
           </div>
}


export default Header