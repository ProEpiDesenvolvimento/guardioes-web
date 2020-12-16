import React, { useEffect, useState } from 'react';
import {
  Container,
} from './styles';
import { connect } from 'react-redux';
import {
 setVigilanceSyndromes,
 setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';

const Vigilance = ({
    setToken,
    token
}) => {
  

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    // _getSyndromes(token, 1)
  }, [token]);

  return (
    <>
      

      <Container>
        {/* <ContentBox 
          title="Síndromes"
          fields={fields}
          contents={userList}
          handleShow={handleShow}
          component_height={'35rem'}
          delete_function={_deleteUser}
          token={token}
          handleEdit={handleEdit}
        /> */}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  syndromes: state.user.syndromes
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    // setVigilanceSyndromes,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vigilance); 