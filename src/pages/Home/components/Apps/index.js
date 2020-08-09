import React, { useEffect, useState } from 'react';
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

  const [nameUpdated, setNameUpdated] = useState("")
  const [ownerCountryUpdated, setOwnerCountryUpdated] = useState("")

  const handleNameUpdated = (value) => {
    setNameUpdated(value);
  }

  const handleOwnerCountryUpdated = (value) => {
    setOwnerCountryUpdated(value)
  }

  const _getApps = async (token) => {
    const response = await getAllApps("Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NjkzOTM3NywiZXhwIjoxNTk5NTY5MTIzLCJqdGkiOiIwOGZiZmY4MC00YzQwLTRkYTItYjgwYS05ZGU2NGExYmI0NWMifQ.LTvhh8xoNzrKl5PAeEqM_-fpRuXInHWMLQu38xXXQDY")
    setApps(response.apps)
  }

  useEffect(() => {
    _getApps(token)
  }, []);

  const fields = ["ID", "Nome", "País"];
  const contents = [["1", "App 1", "País 1"], ["2", "App 2", "País 2"], ["3", "App 3", "País 3"]];

  return (
    <Container>
      <ContentBox title="Apps" contents={apps} fields={fields} />

      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar App</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <form id="addApp">
            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input 
                type="text" 
                id="name"
                value={nameUpdated}
                onChange={(e) => handleNameUpdated(e.target.value)}
                />
            </InputBlock>

            <InputBlock>
              <label htmlFor="country">País</label>
              <input 
                type="text"  
                id="country"
                value={ownerCountryUpdated} 
                onChange={(e)=> handleOwnerCountryUpdated(e.target.value)}/>
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