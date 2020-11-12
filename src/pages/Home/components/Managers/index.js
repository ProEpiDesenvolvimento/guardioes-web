import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setManagers, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllManagers from './services/getAllManagers'
import createManager from './services/createManager'
import deleteManager from './services/deleteManager'
import editManager from './services/editManager';
import { modelsPermissions } from './modelsPermissions';

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  InputBlock,
  Input,
  SubmitButton,
  EditInput,
  EditButton,
} from './styles';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import ContentBox from '../ContentBox';

const Managers = ({
  token,
  user,
  managers,
  setManagers,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [managerName, setManagerName] = useState("")
  const [managerEmail, setManagerEmail] = useState("")
  const [managerPassword, setManagerPassword] = useState("")
  const [modalEdit, setModalEdit] = useState(false);
  const [editingManager, setEditingManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [managerShow, setManagerShow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const [modelsCreate, setModelsCreate] = useState([]);
  const [modelsUpdate, setModelsUpdate] = useState([]);
  const [modelsDestroy, setModelsDestroy] = useState([]);

  const _createManager = async () => {
    const data = {
      "manager": {
        "password": managerPassword,
        "email": managerEmail,
        "name": managerName,
        "app_id": 1,
        "permission_attributes": {
          "models_read": ["content", "symptom"],
          "models_create": modelsCreate,
          "models_update": modelsUpdate,
          "models_destroy": modelsDestroy,
          "models_manage": []
        }
      }
    }
    const response = await createManager(data, token)
    if (!response.errors) {
      setManagerName("")
      setManagerPassword("")
      setManagerEmail("")
      setModelsCreate([]);
      setModelsUpdate([]);
      setModelsDestroy([]);
      _getAllManagers(token);
    }
  }

  const handleModelsPermissions = (model, type) => {
    if (type === "create") {
      if (modelsCreate.includes(model)) {
        let create = modelsCreate.filter((m) => m !== model);
        setModelsCreate(create);
      }
      else {
        let create = modelsCreate.slice();
        create.push(model);
        setModelsCreate(create);
      }
    }
    else if (type === "update") {
      if (modelsUpdate.includes(model)) {
        let update = modelsUpdate.filter((m) => m !== model);
        setModelsUpdate(update);
      }
      else {
        let update = modelsUpdate.slice();
        update.push(model);
        setModelsUpdate(update);
      }
    }
    else if (type === "destroy") {
      if (modelsDestroy.includes(model)) {
        let destroy = modelsDestroy.filter((m) => m !== model);
        setModelsDestroy(destroy);
      }
      else {
        let destroy = modelsDestroy.slice();
        destroy.push(model);
        setModelsDestroy(destroy);
      }
    }
  }

  const _deleteManager = async (id, token) => {
    await deleteManager(id, token)
    _getAllManagers(token)
  }

  const _editManager = async () => {
    const data = {
      "manager": {
        "password": editPassword,
        "email": editEmail,
        "name": editName,
        "app_id": 1,
      }
    };
    await editManager(editingManager.id, data, token);
    setModalEdit(false);
    _getAllManagers(token);
  }

  const handleShow = (content) => {
    setManagerShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingManager(content);
    setEditName(content.name);
    setEditEmail(content.email);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditEmail = (value) => {
    setEditEmail(value);
  }

  const handleEditPassword = (value) => {
    setEditPassword(value);
  }

  const _getAllManagers = async (token) => {
    const response = await getAllManagers(token)
    loadManagers(response)
  }

  const loadManagers = async (response) => {
    let aux_managers = [];
    if (!response.managers) {
      response.managers = [];
    }
    response.managers.map(manager => {
      aux_managers.push({
        "id": manager.id,
        "name": manager.name,
        "email": manager.email,
      })
    })
    await setManagers(aux_managers)
  }

  useEffect(() => {
    _getAllManagers(token)
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
    }];

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do Gerente
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>E-mail</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.email}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Grupo</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.group_name}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Gerente
          </Modal.Title>
        </Modal.Header>
        <form id="editManager" onSubmit={handleSubmit(_editManager)}>
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
              <label htmlFor="edit_email">E-mail</label>
              <input
                type="email"
                id="edit_email"
                value={editEmail}
                onChange={(e) => handleEditEmail(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_password">Senha</label>
              <input
                type="password"
                id="edit_password"
                value={editPassword}
                onChange={(e) => handleEditPassword(e.target.value)}
              />
            </EditInput>
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Gerentes"
          token={token}
          contents={managers ? managers : []}
          fields={fields}
          delete_function={_deleteManager}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Gerente</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createManager)}>
              <Inputs>
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="email"
                    id="email"
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    id="password"
                    value={managerPassword}
                    onChange={(e) => setManagerPassword(e.target.value)}
                  />
                </InputBlock>

                <InputBlock>
                  <label htmlFor="password">Permissões para contents</label>

                  {modelsPermissions.map((permission) => (
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`content-${permission.value}`}
                        onChange={() => handleModelsPermissions("content", permission.value)}
                      />
                      <label className="form-check-label" htmlFor={`content-${permission.value}`}>
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </InputBlock>

                <InputBlock>
                  <label htmlFor="password">Permissões para sintomas</label>

                  {modelsPermissions.map((permission) => (
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`symptom-${permission.value}`}
                        onChange={() => handleModelsPermissions("symptom", permission.value)}
                      />
                      <label className="form-check-label" htmlFor={`symptom-${permission.value}`}>
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </InputBlock>
              </Inputs>
              <SubmitButton type="submit">
                Adicionar
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddAppContainer>
      </Container >
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  managers: state.user.managers
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setManagers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Managers);
