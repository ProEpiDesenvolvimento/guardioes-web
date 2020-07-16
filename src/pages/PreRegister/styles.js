import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
`;

export const Body = styled.div`
    height: 92vh;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;
    flex-direction: column;
`;

export const BackIcon = styled.img`
    width: 3vw;
    height: 4vh;
    margin: 10px 0px 0px 10px;
`;

export const BackLink = styled(Link)`
    width: 3vw;
    height: 4vh;
    margin: 10px 0px 0px 10px;
`;

export const Title = styled.p`
    margin: 3vh auto;
    display: inline;
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    line-height: 48px;
    color: #000000;
    @media(max-width: 625px) {
        width: 100vw;
        height: 100vh;
        left: 0;
        margin: 5vh auto;
        text-align: center;
        font-size: 30px;
    }
`;

export const ManDiv = styled.div`
    position: absolute;
    width: 500px;
    height: 50vh;
    left: 20px;
    top: 200px;
    @media(max-width: 920px) {
        display: none;
    }
`;

export const ManImage = styled.img`
    width: 35vw;
    height: 45vh;
`;

export const RegisterDiv = styled.form`
    position: absolute;
    right: 5vw;
    top: 28vh;
    width: max(54vw, 532px);
    height: 60vh;
    display: inline-block;
    @media(max-width: 920px) {
        width: 100vw;
        height: 60vh;
        margin: 0 auto;
        padding: 10px;
        left: 0;
    }
    @media(max-width: 625px) {
        margin-top: 30px;
    }
    @media(max-width: 480px) {
        height: 500px;
    }
`;

export const FieldDiv = styled.div`
    float: left;
    width: max(225px, 25vw);
    height: 12vh;
    margin-left: 20px;
`;
    
export const FieldName = styled.label`
    float: left;
    margin: 10px 0px 5px 10px;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 24px;
    color: #000000;
`;
    
export const Input = styled.input`
    display: block;
    height: 5vh;
    width: max(225px, 25vw);
    background: #FFFFFF;
    mix-blend-mode: normal;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    margin-top: 2px;
`;

export const LargerInput = styled.textarea`
    display: block;
    height: 12vh;
    width: max(250px, 27vw);
    background: #FFFFFF;
    mix-blend-mode: normal;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px;
    margin-top: 2px;
    resize: none;
`;

export const ButtonsDiv = styled.div`
    width: max(210px, 20vw);
    height: 7vh;
    border: none;
    padding: 0;
`;

export const QuestionVector = styled.img`
    width: 10px;
    height: 10px;
    margin-left: 5px;
    cursor: pointer;
    fill: blue;
`;

export const DownloadBtn = styled.a`
    width: 100px;
    height: 30px;
    float: left;
    background: #FFFFFF;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;
    cursor: pointer;
    padding: 0;
    text-decoration: none;
`;

export const UploadBtn = styled.button`
    width: 100px;
    height: 30px;
    float: right;
    background: #FFFFFF;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 5px;
    padding: 0;
    margin: 0;
`;

export const ButtonName = styled.p`
    margin: 5px;
    text-align: center;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    color: #000000
`;

export const SendButton = styled.button`
    display: inline-block;
    position: relative;
    background: #5DD39E;
    width: 150px;
    height: 40px;
    margin: 8vh 0 0 15vh;
    border-radius: 15px;
    border: 1px;
    text-decoration: none;
    cursor: pointer;
`;
    
export const SendButtonName = styled.p`
    text-align: center;
    margin: 9px;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 24px;
    color: #FFFFFF;
`;

export const QuestionPopup = styled(Popup)`
    width: 300px;
    height: 60px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid gray;
    background: #FFFFFF;
    margin-bottom: 7px;
    box-shadow: 1px 1px 1px gray;
`;
