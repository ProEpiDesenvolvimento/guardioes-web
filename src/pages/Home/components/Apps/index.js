import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setApps
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllApps from './services/getAllApps'
import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  InputBlock,
  Input,
} from './styles';
import ContentBox from '../ContentBox';

const Apps = ({
  token,
  user,
  apps,
  setApps
}) => {

  const _getApps = async (token) => {
    const response = await getAllApps(token)
  }

  useEffect(() => {
    _getApps(token)
  }, []);

  const fields = ["AppID", "Nome", "País"];
  const contents = [["1", "App 1", "País 1"], ["2", "App 2", "País 2"], ["3", "App 3", "País 3"]];

  return (
    <Container>
      <ContentBox title="Apps" contents={contents} fields={fields} />

      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar App</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <form id="addApp">
            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="country">País</label>
              <input type="text" id="country" />
            </InputBlock>

            <Input type="submit" value="Confirmar" className="shadow-sm" />
          </form>
        </ContainerForm>
      </AddAppContainer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  apps: state.user.apps
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setApps
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Apps);