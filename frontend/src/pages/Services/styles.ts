import styled from 'styled-components';

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

height: 100%;

.body{
max-width: 1200px;
margin-left: auto;
margin-right: auto;
height: 100%;
flex-wrap: wrap;
}

.content{
margin-top: 25px;
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
}

.images{
width:300px;
height: 170.21px;
border-radius: 8px;
margin-bottom: 6px;
}

.service-box{
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
max-width: 385px;
width: 100%; 
margin-bottom: 30px;
min-height: 230px;
background-color: #383838;
border-radius: 8px;
background: #383838;
border: 2px solid #626262;
box-sizing: border-box;
border-radius: 10px;

#text{
font: 15px 'Roboto', sans-serif;
color: #ccc;
}
}

`;

export default Container;