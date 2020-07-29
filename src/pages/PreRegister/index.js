import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import {
  Container,
  Body,
  Title,
  Subtitle
} from './styles';

import Header from 'sharedComponents/Header'
import Form from './Form'

const PreRegister = () => {
  const [redirect, setRedirect] = useState(false)

  const setRedirectCallback = (redirect) => {
    setRedirect(redirect)
  }

  if (redirect)
    return <Redirect to='/thanks' />
  else {
    return (
      <Container>
        <Header />
        <Body>
          <Title>Retorne às atividades com segurança</Title>
          <Subtitle>Use o Guardiões da Saúde para monitorar o estado de saúde dos integrantes da sua instituição</Subtitle>
          <Form setRedirectCallback={setRedirectCallback} />
        </Body>
      </Container>
    );
  }
}

export default PreRegister;