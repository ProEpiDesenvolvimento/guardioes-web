import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroupManagers, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllGroupManagers from './services/getAllGroupManagers'
import createGroupManager from './services/createGroupManager'
import deleteGroupManager from './services/deleteGroupManager'

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  CheckboxInputBlock,
  CheckboxInput,
  InputBlock,
  Input,
  SubmitButton,
  Label
} from './styles';
import { useForm } from "react-hook-form";

import ContentBox from '../ContentBox';

const GroupManagers = ({
  token,
  user,
  groupManagers,
  setGroupManagers,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [groupManagerName, setGroupManagerName] = useState("")
  const [groupManagerEmail, setGroupManagerEmail] = useState("")
  const [groupManagerTwitter, setGroupManagerTwitter] = useState("")
  const [groupManagerGroup, setGroupManagerGroup] = useState("")
  const [groupManagerIdentificationCode, setGroupManagerIdentificationCode] = useState(false)
  const [groupManagerLengthIdentificationCode, setGroupManagerLengthIdentificationCode] = useState(0)
  const [groupManagerPassword, setGroupManagerPassword] = useState("")

  const _createGroupManager = async () => {
    const data = {
      "group_manager": {
        "password": groupManagerPassword,
        "email": groupManagerEmail,
        "name": groupManagerName,
        "group_name": groupManagerGroup,
        "twitter": groupManagerTwitter,
        "app_id": 1,
        "require_id": groupManagerIdentificationCode,
        "id_code_length": groupManagerIdentificationCode ? groupManagerLengthIdentificationCode : undefined
      }
    }
    await createGroupManager(data, token)
    setGroupManagerName("")
    setGroupManagerPassword("")
    setGroupManagerEmail("")
    setGroupManagerGroup("")
    setGroupManagerIdentificationCode(false)
    setGroupManagerLengthIdentificationCode(0)
    setGroupManagerTwitter("")
    _getAllGroupManagers(token);
  }

  const _deleteGroupManager = async (id, token) => {
    await deleteGroupManager(id, token)
    _getAllGroupManagers(token)
  }

  const _getAllGroupManagers = async (token) => {
    const response = await getAllGroupManagers(token)
    loadGroupManagers(response)
  }

  const loadGroupManagers = async (response) => {
    let aux_group_managers = [];
    if (!response.group_managers) {
      response.group_managers = [];
    }
    response.group_managers.map(group_manager => {
      aux_group_managers.push({
        "id": group_manager.id,
        "name": group_manager.name,
        "email": group_manager.email,
        "group_name": group_manager.group_name
      })
    })
    console.log(groupManagers, aux_group_managers)
    await setGroupManagers(aux_group_managers)
    console.log(groupManagers)
  }

  useEffect(() => {
    _getAllGroupManagers(token)
    setToken(token)
  }, []);

  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "name",
      value: "Nome",
    },
    {
      key: "email",
      value: "Email",
    },
    {
      key: "group_name",
      value: "Grupo",
    }];

  return (
    <Container>
      <ContentBox
        title="Gerentes de Instituições"
        token={token}
        contents={groupManagers ? groupManagers : []}
        fields={fields}
        delete_function={_deleteGroupManager}
      />

      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar Gerente</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <Form id="addApp" onSubmit={handleSubmit(_createGroupManager)}>
            <Inputs>
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={groupManagerName}
                  onChange={(e) => setGroupManagerName(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="email">E-mail</label>
                <Input
                  type="email"
                  id="email"
                  value={groupManagerEmail}
                  onChange={(e) => setGroupManagerEmail(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="group">Grupo</label>
                <Input
                  type="text"
                  id="group"
                  value={groupManagerGroup}
                  onChange={(e) => setGroupManagerGroup(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="twitter">Twitter</label>
                <Input
                  type="text"
                  id="twitter"
                  value={groupManagerTwitter}
                  onChange={(e) => setGroupManagerTwitter(e.target.value)}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="password">Senha</label>
                <Input
                  type="password"
                  id="password"
                  value={groupManagerPassword}
                  onChange={(e) => setGroupManagerPassword(e.target.value)}
                />
              </InputBlock>
              <CheckboxInputBlock>
                <Label htmlFor="id_code">Código de Identificação</Label>
                <CheckboxInput
                  type="checkbox"
                  id="id_code"
                  value={groupManagerIdentificationCode}
                  onChange={(e) => setGroupManagerIdentificationCode(!groupManagerIdentificationCode)}
                />
              </CheckboxInputBlock>
              {groupManagerIdentificationCode ? <InputBlock>
                <label htmlFor="len_id_code">Quantidade de caracteres</label>
                <Input
                  type="text"
                  id="len_id_code"
                  value={groupManagerLengthIdentificationCode}
                  onChange={(e) => setGroupManagerLengthIdentificationCode(e.target.value)}
                />
              </InputBlock>
                : null}
            </Inputs>
            <SubmitButton type="submit">
              Adicionar
            </SubmitButton>
          </Form>
        </ContainerForm>
      </AddAppContainer>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  groupManagers: state.user.group_managers
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setGroupManagers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupManagers);