import styled from 'styled-components';
import { device } from 'utils/devices';
import { Link } from "react-router-dom";

export const Container = styled.div`
`;

export const Body = styled.div`
    height: 92vh;
    background: rgb(255,255,255);
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    display: flex;
    flex-direction: column
`;

export const Title = styled.p`
    margin: 5vh auto;

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

export const RegisterDiv = styled.div`
    position: absolute;
    right: 5vw;
    top: 28vh;
    width: 54vw;
    height: 60vh;
    // background-color: red;
    // color: white;
`;

export const FieldDiv = styled.div`
    float: left;
    width: 27vw;
    height: 12vh;
    // background-color: green;
`;
    
export const FieldName = styled.label`
    float: left;
    margin: 10px 0px 5px 10px;
    font-family: Argentum Sans;
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

export const LargerInput = styled.input`
    display: block;
    height: 12vh;
    width: 28vw;
    background: #FFFFFF;
    mix-blend-mode: normal;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    margin-top: 2px;
`;

export const ButtonsDiv = styled.button`
    width: 22vw;
    height: 7vh;
    border: none;
    background: transparent;
    padding: 0;
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
`;

export const UploadBtn = styled.button`
    width: 9vw;
    height: 5vh;
    float: right;
    background: #FFFFFF;
    border: 1px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;
`;

export const ButtonName = styled.p`
    margin: 0;
    text-align: center;
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    color: #000000
`;

export const SendButton = styled(Link)`
    background: #5DD39E;
    box-shadow: 0px 0px 40px rgba(93, 211, 158, 0.3);
    border-radius: 20px;
`;

