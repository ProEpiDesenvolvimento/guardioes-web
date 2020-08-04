import React from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'
import Apps from './components/Apps';

const Home = () => {
  return (
    <Container>
      <Header />
      <Body>
        <NavBar />
        <Apps />
      </Body>
    </Container>
  );
}

export default Home;