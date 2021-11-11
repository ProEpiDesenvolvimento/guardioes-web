import styled from 'styled-components';

export const Field = styled.input`
    width: max(250px, 30vw);
    height: 50px;
    margin: 15px auto;
    border: 2px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;

    text-decoration: none;
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
    text-align: center;
    outline: 0;
    cursor: text;

    &::placeholder {
        font-family: Argentum Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 25px;
        line-height: 40px;
        color: #000000;
        opacity: 0.5;
        text-align: center;
    }

    &:focus {
        &::-webkit-input-placeholder {
            color: white;
        }
        &:-moz-placeholder { /* Firefox 18- */
            color: white;  
        }
    
        &::-moz-placeholder {  /* Firefox 19+ */
            color: white;  
        }
    
        &:-ms-input-placeholder {  
            color: white;  
        }  
    }
`;