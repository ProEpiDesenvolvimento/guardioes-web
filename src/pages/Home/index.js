import React, { useState, useEffect } from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'

import Apps from './components/Apps';
import Symptoms from './components/Symptoms';
import GroupManagers from './components/GroupManagers';
import Contents from './components/Contents';
import Syndromes from './components/Syndromes';
import { connect } from 'react-redux';
import {
  setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';

const Home = ({
  token,
  setToken,
}) => {

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
  }, []);

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
        value: "Gerentes"
      },
      {
        key: "managersGroup",
        value: GroupManagers
      },
      {
        key: "symptoms",
        value: Symptoms
      },
      {
        key: "syndromes",
        value: Syndromes
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

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);