import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setGroupManagers, setToken } from "actions/";

import { bindActionCreators } from "redux";
import getAllGroupManagers from "./services/getAllGroupManagers";
import createGroupManager from "./services/createGroupManager";
import deleteGroupManager from "./services/deleteGroupManager";
import editGroupManager from "./services/editGroupManager";

import getRootGroup from "../Groups/services/getRootGroup";
import getChildrenGroups from "./../Groups/services/getChildrenGroups";
import createGroup from "./../Groups/services/createGroup";

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

const GroupManagers = ({
  token,
  user,
  groupManagers,
  setGroupManagers,
  setToken,
}) => {
  const { handleSubmit } = useForm();
  const [groupManagerName, setGroupManagerName] = useState("");
  const [groupManagerEmail, setGroupManagerEmail] = useState("");
  const [groupManagerTwitter, setGroupManagerTwitter] = useState("");
  const [groupManagerGroup, setGroupManagerGroup] = useState("");
  const [groupManagerPassword, setGroupManagerPassword] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [editingGroupManager, setEditingGroupManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTwitter, setEditTwitter] = useState("");
  const [editGroup, setEditGroup] = useState("");
  const [groupManagerShow, setGroupManagerShow] = useState({});
  const [groupManagerLocale, setGroupManagerLocale] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const _createGroupManager = async () => {
    if (groupManagerLocale === 0) {
      alert("Escolha uma localidade.");
      return;
    }

    const data = {
      group_manager: {
        name: groupManagerName,
        email: groupManagerEmail,
        password: groupManagerPassword,
        group_name: groupManagerGroup,
        twitter: groupManagerTwitter,
        app_id: user.app_id,
      },
    };
    const response = await createGroupManager(data, token);

    if (response.status === 200) {
      const group_data = {
        description: groupManagerGroup,
        code: "",
        children_label: null,
        parent_id: groupManagerLocale,
        group_manager_id: response.data.group_manager.id,
      };
      const response_group = await createGroup(group_data, token);

      if (response_group.status === 201) {
        setGroupManagerName("");
        setGroupManagerPassword("");
        setGroupManagerEmail("");
        setGroupManagerGroup("");
        setGroupManagerTwitter("");
        _getAllGroupManagers(token);
      }
    }
  };

  const _deleteGroupManager = async (id, token) => {
    await deleteGroupManager(id, token);
    _getAllGroupManagers(token);
  };

  const _editGroupManager = async () => {
    const data = {
      group_manager: {
        name: editName,
        email: editEmail,
        group_name: editGroup,
        twitter: editTwitter,
        app_id: user.app_id,
      },
    };
    await editGroupManager(editingGroupManager.id, data, token);
    setModalEdit(false);
    _getAllGroupManagers(token);
  };

  const handleShow = (content) => {
    setGroupManagerShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    setEditingGroupManager(content);
    setEditName(content.name);
    setEditEmail(content.email);
    setEditGroup(content.group_name);
    setEditTwitter(content.twitter);
    setModalEdit(!modalEdit);
  };

  const loadLocales = async (locale_id = null, locale_name = "country") => {
    if (locale_id === null) {
      const response = await getRootGroup();
      locale_id = response.group.id;
    } else if (!locale_id) {
      setState([]);
      setCity([]);
      return;
    }

    const response = await getChildrenGroups(locale_id);
    switch (locale_name) {
      case "country":
        setCountry(response.children);
        return;
      case "state":
        setState(response.children);
        return;
      case "city":
        setCity(response.children);
        return;
      default:
        return;
    }
  };

  const _getAllGroupManagers = async (token) => {
    const response = await getAllGroupManagers(token);
    loadGroupManagers(response);
  };

  const loadGroupManagers = async (response) => {
    let aux_group_managers = [];
    if (!response.group_managers) {
      response.group_managers = [];
    }
    response.group_managers.forEach((group_manager) => {
      aux_group_managers.push({
        id: group_manager.id,
        name: group_manager.name,
        email: group_manager.email,
        group_name: group_manager.group_name,
        twitter: group_manager.twitter,
      });
    });
    if (aux_group_managers.length === 0) {
      aux_group_managers = null;
    }
    await setGroupManagers(aux_group_managers);
  };

  useEffect(() => {
    _getAllGroupManagers(token);
    setToken(token);
    loadLocales();
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
          <Modal.Title>Informações do Gerente de Instituição</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalInput
            type="text"
            label="ID"
            value={groupManagerShow.id}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Nome"
            value={groupManagerShow.name}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="E-mail"
            value={groupManagerShow.email}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Grupo"
            value={groupManagerShow.group_name}
            disabled={true}
          />
          <ModalInput
            type="text"
            label="Twitter"
            value={groupManagerShow.twitter}
            disabled={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Gerente de Instituição</Modal.Title>
        </Modal.Header>
        <form id="editGroupManager" onSubmit={handleSubmit(_editGroupManager)}>
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
              label="E-mail"
              value={editEmail}
              disabled={true}
            />
            <ModalInput
              type="text"
              label="Grupo"
              value={editGroup}
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
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Gerentes de Instituições"
          token={token}
          contents={groupManagers}
          fields={fields}
          delete_function={_deleteGroupManager}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Gerente de Instituição</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createGroupManager)}>
              <Inputs>
                <FormInput
                  label="Nome"
                  type="text"
                  id="name"
                  value={groupManagerName}
                  setValue={(e) => setGroupManagerName(e.target.value)}
                />
                <FormInput
                  label="País"
                  type="select"
                  id="country"
                  setValue={(e) => {
                    const id = parseInt(e.value);
                    setGroupManagerLocale(id);
                    loadLocales(id, "state");
                  }}
                  options={country.map((item) => {
                    return {
                      value: item.id,
                      label: item.description,
                    };
                  })}
                />
                <FormInput
                  label="Estado"
                  type="select"
                  id="state"
                  setValue={(e) => {
                    const id = parseInt(e.value);
                    setGroupManagerLocale(id);
                    loadLocales(id, "city");
                  }}
                  options={state.map((item) => {
                    return {
                      value: item.id,
                      label: item.description,
                    };
                  })}
                />
                <FormInput
                  label="Cidade"
                  type="select"
                  id="city"
                  setValue={(e) => {
                    const id = parseInt(e.value);
                    setGroupManagerLocale(id);
                  }}
                  options={city.map((item) => {
                    return {
                      value: item.id,
                      label: item.description,
                    };
                  })}
                />
                <FormInput
                  label="E-mail"
                  type="email"
                  id="email"
                  value={groupManagerEmail}
                  setValue={(e) => setGroupManagerEmail(e.target.value)}
                />
                <FormInput
                  label="Grupo"
                  type="text"
                  id="group"
                  value={groupManagerGroup}
                  setValue={(e) => setGroupManagerGroup(e.target.value)}
                />
                <FormInput
                  label="Twitter"
                  type="text"
                  id="twitter"
                  value={groupManagerTwitter}
                  setValue={(e) => setGroupManagerTwitter(e.target.value)}
                />
                <FormInput
                  label="Senha"
                  type="password"
                  id="password"
                  value={groupManagerPassword}
                  setValue={(e) => setGroupManagerPassword(e.target.value)}
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setGroupManagers,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GroupManagers);
