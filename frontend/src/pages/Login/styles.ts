import styled from 'styled-components';

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
#login-page{
display: flex;
width: 100%;
margin: 0;
padding: 0;
border: 0;
}
.form{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

height: 100vh;
min-width: 440px;
background: #303030;
}
.form .inputs{
display: flex;
flex-direction: column;
}

.form .logo{
max-width: 400px;
display: flex;
align-items: center;
justify-content: center;
padding-bottom: 16px;
padding-right: 27px;
    h1{  
    font: 42px 'Ubuntu', sans-serif;
    position: absolute;        
    color: #ff6659; 
    }

    img{
    height: 58px;
    width: 58px;
    margin-left: 232px;
    padding-bottom: 13.4px;
    }
}

.inputs{
    span{
        color: #ff6659;
        margin-left: 100px;
    }
    padding-right: 9px;
} input{
width: 272px;
height: 35px;
}

.wallpaper {
width: 100%;
    img {
    opacity: 25%;
    width: 100%;
    height: 100%;
    }
}
`;

export default Container;