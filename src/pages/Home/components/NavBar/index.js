import React, { useState } from 'react';
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

const NavBar = ({ user }) => {
  const [categories, setCategories] = user.type === "admin" ?
    useState([
      {
        key: "managers",
        value: "Gerentes"
      },
      {
        key: "configApps",
        value: "Configurar Apps"
      },
      {
        key: "users",
        value: "Usuários"
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
        key: "dashboard",
        value: "Visualizações"
      }
    ])
    : useState([
      {
        key: "users",
        value: "Usuários"
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
        key: "dashboard",
        value: "Visualizações"
      }
    ])
  const [selected, setSelected] = useState(categories[0].key);

  return (
    <Container>
      <OptionsSection>
        {categories.map(category => {
          return (
            <OptionButton onClick={() => setSelected(category.key)} selected={selected === category.key ? true : false} key={category.key}>
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