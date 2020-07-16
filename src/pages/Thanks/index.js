import React, { useState } from 'react';
import { 
  Container, 
  Body,
  PositiveBanner,
  Title,
  Subtitle,
  HomeButton
} from './styles';

import Header from 'sharedComponents/Header'
import positiveBanner from './assets/positiveBanner.svg'

const Thanks = () => {

  return (
    <Container>
        <Header />
        <Body>
            <PositiveBanner src={positiveBanner} />
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