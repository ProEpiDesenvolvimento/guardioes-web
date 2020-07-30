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

  const changeNavigation = (renderThis) => {
    setAdminCategories(renderThis)
  }
  return (
    <Container>
      <Title>
        Admin
      </Title>
      <SelectButton 
        isSelected={admin_categories.config_app}
        onClick={() => {changeNavigation("config_app")}}
        >
        <SelectText>
          Configurar Apps
        </SelectText>
      </SelectButton>
      <SelectButton isSelected={admin_categories.manager}>
        <SelectText>
          Gerentes
        </SelectText>  
       </SelectButton>
      <SelectButton isSelected={admin_categories.users}>
        <SelectText>
          Usuários
        </SelectText>
      </SelectButton>
      <SelectButton isSelected={admin_categories.symptoms}>
        <SelectText>
          Sintomas
        </SelectText>
      </SelectButton>
      <SelectButton isSelected={admin_categories.syndromes}>
        <SelectText>
          Síndromes
        </SelectText>
      </SelectButton>
      <SelectButton isSelected={admin_categories.contents}>
        <SelectText>
          Conteúdos
        </SelectText>
      </SelectButton>
      <SelectButton isSelected={admin_categories.dashboard}>
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