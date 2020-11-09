import React, { useState, useEffect } from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'
import Apps from './components/Apps';
import Groups from './components/Groups';
import Symptoms from './components/Symptoms';
import GroupManagers from './components/GroupManagers';
import Managers from './components/Managers';
import Dashboard from './components/Dashboard';
import Contents from './components/Contents';
import Syndromes from './components/Syndromes';
import { connect } from 'react-redux';
import {
  setToken,
  setUser
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import Users from './components/Users';
import { useHistory } from "react-router-dom";

const Home = ({
  token,
  setToken,
  user,
  setUser
}) => {

  const history = useHistory()
  const [logged, setLogged] = useState(0)

  useEffect(() => {
    const _loadSession = async () => {
      try {
        const auxSession = await sessionService.loadSession()
        const auxUser = await sessionService.loadUser()
        setToken(auxSession.token)
        setUser(auxUser)
      } catch (err) {
        history.push("/login")
      }
    }
    _loadSession();
  }, [setToken, setUser, token]);

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
        key: "managers",
        value: Managers
      },
      {
        key: "groups",
        value: Groups
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
        value: Users
      },
      {
        key: "dashboard",
        value: Dashboard
      }
    ])
    setComponent({
      key: "admins",
      value: "Admins"
    })
  }

  const setComponentCallback = (component) => {
    setComponent({ key: component.key, value: component.value });
  }

  useEffect(() => {	
    loadComponents();
  }, [history, token])

  return (
    <Container>
      <Header />
      <Body>
        <NavBar setComponentCallback={setComponentCallback} />
        {components.map((comp) => {
          if (comp.key === component.key) {
            return <comp.value key={comp.key} />
          }
        })}
      </Body>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setToken,
    setUser
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);