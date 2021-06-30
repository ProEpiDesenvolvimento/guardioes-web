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
    email: "",
    user_name: "",
    gender: "_eq",
    race: "_eq",
    is_professional: "_true",
    identification_code: "",
    country: "_eq",
  });
  const [filteringUser, setFilteringUser] = useState({
    email: "",
    user_name: "",
    gender: "",
    race: "",
    is_professional: false,
    identification_code: "",
    country: "",
  });
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

  const getSearch = async (page, filters) => {
    setUserList([])

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

  const handleFilterUsers = (page) => {
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
    getSearch(page, filters);
  }

  const handlePageChange = (page) => {
    setActivePage(page)
    getSearch(page)
  }

  const _deleteUser = async (id, token) => {
    const response = await deleteUser(id, token)
    getSearch(1);
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
    handleFilterUsers(1);
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
    getSearch(1, {});
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    console.log(user)
    _loadSession();
    getSearch(1, {});
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
            <EditInput>
              <label htmlFor="email">E-mail</label>
              <input
                className="text-dark"
                type="text"
                id="email"
                value={editingUser.email}
                disabled
              />
            </EditInput>

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
              <label htmlFor="edit_birthdate">Data de Nascimento</label>
              <input
                id="edit_birthdate"
                type="date"
                value={moment(editBirthdate).format("YYYY-MM-DD")}
                onChange={(e) => handleEditBirthdate(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_gender">Gênero</label>
              <Select
                id="edit_gender"
                options={genderChoices}
                onChange={(e) => handleEditGender(e.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_race">Raça</label>
              <Select
                id="edit_race"
                options={raceChoices}
                onChange={(e) => handleEditRace(e.value)}
              />
            </EditInput>

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
        <form id="filterUser" onSubmit={handleSubmit(() => handleFilterUsers(1))}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="email">E-mail</label>
              <Select
                id="email_suffix"
                options={filtersSuffixList}
                placeholder="Selecionar comparador"
                onChange={(e) => setFilteringSuffix({ ...filteringSuffix, email: e.key })}
              />
              <input
                className="text-dark"
                type="text"
                id="email"
                value={filteringUser.email}
                onChange={(e) => setFilteringUser({ ...filteringUser, email: e.target.value })}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="user_name">Nome</label>
              <Select
                id="user_name_suffix"
                placeholder="Selecionar comparador"
                options={filtersSuffixList}
                onChange={(e) => setFilteringSuffix({ ...filteringSuffix, user_name: e.key })}
              />
              <input
                className="text-dark"
                type="text"
                id="user_name"
                value={filteringUser.user_name}
                onChange={(e) => setFilteringUser({ ...filteringUser, user_name: e.target.value })}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="gender">Gênero</label>
              <Select
                id="gender"
                placeholder="Selecione o gênero"
                options={genderChoices}
                onChange={(e) => setFilteringUser({ ...filteringUser, gender: e.value })}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="race">Raça</label>
              <Select
                id="race"
                options={raceChoices}
                placeholder="Selecione a raça"
                onChange={(e) => setFilteringUser({ ...filteringUser, race: e.value })}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="country">País</label>
              <Select
                id="country"
                options={countryChoices}
                placeholder="Selecione o país"
                onChange={(e) => setFilteringUser({ ...filteringUser, country: e.value })}
              />
            </EditInput>

            <EditCheckbox>
              <label htmlFor="is_professional">Profissional da Saúde</label>
              <EditCheckboxInput
                id="is_professional"
                type="checkbox"
                checked={filteringUser.is_professional ? true : false}
                onChange={() => {
                  const new_value = !filteringUser.is_professional
                  setFilteringUser({ ...filteringUser, is_professional: new_value })
                }}
              />
            </EditCheckbox>

            {user.type === "group_manager" ?
              <EditInput>
                <label htmlFor="identification_code">Código de identificação</label>
                <Select
                  id="identification_code_suffix"
                  placeholder="Selecionar comparador"
                  options={filtersSuffixList}
                  onChange={(e) => setFilteringSuffix({ ...filteringSuffix, identification_code: e.key })}
                />
                <input
                  className="text-dark"
                  type="text"
                  id="identification_code"
                  value={filteringUser.identification_code}
                  onChange={(e) => setFilteringUser({ ...filteringUser, identification_code: e.target.value })}
                />
              </EditInput> : null
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
          <EditInput>
            <label>Birthdate</label>
            <input
              className="text-dark"
              type="text"
              value={moment(userShow.birthdate).format('MM/DD/YYYY')}
              disabled
            />
          </EditInput>


          <EditInput>
            <label>Email</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.email}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Data de criação</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.created_at}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Código identificador</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.identification_code}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Gender</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.gender}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Country</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.country}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Race</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.race}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Is Professional</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.is_professional}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      <Container>
        <SearchView>
          <SearchInputDiv>
            <SearchBtn className='btn-info' onClick={() => setModalFilter(true)}>
              Filtrar pesquisa
            </SearchBtn>
            {isFiltering? 
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