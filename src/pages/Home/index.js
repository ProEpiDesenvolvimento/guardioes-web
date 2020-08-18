import React, { useState } from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'

const Home = () => {

  const [component, setComponent] = useState({ key: "", value: "" })

  const setComponentCallback = (component) => {
    setComponent(component);
  }

  return (
    <Container>
      <Header />
      <Body>
        <NavBar setComponentCallback={setComponentCallback} />
      </Body>
    </Container>
  );
}

export default Home;