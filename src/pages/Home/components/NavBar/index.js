import React, { useState, useEffect } from 'react';
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

const NavBar = ({ 
  user,
  setComponentCallback
 }) => {

  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState("")

  let allCategories = [
    {
      key: "admins",
      value: "Admins"
    },
    {
      key: "configApps",
      value: "Configurar Apps"
    },
    {
      key: "managers",
      value: "Gerentes"
    },
    {
      key: "managersGroup",
      value: "Gerentes de Instituições"
    },
    {
      key: "symptoms",
      value: "Sintomas"
    },
    {
      key: "syndromes",
      value: "Síndromes"
    },
    {
      key: "contents",
      value: "Conteúdos"
    },
    {
      key: "users",
      value: "Usuários"
    },
    {
      key: "dashboard",
      value: "Visualizações"
    },
    {
      key: "groups",
      value: "Instituições"
    },
  ];

  const loadCategories = () => {
    let defaultCat = {}

    if (user.type === "admin") {
      defaultCat = allCategories[0];
    } else if (user.type === "manager") {
      allCategories.splice(0, 4);
      defaultCat = allCategories[0];
    } else if (user.type === "group_manager") {
      allCategories.splice(0, 7);
      defaultCat = allCategories[1];
    }

    setCategories(allCategories)
    setSelected(defaultCat.key)
    setComponentCallback(defaultCat)
  }

  useEffect(() => {
    loadCategories()
  }, [user.type]);

  return (
    <Container>
      <OptionsSection>
        {categories.map(category => {
          return (
            <OptionButton
              onClick={() => {
                setSelected(category.key)
                setComponentCallback(category)
              }}
              selected={selected === category.key ? true : false}
            >
              <OptionName>
                {category.value}
              </OptionName>
            </OptionButton>
          );
        })}
      </OptionsSection>
    </Container>
  )
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
