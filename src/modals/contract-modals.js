import { AddContract } from "../services"
import { ColumnContainer, RowContainer } from '../components/pages/login-page'

import styled from 'styled-components';

const AnotFont = styled.span`
  font-family: 'Gotham Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 13px;
  
  color: #333333;
`


const Frame = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;

  width:  ${(props) => props.height};
  height: ${(props) => props.height};
  border-radius: 10px;
  border: 0;

  color: white;
`

const InputBox = styled(RowContainer)`
  gap: 20px;
  width:  ${(props) => props.width};
  height: ${(props) => props.height};

  border-radius: 4px;
  border: 0;
`;


const Input = styled.input`
  width: 658px;
  height: 40px;
  color: black;
  font-family: Gotham Pro;

  placeholder: ${(props) => props.placeholder};
  pattern: ${(props) => props.pattern};

  outline: 0;
  border: 0;
  background: transparent;
`;

const InputField = (props) => {
    const {placeholder, action, dispatch } = props;
  
    return (
      <InputBox width={200} height={40}>
        <Input
          placeholder={placeholder}
          /*
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(ev) => {
            ev.preventDefault();
            dispatch(action(ev.target.value));
          }}*/
        />
      </InputBox>
    );
};

const createElement = (pole, elWidth='100%') => {
    let anot, placeholder
    console.log(`got pole: ${pole}`)
    if (pole) [anot, placeholder] = pole
    return <div style={{width: elWidth}}>
              <AnotFont> { (!anot) ?  '' : anot }: </AnotFont>
              <InputField placeholder = { (!placeholder) ?  '' : placeholder }  />
            </div>
  }
  

export const ModalCard = (name, Fields) => {
    return <Frame width = {200} height={200}>
           <AnotFont> { (!name) ?  '' : name }: </AnotFont>
             <form>
                <ColumnContainer>
                    {Fields}
                </ColumnContainer>
             </form>
           </Frame>
}



export const Modal_add_contract = () => {

    const fields = [
        ['Наименование', ''], 
        ['Номер гос. контракта', 'Укажите номер гос. контракта']]
    
    return ModalCard('Новый контракт', fields.map((el)=>createElement(el)))

/*
    "name": "Новый контракт",
    "counterpart": "Дубликат контракта",
    "number": "КИ-777-2077",
    "price": "1000000.00",
    "note": "Новая заметка",
    "deadline": "2021-12-12",
    "date": "2021-11-12",

    "program_name": "Название программы"
*/

}

export const Modal_modify_contract = () => {
    
}

export const Modal_del_contract = () => {
    
}