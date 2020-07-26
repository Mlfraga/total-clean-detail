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

.list{
margin-top: 25px;
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
}

.service-box{
display: flex;
flex-direction: column;
max-width: 32%;
width: 35%;
margin-bottom: 30px;
max-height: 212px;
background-color: #383838;
border-radius: 8px;
background: #383838;
border: 2px solid #626262;
box-sizing: border-box;
border-radius: 10px;

.name {
display: flex;
justify-content: center;
margin-left: 30px;
margin-top: 25px;
font: 22px 'Roboto', sans-serif;
font-weight: bold;
color: #EEEEEE;
}

.price-container{
color: #E0E0E0;
margin-left: 30px;
margin-top: 55px;
display: flex;
font-size: 20px;
#price{
margin-left: 50px;
font-weight: bold;
}
}

.input-container {
margin-left: 22px;
margin-bottom: 25px;
    span{
    font-weight: bold;
    font-size: 25px
    }
.input{
margin-left: 15px;
width: 80%;
height: 38px;
}
}
}

.buttons{
width: 100%;
display: flex;
justify-content: flex-end;
margin-bottom: 50px;
button{
    margin-left: 15px;
}
}

.service-box-empty{
  display: flex;
flex-direction: column;
max-width: 32%;
width: 35%;
margin-bottom: 30px;
max-height: 212px;
background-color: #383838;
border-radius: 8px;
background: #383838;
border: 2px solid #D32F2F;
box-sizing: border-box;
border-radius: 10px;

.name {
display: flex;
justify-content: center;
margin-left: 30px;
margin-top: 25px;
font: 22px 'Roboto', sans-serif;
font-weight: bold;
color: #EEEEEE;
}

.price-container{
color: #E0E0E0;
margin-left: 30px;
margin-top: 55px;
display: flex;
font-size: 20px;
#price{
margin-left: 50px;
font-weight: bold;
}
}

.input-container {
margin-left: 22px;
margin-bottom: 25px;
    span{
    font-weight: bold;
    font-size: 25px
    }
.input{
margin-left: 15px;
width: 80%;
height: 38px;
}
}
}

#errorMessage{
color: #ff6659;
font: 20px 'Roboto', sans-serif;
font-weight: bold;
margin-top: 40px;
}

`;

export default Container;
