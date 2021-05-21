import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setCityManagers, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllCityManagers from './services/getAllCityManagers'
import createCityManager from './services/createCityManager'
import deleteCityManager from './services/deleteCityManager'
import editCityManager from './services/editCityManager';

import getRootGroup from '../Groups/services/getRootGroup'
import getChildrenGroups from './../Groups/services/getChildrenGroups'

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
  SelectInput
} from './styles';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import ContentBox from '../ContentBox';

const CityManagers = ({
  token,
  user,
  cityManagers,
  setCityManagers,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [cityManagerName, setCityManagerName] = useState("");
  const [cityManagerEmail, setCityManagerEmail] = useState("");
  const [cityManagerCity, setCityManagerCity] = useState("");
  const [cityManagerPassword, setCityManagerPassword] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [editingCityManager, setEditingCityManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCity, setEditCity] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [cityManagerShow, setCityManagerShow] = useState({});
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const _createCityManager = async () => {
    const data = {
      "city_manager": {
        "name": cityManagerName,
        "city": cityManagerCity,
        "password": cityManagerPassword,
        "email": cityManagerEmail,
        "app_id": user.app_id,
      }
    }
    const response = await createCityManager(data, token)

    setCityManagerName("")
    setCityManagerCity("")
    setCityManagerEmail("")
    setCityManagerPassword("")
    _getAllCityManagers(token);
  }

  const _deleteCityManager = async (id, token) => {
    await deleteCityManager(id, token)
    _getAllCityManagers(token)
  }

  const _editCityManager = async () => {
    const data = {
      "city_manager": {
        "name": editName,
        "city": editCity,
        "email": editEmail,
        "app_id": user.app_id,
      }
    };
    await editCityManager(editingCityManager.id, data, token);
    setModalEdit(false);
    _getAllCityManagers(token);
  }

  const handleShow = (content) => {
    setCityManagerShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingCityManager(content);
    setEditName(content.name);
    setEditEmail(content.email);
    setEditCity(content.city);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditEmail = (value) => {
    setEditEmail(value);
  }

  const loadLocales = async (locale_id=null, locale_name='country') => {
    if (locale_id === null) {
      const response = await getRootGroup()
      locale_id = response.group.id
    }
    const response = await getChildrenGroups(locale_id)

    switch(locale_name) {
      case 'country':
        setCountry(response.children)
        return
      case 'state':
        setState(response.children)
        return
      case 'city':
        setCity(response.children)
        return
      default:
        return
    }
  }

  const _getAllCityManagers = async (token) => {
    const response = await getAllCityManagers(token)
    loadCityManagers(response)
  }

  const loadCityManagers = async (response) => {
    let aux_city_managers = [];
    if (!response.city_managers) {
      response.city_managers = [];
    }
    response.city_managers.forEach(city_manager => {
      if (!user.is_god) {
        if (city_manager.app_id === user.app_id) {
          aux_city_managers.push({
            "id": city_manager.id,
            "name": city_manager.name,
            "email": city_manager.email,
            "city": city_manager.city,
          })
        }
      } else {
        aux_city_managers.push({
          "id": city_manager.id,
          "name": city_manager.name,
          "email": city_manager.email,
          "city": city_manager.city,
        })
      }
    })

    if (aux_city_managers.length === 0) {
      aux_city_managers = null
    }
    await setCityManagers(aux_city_managers)
  }

  useEffect(() => {
    _getAllCityManagers(token)
    setToken(token)
    loadLocales()
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
            Informações do Gerente de Município
          </Modal.Title>
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
            Editar Gerente de Município
          </Modal.Title>
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
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    value={cityManagerName}
                    onChange={(e) => setCityManagerName(e.target.value)}
                  />
                </InputBlock>
                
                <InputBlock>
                    <label htmlFor="country">País</label>
                    <SelectInput
                      type="select"
                      id="country"
                      onChange={(e) => {
                        const id = parseInt(e.target.value)
                        loadLocales(id, 'state')
                      }}
                    >
                      <option>Escolha</option>
                      {country.map((g) => {
                        return <option key={g.id} value={g.id}>{g.description}</option>
                      })}
                    </SelectInput>
                  </InputBlock>

                  <InputBlock>
                    <label htmlFor="state">Estado</label>
                    <SelectInput
                      type="select"
                      id="state"
                      onChange={(e) => {
                        const id = parseInt(e.target.value)
                        loadLocales(id, 'city')
                      }}
                    >
                      <option>Escolha</option>
                      {state.map((g) => {
                        return <option key={g.id} value={g.id}>{g.description}</option>
                      })}
                    </SelectInput>
                  </InputBlock>

                  <InputBlock>
                    <label htmlFor="city">Cidade</label>
                    <SelectInput
                      type="select"
                      id="city"
                      onChange={(e) => {
                        setCityManagerCity(e.target.value)
                      }}
                    >
                      <option>Escolha</option>
                      {city.map((g) => {
                        return <option key={g.id} value={g.description}>{g.description}</option>
                      })}
                    </SelectInput>
                  </InputBlock>
                
                <InputBlock>
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="email"
                    id="email"
                    value={cityManagerEmail}
                    onChange={(e) => setCityManagerEmail(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    id="password"
                    value={cityManagerPassword}
                    onChange={(e) => setCityManagerPassword(e.target.value)}
                  />
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
  cityManagers: state.user.city_managers
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setCityManagers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CityManagers);