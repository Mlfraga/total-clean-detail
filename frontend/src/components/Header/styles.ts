import styled from 'styled-components';

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

display: flex;
align-items: center;

position: absolute;
width: 1920px;
height: 80px;
background: #383838;

h1{
padding: 0 55px;
font: 30px 'Ubuntu', sans-serif;
color: #ff6659;
position: absolute;
}

img{
height: 36px;
width: 36px;
padding-bottom: 12px;
padding-left: 201px;
}

div{
    display: flex;
    flex-direction: "column";
    align-items: center;
}

`;

export default Container;