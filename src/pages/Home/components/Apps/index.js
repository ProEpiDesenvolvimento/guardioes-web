import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setApps, setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllApps from './services/getAllApps'
import createApp from './services/createApp'
import deleteApp from './services/deleteApp'
import editApp from './services/editApp';
import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  InputBlock,
  EditInput,
  SubmitButton
} from './styles';
import { useForm } from "react-hook-form";
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';

const Apps = ({
  token,
  user,
  apps,
  setApps,
  setToken
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [editingApp, setEditingApp] = useState({});
  const { handleSubmit } = useForm()
  const [appName, setAppName] = useState("")
  const [ownerCountry, setOwnerCountry] = useState("")
  const [editName, setEditName] = useState("");
  const [editCountry, setEditCountry] = useState("");

  const handleAppName = (value) => {
    setAppName(value);
  }

  const handleOwnerCountry = (value) => {
    setOwnerCountry(value)
  }

  const _createApp = async () => {
    const data = {
      "app_name": appName,
      "owner_country": ownerCountry
    }
    console.log(data)
    const reponse = await createApp(data, token)
    console.log(reponse)
    _getApps(token)
    setAppName("")
    setOwnerCountry("")
  }

  const _getApps = async (token) => {
    const response = await getAllApps(token)
    setApps(response.apps)
  }

  const _deleteApp = async (id, token) => {
    await deleteApp(id, token)
    _getApps(token)
  }

  const _editApp = async () => {
    const data = {
      "app_name": editName,
      "owner_country": editCountry
    }
    await editApp(editingApp.id, data, token);
    _getApps(token);
  }

  const handleEdit = (content) => {
    setEditingApp(content);
    setEditName(content.app_name);
    setEditCountry(content.owner_country);
    setModalShow(!modalShow);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditCountry = (value) => {
    setEditCountry(value);
  }

  useEffect(() => {
    _getApps(token)
    setToken(token)
    console.log(token)
  }, [token]);

  const fields = [
    { key: "id", value: "ID" },
    { key: "app_name", value: "Nome" },
    { key: "owner_country", value: "País" }
  ];

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar App
          </Modal.Title>
        </Modal.Header>
        <form id="editApp" onSubmit={handleSubmit(_editApp)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editName}
                onChange={(e) => handleEditName(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_country">País</label>
              <input
                type="text"
                id="edit_country"
                value={editCountry}
                onChange={(e) => handleEditCountry(e.target.value)}
              />
            </EditInput>
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Apps"
          token={token}
          contents={apps ? apps : []}
          fields={fields}
          delete_function={_deleteApp}
          handleEdit={handleEdit} />


      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar App</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <form id="addApp" onSubmit={handleSubmit(_createApp)}>
            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={appName}
                onChange={(e) => handleAppName(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                value={ownerCountry}
                onChange={(e) => handleOwnerCountry(e.target.value)} />
            </InputBlock>

            {/* <Input type="submit" className="shadow-sm" /> */}
            <SubmitButton type="submit">
              Criar App
            </SubmitButton>
          </form>
        </ContainerForm>
      </AddAppContainer>
    </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  apps: state.user.apps
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setApps,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Apps);