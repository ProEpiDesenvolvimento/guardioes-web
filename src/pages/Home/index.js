import React from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'
import Apps from './components/Apps';
import Symptoms from './components/Symptoms';

const Home = () => {
  return (
    <Container>
      <Header />
      <Body>
        <NavBar />
        {/* <Apps /> */}
        <Symptoms />
      </Body>
    </Container>
  );
}

export default Home;