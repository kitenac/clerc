// src: https://en.bestfonts.pro/font/gotham-pro

import { createGlobalStyle } from 'styled-components'

import gothamPro from './GothamPro.woff'
import gothamProBold from './GothamPro-Bold.woff' 

// about importing fonts via styled components: https://dev.to/alaskaa/how-to-import-a-web-font-into-your-react-app-with-styled-components-4-1dni
const gothamRegular = createGlobalStyle`
    @font-face{
        font-family: 'GothamRegular';
        src: local('GothamRegular'), 
             url(${gothamPro}) format('woff');
        font-weight: 400;
    }
`

const gothamBold = createGlobalStyle`
    @font-face{
        font-family: 'GothamBold';
        src: local('GothamBold'), 
             url(${gothamProBold}) format('woff');
        font-weight: 400;
    }
`

export default{
    gothamRegular,
    gothamBold
}