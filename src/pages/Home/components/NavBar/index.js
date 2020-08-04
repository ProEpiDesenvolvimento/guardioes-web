import React from 'react';
import {
  Container,
  Title,
  SelectButton,
  SelectText
} from './styles';
import { connect } from 'react-redux';
import {
  setAdminCategories
} from 'actions/';
import { bindActionCreators } from 'redux';

const NavBar = (
  {
    email,
    token,
    user,
    setAdminCategories,
    admin_categories
  }
) => {
  const aux_categories = {
		'config_app': false,
		'manager': false,
		'users': false,
		'symptoms': false,
		'syndromes': false,
		'contents': false,
    'dashboard': false
  } 
  
  const changeNavigation = async (renderThis) => {
    const categories = admin_categories;
    categories[renderThis] = true;
    setAdminCategories(categories)
  }

  const resetCategories = () => {
    setAdminCategories({
      config_app: false,
      manager: false,
      users: false,
      symptoms: false,
      syndromes: false,
      contents: false,
      dashboard: false
    } )
  }
  return (
    <Container>
      <Title>
        Admin
      </Title>
      <SelectButton 
        onClick={() => {
          resetCategories()
          changeNavigation('config_app')}}
        isSelected={admin_categories.config_app}  
        >
        <SelectText>
          Configurar Apps
        </SelectText>
      </SelectButton>
      <SelectButton 
        isSelected={admin_categories.manager}
        onClick={() => {resetCategories()
           changeNavigation('manager')}}
        >
        <SelectText>
          Gerentes
        </SelectText>  
       </SelectButton>
      <SelectButton 
        isSelected={admin_categories.users}
        onClick={() => {
          resetCategories()
          changeNavigation('users')}}
        >
        <SelectText>
          Usuários
        </SelectText>
      </SelectButton>
      <SelectButton 
        isSelected={admin_categories.symptoms}
        onClick={() => {
          resetCategories()
          changeNavigation('symptoms')}}
        >
        <SelectText>
          Sintomas
        </SelectText>
      </SelectButton>
      <SelectButton 
        isSelected={admin_categories.syndromes}
        onClick={() => {changeNavigation('syndromes')}}
        >
        <SelectText>
          Síndromes
        </SelectText>
      </SelectButton>
      <SelectButton 
        isSelected={admin_categories.contents}
        onClick={() => {changeNavigation('contents')}}
        >
        <SelectText>
          Conteúdos
        </SelectText>
      </SelectButton>
      <SelectButton 
        isSelected={admin_categories.dashboard}
        onClick={() => {changeNavigation('dashboard')}}
        >
        <SelectText>
          Dashboard
        </SelectText>
      </SelectButton>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  token: state.user.token,
  user: state.user.user,
  admin_categories: state.user.admin_categories
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setAdminCategories
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);