import React, { useEffect, useState } from 'react';
import {
  Container,
  EditInput,
  SubmitButton,
  EditCheckbox,
  EditCheckboxInput,
  SearchView,
  PaginationDiv,
  Search,
  SearchInputDiv,
  SearchInput,
  SearchBtn
} from './styles';
import './styles.css';
import { connect } from 'react-redux';
import {
  setUsers,
  setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import ContentBox from '../ContentBox';
import getAllUsers from './services/getAllUsers';
import getFilteredUsers, { filtersSuffixList } from './services/getFilteredUsers';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import deleteUser from './services/deleteUser';
import editUser from './services/editUser';
import { useForm } from "react-hook-form";
import Pagination from "react-js-pagination";
import { countryChoices, genderChoices, raceChoices } from '../../../../utils/selector';
import Select from 'react-select';
import ModalInput from 'sharedComponents/ModalInput';
import FormInput from 'sharedComponents/FormInput';

const Users = ({
  setUsers,
  users,
  setToken,
  token,
  user,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [userShow, setUserShow] = useState({});
  const [modalEdit, setModalEdit] = useState(false);
  const [editingUser, setEditingUser] = useState({});
  const [editName, setEditName] = useState("");
  const [editBirthdate, setEditBirthdate] = useState(new Date());
  const [editGender, setEditGender] = useState("");
  const [editRace, setEditRace] = useState("");
  const [editProfessional, setEditProfessional] = useState(false);
  const { handleSubmit } = useForm();
  const [userList, setUserList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [totalItems, setTotalItems] = useState(0);
  const [modalFilter, setModalFilter] = useState(false);
  const [filteringSuffix, setFilteringSuffix] = useState({
    email: "_cont",
    user_name: "_cont",
    gender: "_eq",
    race: "_eq",
    is_professional: "_true",
    identification_code: "",
    country: "_eq",
  });
  const [filteringUser, setFilteringUser] = useState({});
  const [isFiltering, setIsFiltering] = useState(false);

  const fields = [
    {
      key: "user_name",
      value: "Nome"
    },
    {
      key: "email",
      value: "Email"
    }
  ]

  const handleShow = (user) => {
    setUserShow(user);
    setModalShow(!modalShow);
  }

  const _getUsers = async (token, page) => {
    setUserList([])

    const response = await getAllUsers(token, page)
    if (!response.users || response.users.length === 0) {
      response.users = null;
    }
    setUsers(response.users)
    setUserList(response.users)

    const { meta } = response
    if (meta) {
      setTotalItems(meta.pagination.total_objects)
    }
  }

  const getSearch = async (page) => {
    setUserList([])

    let filters = {};
    filters["email" + filteringSuffix.email] = filteringUser.email;
    filters["user_name" + filteringSuffix.user_name] = filteringUser.user_name;
    filters["gender" + filteringSuffix.gender] = filteringUser.gender;
    filters["race" + filteringSuffix.race] = filteringUser.race;
    filters["is_professional" + filteringSuffix.is_professional] = filteringUser.is_professional;
    filters["identification_code" + filteringSuffix.identification_code] = filteringUser.identification_code;
    filters["country" + filteringSuffix.country] = filteringUser.country;
    setIsFiltering(true);
    setModalFilter(false);

    const response = await getFilteredUsers(token, page, filters)
    if (!response.users || response.users.length === 0) {
      response.users = null;
    }
    setUserList(response.users)

    const { meta } = response
    if (meta) {
      setTotalItems(meta.pagination.total_objects)
    }
  }

  const handlePageChange = (page) => {
    setActivePage(page)
    if (isFiltering) {
      getSearch(page)
    }
    else {
      _getUsers(token, page)
    }
  }

  const _deleteUser = async (id, token) => {
    const response = await deleteUser(id, token)
    handlePageChange(1)
  }

  const _editUser = async () => {
    const data = {
      "user": {
        "user_name": editName,
        "birthdate": editBirthdate,
        "gender": editGender,
        "race": editRace,
        "is_professional": editProfessional
      }
    };
    await editUser(editingUser.id, data, token);
    setModalEdit(false);
    handlePageChange(1);
  }

  const handleEdit = (content) => {
    setEditingUser(content);
    setEditName(content.user_name);
    setEditBirthdate(content.birthdate);
    setEditGender(content.gender);
    setEditRace(content.race);
    setEditProfessional(content.is_professional);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditBirthdate = (value) => {
    setEditBirthdate(value);
  }

  const handleEditGender = (value) => {
    setEditGender(value);
  }

  const handleEditRace = (value) => {
    setEditRace(value);
  }

  const handleEditProfessional = (value) => {
    setEditProfessional(value);
  }

  const cancelFilter = () => {
    setIsFiltering(false);
    setFilteringUser({});
    _getUsers(token, 1)
  }

  const createDefaultValue = (value) => {
    return value ? { key: value, lable: value } : null
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    _getUsers(token, 1)
  }, [token]);

  const usersNum = new Intl.NumberFormat('pt-BR').format(totalItems)

  return (
    <>
      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Usuário
          </Modal.Title>
        </Modal.Header>
        <form id="editUser" onSubmit={handleSubmit(_editUser)}>
          <Modal.Body>

          <ModalInput
            type="text"
            id="email"
            label="E-mail"
            value={editingUser.email}
            disabled={true}
          />

          <ModalInput
            type="text"
            id="edit_name"
            label="Nome"
            value={editName}
            setValue={(e) => handleEditName(e.target.value)}
          />

          <ModalInput
            type="date"
            id="edit_birthdate"
            label="Data de Nascimento"
            value={moment(editBirthdate).format("YYYY-MM-DD")}
            setValue={(e) => handleEditBirthdate(e.target.value)}
          />

          <ModalInput
              type="select"
              label="Gênero"
              id="edit_gender"
              placeholder="Selecionar"
              options={genderChoices}          
              setValue={(e) => handleEditGender(e.value)}
            />

          <ModalInput
              type="select"
              label="Raça"
              id="edit_race"
              placeholder="Selecionar"
              options={raceChoices}          
              setValue={(e) => handleEditRace(e.value)}
            />

            <EditCheckbox>
              <label htmlFor="edit_professional">Profissional da Saúde</label>
              <EditCheckboxInput
                id="edit_professional"
                type="checkbox"
                value={editProfessional}
                onChange={() => handleEditProfessional(!editProfessional)}
              />
            </EditCheckbox>
          </Modal.Body>

          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={modalFilter}
        onHide={() => setModalFilter(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Filtrar
          </Modal.Title>
        </Modal.Header>
        <form id="filterUser" onSubmit={handleSubmit(() => getSearch(1))}>
          <Modal.Body>

          <ModalInput
            type="text"
            label="Email:"
            id="email"
            placeholder="Todos os emails"
            value={filteringUser.email}
            setValue={(e) => setFilteringUser({ ...filteringUser, email: e.target.value })}
          />

          <ModalInput
            type="text"
            label="Nome:"
            id="user_name"
            placeholder="Todos os nomes"
            value={filteringUser.user_name}
            setValue={(e) => setFilteringUser({ ...filteringUser, user_name: e.target.value})}
          />

          <ModalInput
            type="select"
            label="Gênero:"
            id="gender"
            placeholder="Todos os gêneros"
            value={createDefaultValue(filteringUser.gender)}
            options={genderChoices}
            setValue={(e) => setFilteringUser({ ...filteringUser, gender: e.value })}
          />

          <ModalInput
            type="select"
            label="Raça:"
            id="race"
            placeholder="Todas as raças"
            value={createDefaultValue(filteringUser.race)}
            options={raceChoices}
            setValue={(e) => setFilteringUser({ ...filteringUser, race: e.value })}
          />

          <ModalInput
            type="select"
            label="País:"
            id="country"
            placeholder="Todos os países"
            value={createDefaultValue(filteringUser.country)}
            options={countryChoices}
            setValue={e => setFilteringUser({ ...filteringUser, country: e.value })}
          />

          <ModalInput
            type="select"
            label="É profissional de saúde:"
            id="is_professional"
            placeholder="Todos os tipos"
            value={createDefaultValue(filteringUser.is_professional)}
            options={[
              { key: true, label: "Sim" },
              { key: false, label: 'Não' }]}
            setValue={(e) => setFilteringUser({ ...filteringUser, is_professional: e.key })}
          />

            {user.type === "group_manager" ?
              <>
              <ModalInput
                type="select"
                label="Código de identificação:"
                id="identification_code_suffix"
                placeholder="Selecionar comparador"
                value={createDefaultValue(filteringSuffix.identification_code)}
                options={filtersSuffixList}
                setValue={(e) => setFilteringSuffix({ ...filteringSuffix, identification_code: e.key })}
              />
              <ModalInput
                type="text"
                id="identification_code"
                placeholder="Todos os códigos de identificação"
                value={filteringUser.identification_code}
                setValue={(e) => setFilteringUser({ ...filteringUser, identification_code: e.target.value})}
              />
              </> : null
            }
          </Modal.Body>

          <Modal.Footer>
            <SubmitButton type="submit">Filtrar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            User Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <ModalInput
            type="text"
            label="Aniversário"
            value={moment(userShow.birthdate).format('MM/DD/YYYY')}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="Email"
            value={userShow.email}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="Data de criação"
            value={userShow.created_at}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="Código identificador"
            value={userShow.identification_code}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="Gênero"
            value={userShow.gender}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="País"
            value={userShow.country}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="Raça"
            value={userShow.race}
            disabled={true}
          />

        <ModalInput
            type="text"
            label="É profissional de saúde:"
            value={userShow.is_professional == false ? "Não" : "Sim"}
            disabled={true}
          />

        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      <Container>
        <SearchView>
          <SearchInputDiv>
            <SearchBtn className='btn btn-secondary' onClick={() => setModalFilter(true)}>
              Filtrar pesquisa
            </SearchBtn>
            {isFiltering ?
              <SearchBtn className='btn-danger' onClick={() => cancelFilter()}>
                Cancelar filtros
              </SearchBtn> : null
            }
          </SearchInputDiv>
        </SearchView>
        <ContentBox
          title={`Usuários - ${usersNum}`}
          fields={fields}
          contents={userList}
          handleShow={handleShow}
          component_height={'35rem'}
          delete_function={_deleteUser}
          token={token}
          handleEdit={handleEdit}
        />
        <PaginationDiv>
          <Pagination
            onChange={handlePageChange.bind(this)}
            activePage={activePage}
            itemsCountPerPage={perPage}
            totalItemsCount={totalItems}
            pageRangeDisplayed={6}
            hideDisabled={true}
            itemClass='page'
          />
        </PaginationDiv>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  users: state.user.users,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUsers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);