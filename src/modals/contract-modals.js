
import { ColumnContainer, RowContainer } from '../components/pages/login-page'
import { close, calendar } from "../images";
import { useSelector, useDispatch } from 'react-redux';
import { AddContract } from "../services";
import { m_push_buffer, m_vipe_buffer } from "../slices"

import styled from 'styled-components';


const Astra = () => <div style={{color: '#8B0000',fontSize: '10px'}}> {'*'} </div>

const Secondary = styled.button`
 width:  100px;
 height: 40px;
 box-sizing:border-box;
 border: 1px solid #37516D;
 background: white;
 border-radius: 6px;

 :hover {
  cursor: pointer;
 }
`

const Primary = styled(Secondary)`
 border: 0px;
 background: #37516D;

 :hover {
    background: #223244;
    cursor: pointer;
  }
`


const Buttons = (list, onSubmit) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.app_reducer.modalBuffer)
  const apiKey = useSelector((state) => state.app_reducer.sessionData.apiToken)
  
  return <RowContainer style={{justifyContent: 'end', width: '100%', gap: '1.5%'}}>
          <Secondary> {list[0]} </Secondary>
          <Primary onClick={async function (e) { 
             e.preventDefault()
             await onSubmit(apiKey, data) 
             dispatch(m_vipe_buffer())          // !!! clearing buffer for next use
             }}>
           {list[1]} 
          </Primary>
  </RowContainer>
}

const Dates = (dates) => {
  return <RowContainer style={{justifyContent: 'space-between', width: '100%', gap: '6%'}}> 
            {dates.map((el) => CreateElement(el, {type: 'date', pic: calendar}))} 
         </RowContainer>
}



const AnotFont = styled.span`
  font-family: 'Gotham Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 13px;
  
  color: #333333;
`

const ModalTitle = styled(AnotFont)`
  color: #37516D;
  font-size: 18px;
  line-height: 125%;
`


const Frame = styled.div`
  display: flex;  
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  
  width:  ${(props) => props.width}%;
  gap: 22px;

  border-radius: 10px;
  border: 0;
  background: grey;
`


const InputBox = styled(RowContainer)`
  width:  100%;
  height: 40px;
  
  box-sizing:border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`


const Input = styled.input`
  width:  100%;
  height: 40px;
  padding: 10px;
  border: 0;
  outline: 0;

  type: ${(props) => props.type};
  pattern: ${(props) => props.pattern};
  placeholder: ${(props) => props.placeholder};

  font-family: Gotham Pro;
  background: transparent;
`;

const Mark = styled.textarea`
  width:  100%;
  height: 100px;
  padding: 10px;

  box-sizing:border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  outline: 0;
  
  font-family: Gotham Pro;
  background: transparent;

  placeholder: ${(props) => props.placeholder};
`

const InputField = (props) => {
    const {placeholder, pic, type, onChange, action, dispatch } = props;
  
    return (
        <InputBox style={{padding: pic ? '10px': '0'}}>
          <img src={pic} />
          <Input 
            placeholder={placeholder}
            onFocusCapture={(e)=>{e.target.type = type}}
            onChange={(e) => onChange(e)}
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

const defaultOptions = {
  necessary:true, 
  InputTag:InputField, 
  type: 'text'
}

const CreateElement = (pole, optional=defaultOptions) => {
  const dispatch = useDispatch()
  
  const [anot, placeholder, json_name] = pole

  let { necessary = defaultOptions.necessary, 
        InputTag  = defaultOptions.InputTag, 
        type      = defaultOptions.type,
        pic } = optional
    

  return <ColumnContainer style={{rowGap: '5px', alignItems: 'flex-start', width: '100%'}}>
              <RowContainer>
                <AnotFont> { (!anot) ?  '' : anot} </AnotFont> 
                {necessary ? <Astra/> : '' }
              </RowContainer>
                
             <InputTag placeholder = { (!placeholder) ?  '' : placeholder }
               type={type} pic={pic}
               onChange={(ev) => {
                ev.preventDefault();
                console.log(`finaly some input, ev is`, ev)
                dispatch(m_push_buffer({[json_name]: ev.target.value}));
              }} /> 
                
         </ColumnContainer>
}
  
      


export const ModalCard = (name, Fields, buttons, onSubmit) => {

  return <Frame width={35}>
            <RowContainer style={{justifyContent: 'space-between', width: '100%'}}>
              <div> <ModalTitle> { (!name) ?  '' : name } </ModalTitle> </div>
              <img src={close}/>
            </RowContainer>
            {Fields}
            {Buttons(buttons, onSubmit)}
           </Frame>    
}



const Modal_contract = (Title, request_method) => {

  // [annotation, placeholder, name in JSON]
  const fields = [
      ['Наименование', 'Введите наименование контракта', "name"], 
      ['Номер гос. контракта', 'Укажите номер гос. контракта', "number"],
      ['Генподрядчик', 'Напишите наименование генподрядчика', "counterpart"],
      ['Цена контракта (руб.)', 'Укажите цену контракта в рублях', "price"],
      ['Наименование программы', 'Напишите наименование программы', "program_name"]]

  const dates = [['Дата подписания контракта', 'Дата', "date"], 
                 ['Окончание выполнения работ', 'Дата', "deadline"]]
  const buttons = ['Закрыть', 'Создать']

  let Fields = fields.map((el)=>{return el[0] !== 'Цена контракта (руб.)' ? 
                          CreateElement(el) : CreateElement(el, {type: 'number'})})

  Fields.push(Dates(dates))
  Fields.push(CreateElement(['Примечание', 'Примечание', "note"], {InputTag: Mark, necessary: false}))

  return ModalCard(Title, Fields, buttons, request_method)
}

export const Modal_add_contract = () => Modal_contract('Новый контракт', AddContract)
export const Modal_modify_contract = () => Modal_contract('Редактировать контракт')


export const Modal_del_contract = () => {
    
}