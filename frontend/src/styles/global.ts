import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

* {
margin: 0;
padding: 0;
outline: 0;
box-sizing: border-box;
}

html, body, #root{
height: 100%;
}

body {
font: 14px 'Roboto', sans-serif;
background: #434343;
color: #EEE;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
}

ul{
list-style: none;
}

.input{
margin-top: 16px;
margin-bottom: 8px;
background: #424242;
border: 0.25px solid #787878;
border-radius: 8px;
font-size: 18px;
padding:  16px 14px;
color: #cccccc;
display: inline-block;
}

 `

export default GlobalStyle;