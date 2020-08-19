import React, { useEffect } from 'react';
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


  return (
    <Container>
      <Header />
      <Body>
        <NavBar />
        {/* <Apps /> */}
        {/* <Symptoms /> */}
        <Managers />
        {/* <Contents /> */}
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