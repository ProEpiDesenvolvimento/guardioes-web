import styled from 'styled-components';
import { device } from 'utils/devices';

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
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 5rem;
    line-height: 5rem;
    color: #282828;
    margin: 5% 5% 2%;

    @media ${device.laptopL}{
        font-size: 3rem;
        line-height: 3rem;
    }

`;

export const SubTitle = styled.p`
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5625rem;
    line-height: 1.625rem;
    color: #524948;
    margin: 0% 5%;
`;

export const PreSignUpBtn = styled.div`
    display: flex;
    width: 30.9375rem;
    height: 5.5rem;

    background: #5DD39E;
    box-shadow: 0px 0px 40px rgba(93, 211, 158, 0.3);
    border-radius: 25px;
    margin-top: 10%;
    margin-left: 12%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    justify-self: flex-end;

    @media ${device.laptopL}{
        margin-top: 20%;
        height: 4.5rem;
    }
`;

export const PreSignUpTxt = styled.p`
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.3125rem;
    color: #FFFFFF;

    @media ${device.laptopL}{
        font-size: 1.5rem;
        line-height: 2rem;
    }
`;

export const MapDiv = styled.div`
    display: flex;
    align-self: flex-end;
    position: absolute;
    top: 10rem;
    right: 0rem;
`;

export const MapImage = styled.img`
  width: 50vw;
  height: 80vh;

  @media ${device.mobileL} {
    width: 50vw;
    height: 5vh;
  };
`;