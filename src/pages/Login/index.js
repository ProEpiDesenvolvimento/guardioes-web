import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {
  setEmail, setToken, setUser
} from 'actions/';
import { bindActionCreators } from 'redux';
import requestLogin from './services/requestLogin'
import { useHistory } from "react-router-dom";
import { Container } from './styles';

const Login = ({
        email,
        token,
        setEmail,
        user,
        setUser,
        setToken
    }) =>  {

  const [password, setPassword] = useState("")
  
  const makeUserLogin = async () => {
    const response = await requestLogin("a@mail.com", "teste123", "admin")
    setToken(response.authorization);
    setUser(response.user)
  }


  useEffect(() => {
  }, []);

  return (
      <Container>
         <div onClick={()=> {makeUserLogin()}}>
             oi
         </div>
      </Container>
  );
}
const mapStateToProps = (state) => ({
    email: state.user.email,
    token: state.user.token,
    user: state.user.user
  });
  
  const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      setEmail,
      setToken,
      setUser
    },
    dispatch,
  );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);