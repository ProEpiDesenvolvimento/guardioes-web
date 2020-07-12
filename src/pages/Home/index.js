import React from 'react';
import { 
  Container, 
  Body, 
  Title, 
  SubTitle, 
  PreSignUpBtn, 
  PreSignUpTxt, 
  MapImage,
  MapDiv
} from './styles';
import Header from 'sharedComponents/Header'
import map from './assets/map_asset.svg'
const Home = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Title>
          Retorne às atividades <br/> com segurança
        </Title>
        <SubTitle>
          Use o Guardiões da Saúde para monitorar o <br/> estado de saúde dos integrantes da sua <br/> instituição
        </SubTitle>
        <PreSignUpBtn>
          <PreSignUpTxt>
            Realizar Pré-cadastro
          </PreSignUpTxt>
        </PreSignUpBtn>
        <MapDiv>
          <MapImage src={map}/>
        </MapDiv>
      </Body>
    </Container>
  );
}

export default Home;