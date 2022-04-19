import React from 'react';

import {
  Container,
} from "./styles";
import Header from "sharedComponents/Header";

const Statistics = () => {
  return (
    <Container>
        <Header />
        <iframe
            title="Dados gerais"
            src="https://metabase.gds.proepi.org.br/public/dashboard/6498e168-0cac-4bad-876f-c69365b1ade4"
            frameBorder="0"
            height="90%"
            width="100%"
        >
        </iframe>
    </Container>
  );
}

export default Statistics;