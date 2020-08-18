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

const NavBar = ({ user, setComponentCallback }) => {

  const allCategories = [
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
      key: "managers_group",
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
    }
  ]

  const loadCategories = () => {
    const usera = { type: "admin_god" }
    if (usera.type === "admin") {
      allCategories.splice(0, 2);
    } else if (usera.type === "manager") {
      allCategories.splice(0, 4);
    } else if (usera.type === "manager_group") {
      allCategories.splice(0, 7);
    }
    setCategories(allCategories)
    setSelected(allCategories[0].key)
  }

  useEffect(() => {
    loadCategories();
  }, [])

  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState("");

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