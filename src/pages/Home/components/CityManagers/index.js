import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCityManagers, setToken } from "actions/";

import { bindActionCreators } from "redux";
import getAllCityManagers from "./services/getAllCityManagers";
import createCityManager from "./services/createCityManager";
import deleteCityManager from "./services/deleteCityManager";
import editCityManager from "./services/editCityManager";

import { countryChoices } from "../../../../utils/selector";
import { stateOptions, getCity } from "../../../../utils/Brasil";

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  SubmitButton,
  EditInput,
  EditButton,
} from "./styles";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ContentBox from "../ContentBox";
import FormInput from "sharedComponents/FormInput";

const CityManagers = ({
  token,
  user,
  cityManagers,
  setCityManagers,
  setToken,
}) => {
  const { handleSubmit } = useForm();

  const [cityManagerName, setCityManagerName] = useState("");
  const [cityManagerCity, setCityManagerCity] = useState("");
  const [cityManagerEmail, setCityManagerEmail] = useState("");
  const [cityManagerPassword, setCityManagerPassword] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [editingCityManager, setEditingCityManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCity, setEditCity] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [cityManagerShow, setCityManagerShow] = useState({});
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const _createCityManager = async () => {
    if (cityManagerCity === "") {
      alert("Selecione um Município.");
      return;
    }

    const data = {
      city_manager: {
        name: cityManagerName,
        city: cityManagerCity,
        email: cityManagerEmail,
        password: cityManagerPassword,
        app_id: user.app_id,
      },
    };
    const response = await createCityManager(data, token);

    if (response.status === 200) {
      setCityManagerName("");
      setCityManagerCity("");
      setCityManagerEmail("");
      setCityManagerPassword("");
      _getAllCityManagers(token);
    }
  };

  const _deleteCityManager = async (id, token) => {
    await deleteCityManager(id, token);
    _getAllCityManagers(token);
  };

  const _editCityManager = async () => {
    const data = {
      city_manager: {
        name: editName,
        email: editEmail,
        app_id: user.app_id,
      },
    };
    await editCityManager(editingCityManager.id, data, token);
    setModalEdit(false);
    _getAllCityManagers(token);
  };

  const handleShow = (content) => {
    setCityManagerShow(content);
    setModalShow(!modalShow);
  };

  const handleEdit = (content) => {
    setEditingCityManager(content);
    setEditName(content.name);
    setEditEmail(content.email);
    setEditCity(content.city);
    setModalEdit(!modalEdit);
  };

  const handleEditName = (value) => {
    setEditName(value);
  };

  const handleEditEmail = (value) => {
    setEditEmail(value);
  };

  const _getAllCityManagers = async (token) => {
    const response = await getAllCityManagers(token);
    loadCityManagers(response);
  };

  const loadCityManagers = async (response) => {
    let aux_city_managers = [];
    if (!response.city_managers) {
      response.city_managers = [];
    }
    response.city_managers.forEach((city_manager) => {
      if (city_manager.app_id === user.app_id) {
        aux_city_managers.push({
          id: city_manager.id,
          name: city_manager.name,
          email: city_manager.email,
          city: city_manager.city,
        });
      }
    });
    if (aux_city_managers.length === 0) {
      aux_city_managers = null;
    }
    await setCityManagers(aux_city_managers);
  };

  useEffect(() => {
    _getAllCityManagers(token);
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
          <Modal.Title>Informações do Gerente de Município</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={cityManagerShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={cityManagerShow.name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>E-mail</label>
            <input
              className="text-dark"
              type="text"
              value={cityManagerShow.email}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Município</label>
            <input
              className="text-dark"
              type="text"
              value={cityManagerShow.city}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Gerente de Município</Modal.Title>
        </Modal.Header>
        <form id="editCityManager" onSubmit={handleSubmit(_editCityManager)}>
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
                disabled
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_city">Município</label>
              <input type="text" id="edit_city" value={editCity} disabled />
            </EditInput>
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Gerentes de Municípios"
          token={token}
          contents={cityManagers}
          fields={fields}
          delete_function={_deleteCityManager}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Gerente de Município</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createCityManager)}>
              <Inputs>
                <FormInput
                  label="Nome"
                  type="text"
                  id="name"
                  value={cityManagerName}
                  setValue={setCityManagerName}
                />
                <FormInput
                  label="País"
                  type="select"
                  id="country"
                  value={country}
                  setValue={setCountry}
                  options={countryChoices}
                />

                {country === "Brazil" ? (
                  <>
                    <FormInput
                      label="Estado"
                      type="select"
                      id="state"
                      value={state}
                      setValue={setState}
                      options={stateOptions}
                    />
                    <FormInput
                      label="Município"
                      type="select"
                      id="city"
                      value={cityManagerCity}
                      setValue={setCityManagerCity}
                      options={getCity(state)}
                    />
                  </>
                ) : null}

                <FormInput
                  label="E-mail"
                  type="email"
                  id="email"
                  value={cityManagerEmail}
                  setValue={setCityManagerEmail}
                />
                <FormInput
                  label="Senha"
                  type="password"
                  id="password"
                  value={cityManagerPassword}
                  setValue={setCityManagerPassword}
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
  cityManagers: state.user.city_managers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCityManagers,
      setToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CityManagers);
