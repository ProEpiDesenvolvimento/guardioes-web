import styled from 'styled-components';
import { Popup } from 'semantic-ui-react'

export const Span = styled.span`
  color: red;
  font-size: 8px;
`;

export const RegisterDiv = styled.form`
  position: absolute;
  right: 5vw;
  top: 20vh;
  width: max(51vw, 532px);
  height: 60vh;
  display: inline-block;
  @media(max-width: 921px) {
      right: 0;
      width: 100vw;
      height: 60vh;
      margin: 40vh auto;
      padding: 10px;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media(max-width: 450px) {
    justify-content: center;
}
`;

export const FieldDiv = styled.div`
    width: max(225px, 25vw);
    height: 13vh;
    cursor: text;
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
    width: max(350px, 26vw);
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
    text-decoration: none;
    margin: 9px;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 24px;
    color: #FFFFFF;
`;

export const QuestionPopupOrgType = styled(Popup)`
    width: 230px;
    height: 20px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid gray;
    background: #FFFFFF;
    margin-bottom: 7px;
    box-shadow: 1px 1px 1px gray;
`;

export const QuestionPopupCat = styled(Popup)`
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid gray;
    background: #FFFFFF;
    margin-bottom: 7px;
    box-shadow: 1px 1px 1px gray;
`;
