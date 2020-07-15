import styled from 'styled-components';
import { device } from 'utils/devices';
import { Link } from 'react-router-dom'

export const Container = styled.div`
`;

export const Body = styled.div`
    height: 92vh;
    background: rgb(255,255,255);
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;
    flex-direction: column
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
`;

export const ManDiv = styled.div`
position: absolute;
width: 500px;
height: 50vh;
left: 20px;
top: 200px;
`;

export const ManImage = styled.img`
width: 35vw;
height: 45vh;
@media ${device.mobileL} {
    width: 50vw;
    height: 5vh;
};
`;

export const RegisterDiv = styled.form`
    position: absolute;
    right: 5vw;
    top: 28vh;
    width: 54vw;
    height: 60vh;
`;

export const FieldDiv = styled.div`
    float: left;
    width: 27vw;
    height: 12vh;
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
    width: 22vw;
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
    width: 28vw;
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
    width: 22vw;
    height: 7vh;
    border: none;
    padding: 0;
`;

export const QuestionVector = styled.img`
    width: 1vw;
    height: 2vh;
    margin-left: 0.5vw;
    cursor: pointer;
`;

export const DownloadBtn = styled.button`
    width: 9vw;
    height: 5vh;
    float: left;
    background: #FFFFFF;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;
    margin-left: 0;
    cursor: pointer;
`;

export const UploadBtn = styled.button`
    width: 9vw;
    height: 5vh;
    float: right;
    background: #FFFFFF;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;
    cursor: pointer;
`;

export const ButtonName = styled.p`
    margin: 0;
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
