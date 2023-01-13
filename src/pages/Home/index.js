import React, { useState, useEffect } from 'react';
import { sessionService } from 'redux-react-session';
import { useHistory } from "react-router-dom";
import {
  Container,
  Body,
  TitleDiv,
  Title,
  Subtitle
} from './styles';

import {
  setToken,
  setUser
} from 'actions/';

import Header from 'sharedComponents/Header'
import Form from './Form'
import Thanks from './Thanks'

const Home = (token) => {
  const [redirect, setRedirect] = useState(false)

  const setRedirectCallback = (redirect) => {
    setRedirect(redirect)
  }

  const history = useHistory()

  useEffect(() => {
    const _loadSession = async () => {
      try {
        const auxSession = await sessionService.loadSession()
        const auxUser = await sessionService.loadUser()
        setToken(auxSession.token)
        setUser(auxUser)
        history.push("/panel")
      } catch (e) {}
    }
    _loadSession();
  }, [setToken, setUser, token, history]);

  return (
    <>
      {redirect ?
        <Thanks />
        :
        <Container>
          <Header />
          <Body>
            <TitleDiv>
              <Title>Retorne às atividades com segurança</Title>
              <Subtitle>Use o Guardiões da Saúde para monitorar o estado de saúde dos integrantes da sua instituição</Subtitle>
            </TitleDiv>
            <Form setRedirectCallback={setRedirectCallback} />
          </Body>
        </Container>
      }
    </>
  );
}

export default Home;