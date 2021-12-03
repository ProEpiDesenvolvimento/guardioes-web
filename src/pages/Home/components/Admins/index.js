import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setAdmins, setToken } from "actions/";
import { bindActionCreators } from "redux";
import getAllAdmins from "./services/getAllAdmins";
import createAdmin from "./services/createAdmin";
import deleteAdmin from "./services/deleteAdmin";
import editAdmin from "./services/editAdmin";
import getAllApps from "../Apps/services/getAllApps";
import {
  Container,
  AddAdminContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  SubmitButton,
} from "./styles";
import { useForm } from "react-hook-form";
import ContentBox from "../ContentBox";
import Modal from "react-bootstrap/Modal";
import { sessionService } from "redux-react-session";
import ModalInput from "sharedComponents/ModalInput";
import FormInput from "sharedComponents/FormInput";

const Admins = ({ token, user, admins, setAdmins, setToken }) => {
  const { handleSubmit } = useForm();
  const [apps, setApps] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState({});
  const [adminShow, setAdminShow] = useState({});
  const [modalEdit, setModalEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGod, setIsGod] = useState(false);
  const [appId, setAppId] = useState(0);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editIsGod, setEditIsGod] = useState(false);
  const [editApp, setEditApp] = useState({});

  const _createAdmin = async () => {
    const data = {
      admin: {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        is_god: isGod,
        app_id: appId,
      },
    };
    await createAdmin(data, token);
    _getAdmins(token);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const _getAdmins = async (token) => {
    const response = await getAllAdmins(token);
    setAdmins(response.admins);
  };

  const _getApps = async (token) => {
    const response = await getAllApps(token);
    let a = [];
    if (!response.apps) {
      response.apps = [];
    }
    response.apps.forEach((app) => {
      const option = {
        label: app.app_name,
        value: app.id,
      };
      a.push(option);
    });
    setApps(a);
  };

  const _deleteAdmin = async (id, token) => {
    await deleteAdmin(id, token);
    _getAdmins(token);
  };

  const _editAdmin = async () => {
    const data = {
      admin: {
        email: editEmail,
        first_name: editFirstName,
        last_name: editLastName,
        is_god: editIsGod,
        app_id: editApp,
      },
    };
    await editAdmin(editingAdmin.id, data, token);
    setModalEdit(false);
    _getAdmins(token);
  };

  const handleShow = (content) => {
    const a = apps.filter((app) => app.value === content.app_id);
    content.app_name = a[0].label;
    setAdminShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    const a = apps.filter((app) => app.value === content.app_id);
    content.app = a[0];
    setEditingAdmin(content);
    setEditFirstName(content.first_name);
    setEditLastName(content.last_name);
    setEditEmail(content.email);
    setEditIsGod(content.is_god);
    setEditApp(content.app);
    setModalEdit(!modalEdit);
  };

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession();
      setToken(auxSession.token);
    };
    _loadSession();
    _getAdmins(token);
    _getApps(token);
  }, [token]);

  const fields = [
    { key: "id", value: "ID" },
    { key: "email", value: "E-mail" },
  ];

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalInput
            type="text"
            label="ID"
            value={adminShow.id}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="E-mail"
            value={adminShow.email}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Nome"
            value={adminShow.first_name}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Sobrenome"
            value={adminShow.last_name}
            disabled={true}
          />
          <ModalInput
            type="checkbox"
            id="is_god"
            label="Is God"
            value={adminShow.is_god}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="App"
            value={adminShow.app_name}
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
          <Modal.Title>Editar Admin</Modal.Title>
        </Modal.Header>
        <form id="editAdmin" onSubmit={handleSubmit(_editAdmin)}>
          <Modal.Body>
            <ModalInput
              type="text"
              label="Nome"
              id="edit_first_name"
              value={editFirstName}
              setValue={(e) => setEditFirstName(e.target.value)}
            />
            <ModalInput
              type="text"
              label="Sobrenome"
              id="edit_last_name"
              value={editLastName}
              setValue={(e) => setEditLastName(e.target.value)}
            />
            <ModalInput
              type="text"
              label="E-mail"
              value={editEmail}
              disabled={true}
            />
            <ModalInput
              type="select"
              label="App"
              id="app_id"
              options={apps}
              value={editApp}
              setValue={(e) => setEditApp(e.target.value)}
            />
            <ModalInput
              type="checkbox"
              id="is_god"
              label="Is God"
              value={editIsGod}
              setValue={() => setEditIsGod(!editIsGod)}
            />
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Admins"
          token={token}
          contents={admins}
          fields={fields}
          delete_function={_deleteAdmin}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAdminContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Admin</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <form id="addAdmin" onSubmit={handleSubmit(_createAdmin)}>
              <FormInput
                label="Nome"
                type="text"
                id="first_name"
                value={firstName}
                setValue={(e) => setFirstName(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="Sobrenome"
                type="text"
                id="last_name"
                value={lastName}
                setValue={(e) => setLastName(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="E-mail"
                type="email"
                id="email"
                value={email}
                setValue={(e) => setEmail(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="Senha"
                type="password"
                id="password"
                value={password}
                setValue={(e) => setPassword(e.target.value)}
                isLongInput={true}
              />
              <FormInput
                label="App"
                type="select"
                id="app_id"
                options={apps}
                setValue={(e) => setAppId(e.value)}
                isLongInput={true}
              />
              <FormInput
                label="Is God"
                type="checkbox"
                id="is_god"
                checked={isGod}
                setValue={() => setIsGod(!isGod)}
              />
              <SubmitButton type="submit">Criar Admin</SubmitButton>
            </form>
          </ContainerForm>
        </AddAdminContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  admins: state.user.admins,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAdmins,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
