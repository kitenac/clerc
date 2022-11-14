import styled from 'styled-components';

export const theme = {
  colors: {
    black: '#000',
    white: '#fff',
  },

  backgrounds: {
    blue: '#0f75bf',
    hardBlue: '#37516D'
  },

  complexFonts:{
    AnotFont: styled.span`
    font-family: 'Gotham Pro';
    font-style: normal;
    font-weight: 550;
    font-size: 14px;
    line-height: 125%;
    width: 100%;
    text-align: left;

    color: #37516d;
    `,
    
    ModalTitle:styled.span`
    width: 155px;
    height: 23px;
    
    font-family: 'Gotham Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 125%;
    `
    
    
  }
};
