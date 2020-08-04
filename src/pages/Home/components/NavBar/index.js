import React from 'react';
import {
  Container,
  OptionButton,
  OptionsSection,
  OptionName
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
      <OptionsSection>
        <OptionButton>
          <OptionName>
            Gerentes
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Configurar Apps
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Usuários
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Sintomas
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Conteúdos
          </OptionName>
        </OptionButton>
      </OptionsSection>
    </Container>
  )}
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