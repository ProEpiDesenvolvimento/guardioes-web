import React, { useEffect, useState } from 'react';
import {
  Container,
  EditInput,
  SubmitButton,
  SearchView
} from './styles';
import { connect } from 'react-redux';
import {
 setUsers,
 setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import ContentBox from '../ContentBox';
import getAllUsers from './services/getAllUsers';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import deleteUser from './services/deleteUser';

const Users = ({
  setUsers,
  users,
  setToken,
  token
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [userShow, setUserShow] = useState({});
  const [userSearch, setUserSearch] = useState("");
  const [userList, setUserList] = useState([]);

  const fields = [
    {
      key: "id",
      value: "Id."
    },
    {
      key: "user_name",
      value: "Name"
    }
  ]

  const search = (userSearch) => {
    const filteredUsers = users.filter((user) => {
      if ( userSearch.length > 1) {
        return user.user_name && user.user_name.indexOf(userSearch) >= 0; 
      }
      else {
        return users
      }
    });
    setUserList(filteredUsers)
  }

  const handleShow = (user) => {
    setUserShow(user);
    setModalShow(!modalShow);
  }

  const handleSearch = (value) => {
    setUserSearch(value)
    search(userSearch)
  }
  const _getUsers = async (token) => {
    const response = await getAllUsers(token)
    console.log(response.users)
    setUsers(response.users)
    setUserList(response.users)
  }

  const _deleteUser = async (id, token) => {
    const response = await deleteUser(id, token)
    console.log(response)
    _getUsers(token);
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    _getUsers(token)
  }, [token]);

  return (
    <>

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
            <label>Country</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.country}
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
          <EditInput>
            <label>Search Users</label>
            <input 
              type="text"
              value={userSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </EditInput>
        </SearchView>
        <ContentBox 
          title="Users"
          fields={fields}
          contents={userList ? userList : []}
          handleShow={handleShow}
          component_height={'40rem'}
          delete_function={_deleteUser}
          token={token}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  users: state.user.users
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