import React from 'react';
import { Container, Body, Title, SubTitle } from './styles';
import Header from 'sharedComponents/Header'
const Home = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Title>
          Retorne às atividades <br/> com segurança
        </Title>
        <SubTitle>
          Use o Guardiões da Saúde para monitorar o <br/> estado de saúde dos integrantes da sua <br/> instituição
        </SubTitle>
      </Body>
    </Container>
  );
}

export default Home;