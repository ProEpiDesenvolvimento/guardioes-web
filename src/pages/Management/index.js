import React from 'react';

import { Container } from './styles';

import Header from 'sharedComponents/Header';
import Sidebar from 'sharedComponents/Sidebar';

const Management = () => {
  return (
    <Container>
      <Header />
      <Sidebar />
    </Container>
  );
}

export default Management;