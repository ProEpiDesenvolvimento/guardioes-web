import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setGroupManagers, setGroupManagerTeams, setToken } from "actions/";

import { bindActionCreators } from "redux";
import getAllGroupManagerTeams from "./services/getAllGroupManagerTeams";
import createGroupManagerTeam from "./services/createGroupManagerTeam";
import deleteGroupManagerTeam from "./services/deleteGroupManagerTeam";
import editGroupManagerTeam from "./services/editGroupManagerTeam";

import getAllGroupManagers from "../GroupManagers/services/getAllGroupManagers";

import { modelsCheckboxes } from "./modelsPermissions";

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  SubmitButton,
  EditButton,
} from "./styles";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ContentBox from "../ContentBox";
import FormInput from "sharedComponents/FormInput";
import ModalInput from "sharedComponents/ModalInput";

const GroupManagerTeams = ({
  token,
  user,
  groupManagers,
  setGroupManagers,
  groupManagerTeams,
  setGroupManagerTeams,
  setToken,
}) => {
  const { handleSubmit } = useForm();
  const [groupManagerTeamName, setGroupManagerTeamName] = useState("");
  const [groupManagerTeamEmail, setGroupManagerTeamEmail] = useState("");
  const [groupManagerTeamPassword, setGroupManagerTeamPassword] = useState("");
  const [groupManagerID, setGroupManagerID] = useState(0);
  const [modalEdit, setModalEdit] = useState(false);
  const [editingGroupManagerTeam, setEditingGroupManagerTeam] = useState({});
  const [groupManagerTeamShow, setGroupManagerTeamShow] = useState({});
  const [modelsManage, setModelsManage] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const _createGroupManagerTeam = async () => {
    const userID = user.type === "group_manager" ? user.id : groupManagerID;

    if (
      groupManagerTeamName === "" ||
      groupManagerTeamEmail === "" ||
      groupManagerTeamPassword === "" ||
      userID === 0 ||
      modelsManage.length === 0
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const data = {
      group_manager_team: {
        name: groupManagerTeamName,
        email: groupManagerTeamEmail,
        password: groupManagerTeamPassword,
        app_id: user.app_id,
        group_manager_id: userID,
        permission_attributes: {
          models_create: [],
          models_read: [],
          models_update: [],
          models_destroy: [],
          models_manage: modelsManage,
        },
      },
    };
    const response = await createGroupManagerTeam(data, token);
    if (!response.errors) {
      setGroupManagerTeamName("");
      setGroupManagerTeamPassword("");
      setGroupManagerTeamEmail("");
      setModelsManage([]);
      _getAllGroupManagerTeams(token);
    }
  };

  const handleModelsPermissions = (model) => {
    if (modelsManage.includes(model)) {
      let newModelsManage = modelsManage.filter((m) => m !== model);
      setModelsManage(newModelsManage);
    } else {
      let newModelsManage = modelsManage.slice();
      newModelsManage.push(model);
      setModelsManage(newModelsManage);
    }
  };

  const _deleteGroupManagerTeam = async (id, token) => {
    await deleteGroupManagerTeam(id, token);
    _getAllGroupManagerTeams(token);
  };

  const _editGroupManagerTeam = async () => {
    const data = {
      group_manager_team: {
        email: editingGroupManagerTeam.email,
        name: editingGroupManagerTeam.name,
        app_id: user.app_id,
        permission: editingGroupManagerTeam.permission,
      },
    };
    await editGroupManagerTeam(editingGroupManagerTeam.id, data, token);
    setModalEdit(false);
    setTimeout(() => {
      _getAllGroupManagerTeams(token);
    }, 500);
  };

  const handleShow = (content) => {
    setGroupManagerTeamShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    setEditingGroupManagerTeam(content);
    setModalEdit(!modalEdit);
  };

  const loadAllGroupManagers = async (token) => {
    const response = await getAllGroupManagers(token);
    if (!response.errors) {
      setGroupManagers(response.group_managers);
    }
  };

  const _getAllGroupManagerTeams = async (token) => {
    const response = await getAllGroupManagerTeams(token);
    loadGroupManagerTeams(response);
  };

  const loadGroupManagerTeams = async (response) => {
    let aux_group_manager_teams = [];
    if (!response.group_manager_teams) {
      response.group_manager_teams = [];
    }
    response.group_manager_teams.forEach((group_manager_team) => {
      aux_group_manager_teams.push({
        id: group_manager_team.id,
        name: group_manager_team.name,
        email: group_manager_team.email,
        permission: group_manager_team.permission
          ? group_manager_team.permission.models_manage
          : [],
      });
    });
    if (aux_group_manager_teams.length === 0) {
      aux_group_manager_teams = null;
    }
    await setGroupManagerTeams(aux_group_manager_teams);
  };

  useEffect(() => {
    _getAllGroupManagerTeams(token);
    if (user.type !== "group_manager") {
      loadAllGroupManagers(token);
    }
    setToken(token);
  }, []);

  const fields = [
    {
      key: "id",
      value: "ID",
    },
    {
      key: "name",
      value: "Nome",
    },
  ];

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações da Equipe</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            type="text"
            label="ID"
            value={groupManagerTeamShow.id}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Nome"
            value={groupManagerTeamShow.name}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="E-mail"
            value={groupManagerTeamShow.email}
            disabled={true}
          />
          <ModalInput
            label="Permissões da Equipe:"
            type="checkboxes"
            id="permission"
            options={modelsCheckboxes}
            isSelected={groupManagerTeamShow}
            disabled={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Equipe</Modal.Title>
        </Modal.Header>
        <form
          id="editGroupManagerTeam"
          onSubmit={handleSubmit(_editGroupManagerTeam)}
        >
          <Modal.Body>
            <ModalInput
              type="text"
              label="Nome"
              id="edit_name"
              value={editingGroupManagerTeam.name}
              setValue={(e) =>
                setEditingGroupManagerTeam({
                  ...editingGroupManagerTeam,
                  name: e.target.value,
                })
              }
            />
            <ModalInput
              type="text"
              label="E-mail"
              value={editingGroupManagerTeam.email}
              disabled={true}
            />
            <ModalInput
              label="Permissões da Equipe:"
              type="checkboxes"
              id="permission"
              options={modelsCheckboxes}
              isSelected={editingGroupManagerTeam}
              setValue={setEditingGroupManagerTeam}
            />
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Equipes"
          token={token}
          contents={groupManagerTeams}
          fields={fields}
          delete_function={_deleteGroupManagerTeam}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Equipe</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createGroupManagerTeam)}>
              <Inputs>
                <FormInput
                  label="Nome"
                  type="text"
                  id="name"
                  value={groupManagerTeamName}
                  setValue={(e) => setGroupManagerTeamName(e.target.value)}
                />
                <FormInput
                  label="E-mail"
                  type="email"
                  id="email"
                  value={groupManagerTeamEmail}
                  setValue={(e) => setGroupManagerTeamEmail(e.target.value)}
                />
                <FormInput
                  label="Senha"
                  type="password"
                  id="password"
                  value={groupManagerTeamPassword}
                  setValue={(e) => setGroupManagerTeamPassword(e.target.value)}
                />
                {user.type !== "group_manager" ? (
                  <FormInput
                    label="Gerente de Instituição"
                    type="select"
                    id="group_manager"
                    setValue={(e) => {
                      const id = parseInt(e.value);
                      setGroupManagerID(id);
                    }}
                    options={groupManagers.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                  />
                ) : null}
                <FormInput
                  label="Permissões da Equipe:"
                  type="checkboxes"
                  id="permission"
                  options={modelsCheckboxes}
                  isSelected={modelsManage}
                  setValue={handleModelsPermissions}
                />
              </Inputs>
              <SubmitButton type="submit">Adicionar</SubmitButton>
            </Form>
          </ContainerForm>
        </AddAppContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  groupManagers: state.user.group_managers,
  groupManagerTeams: state.user.group_manager_teams,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setGroupManagers,
      setGroupManagerTeams,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GroupManagerTeams);
