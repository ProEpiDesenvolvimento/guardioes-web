import React from 'react'
import Lottie from 'lottie-react-web'

import {
  Container,
  Body,
  AnimationDiv,
  Title,
  Subtitle,
  HomeButton
} from './styles';

import Header from 'sharedComponents/Header'
import checkAnimation from './assets/checkAnimation.json'

const Thanks = () => {

  return (
    <Container>
      <Header />
      <Body>
        <AnimationDiv>
          <Lottie
            options={{
              animationData: checkAnimation,
              loop: false
            }}
            autoplay={false}
          />
        </AnimationDiv>
        <Title>
          Obrigado por se inscrever!
            </Title>
        <Subtitle>
          Iremos enviar a confirmação de cadastro no e-mail em breve. Fique Atento!
            </Subtitle>
        <HomeButton to='/'>
          Voltar à Home
            </HomeButton>
      </Body>
    </Container>
  );
}

export default Thanks;