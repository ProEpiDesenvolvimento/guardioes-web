import React, { useState, useEffect } from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'

import Apps from './components/Apps';
import Symptoms from './components/Symptoms';
import Managers from './components/Managers';
import Contents from './components/Contents';

const Home = () => {

  const [component, setComponent] = useState({})
  const [components, setComponents] = useState([])

  const loadComponents = () => {
    setComponents([
      {
        key: "admins",
        value: "Admins"
      },
      {
        key: "configApps",
        value: Apps
      },
      {
        key: "managers",
        value: Managers
      },
      {
        key: "managers_group",
        value: "GerentesDeInstituições"
      },
      {
        key: "symptoms",
        value: Symptoms
      },
      {
        key: "syndromes",
        value: "Síndromes"
      },
      {
        key: "contents",
        value: Contents
      },
      {
        key: "users",
        value: "Usuários"
      },
      {
        key: "dashboard",
        value: "Visualizações"
      }
    ])
    setComponent({
      key: "admins",
      value: "Admins"
    })
  }

  useEffect(() => {
    loadComponents();
  }, [])

  const setComponentCallback = (component) => {
    setComponent({ key: component.key, value: component.value });
    console.log(component)
  }

  return (
    <Container>
      <Header />
      <Body>
        <NavBar setComponentCallback={setComponentCallback} />
        {components.map((comp) => {
          if (comp.key === component.key) {
            return <comp.value />
          }
        })}
      </Body>
    </Container>
  );
}

export default Home;