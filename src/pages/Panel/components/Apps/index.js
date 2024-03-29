import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setApps, setToken } from "actions/";
import { bindActionCreators } from "redux";
import getAllApps from "./services/getAllApps";
import createApp from "./services/createApp";
import deleteApp from "./services/deleteApp";
import editApp from "./services/editApp";
import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  ContainerFormInput,
  SubmitButton,
} from "./styles";
import { useForm } from "react-hook-form";
import ContentBox from "../ContentBox";
import Modal from "react-bootstrap/Modal";
import { sessionService } from "redux-react-session";
import { countryChoices } from "../../../../utils/selector";
import FormInput from "sharedComponents/FormInput";
import ModalInput from "sharedComponents/ModalInput";

const Apps = ({ token, user, apps, setApps, setToken }) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [editingApp, setEditingApp] = useState({});
  const { handleSubmit } = useForm();
  const [appName, setAppName] = useState("");
  const [ownerCountry, setOwnerCountry] = useState("");
  const [twitter, setTwitter] = useState("");
  const [editName, setEditName] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editTwitter, setEditTwitter] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [appShow, setAppShow] = useState({});

  const _createApp = async () => {
    const data = {
      app_name: appName,
      owner_country: ownerCountry,
      twitter: twitter,
    };
    const reponse = await createApp(data, token);
    console.log(reponse);

    _getApps(token);
    setAppName("");
    setOwnerCountry("");
    setTwitter("");
  };

  const _getApps = async (token) => {
    const response = await getAllApps(token);
    if (!response.apps || response.apps.length === 0) {
      response.apps = null;
    }
    setApps(response.apps);
  };

  const _deleteApp = async (id, token) => {
    await deleteApp(id, token);
    _getApps(token);
  };

  const _editApp = async () => {
    const data = {
      app_name: editName,
      twitter: editTwitter,
    };
    await editApp(editingApp.id, data, token);
    setModalEdit(false);
    _getApps(token);
  };

  const handleShow = (content) => {
    setAppShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    setEditingApp(content);
    setEditName(content.app_name);
    setEditCountry(content.owner_country);
    setEditTwitter(content.twitter);
    setModalEdit(!modalEdit);
  };

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession();
      setToken(auxSession.token);
    };
    _loadSession();
    _getApps(token);
  }, [token]);

  const fields = [
    { key: "id", value: "ID" },
    { key: "app_name", value: "Nome" },
  ];

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do App</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            type="text"
            label="ID"
            value={appShow.id}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Nome"
            value={appShow.app_name}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="País"
            value={appShow.owner_country}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Twitter"
            value={appShow.twitter}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Administrador"
            value={appShow.adminEmail}
            disabled={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>
            Voltar
          </SubmitButton>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar App</Modal.Title>
        </Modal.Header>
        <form id="editApp" onSubmit={handleSubmit(_editApp)}>
          <Modal.Body>
            <ModalInput
              type="text"
              label="Nome"
              id="edit_name"
              value={editName}
              setValue={(e) => setEditName(e.target.value)}
            />
            <ModalInput
              type="text"
              label="País"
              value={editCountry}
              disabled={true}
            />
            <ModalInput
              type="text"
              label="Twitter"
              id="edit_twitter"
              value={editTwitter}
              setValue={(e) => setEditTwitter(e.target.value)}
            />
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
          contents={apps}
          fields={fields}
          delete_function={_deleteApp}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar App</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <form id="addApp" onSubmit={handleSubmit(_createApp)}>
              <FormInput
                label="Nome"
                type="text"
                id="name"
                value={appName}
                setValue={(e) => setAppName(e.target.value)}
                isLongInput={true}
              />
              <ContainerFormInput>
                <FormInput
                  label="País"
                  type="select"
                  id="app_id"
                  options={countryChoices}
                  setValue={(e) => setOwnerCountry(e.value)}
                  isLongInput={true}
                />
                <FormInput
                  label="Twitter"
                  type="text"
                  id="twitter"
                  value={twitter}
                  setValue={(e) => setTwitter(e.target.value)}
                  isLongInput={true}
                />
              </ContainerFormInput>

              {/* <Input type="submit" className="shadow-sm" /> */}
              <SubmitButton type="submit">Criar App</SubmitButton>
            </form>
          </ContainerForm>
        </AddAppContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  apps: state.user.apps,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setApps,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
