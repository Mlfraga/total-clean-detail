import styled from 'styled-components';

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

.header{
display: flex;
align-items: center;
height: 80px;
background: #383838;
width: 100%;
position: fixed;
}

.logo{
max-width: 400px;
display: flex;
align-items: center;
justify-content: center;
padding-left: 35px;
    h1{  
    font: 30px 'Ubuntu', sans-serif;
    position: absolute;        
    color: #ff6659; 
    }
    img{
    height: 46px;
    width: 46px;
    margin-left: 168px;
    padding-bottom: 11.4px;
    }
}

.buttonsContainer{
min-width: 100%;
padding-right: 350px;
height: 100%;
display: flex;
flex-direction: row-reverse;
align-items: center;
background: #383838;    
    
}

.buttons{
height: 100%;
display: flex;
flex-direction: row-reverse;
align-items: center;
}

.header-button {
font: 'Roboto';
display: flex;
align-items: center;
color: #eee;
margin-left: 25px;
font-size: 16px;
text-decoration: none;
font-weight: bold;
transition: opacity 0.2s;
}
.header-button:hover {
  opacity: 0.8;
}
.header-button-selected{
font: 'Roboto';
display: flex;
align-items: center;
color: #ff6659;
margin-left: 25px;
font-size: 16px;
text-decoration: none;
font-weight: bold;
transition: opacity 0.2s;
}
.header-button-selected:hover {
  opacity: 0.8;
}
`;

export default Container;