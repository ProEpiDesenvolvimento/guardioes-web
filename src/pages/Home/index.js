import React from 'react';
import { 
  Container,
  Body
 } from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'

const Home = () => {
  return (
    <Container>
      <Header />
      <Body>
        <NavBar />
      </Body>
    </Container>
  );
}

export default Home;