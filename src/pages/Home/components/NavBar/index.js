/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import userIcon from 'pages/Home/components/assets/userIcon.svg';
import signOut from 'pages/Home/components/assets/sign-out.svg';
import { useHistory } from "react-router-dom";
import {
  setUser
} from 'actions/';
import { sessionService } from 'redux-react-session';
import {
  Container,
  OptionButton,
  OptionsSection,
  OptionName,
  UserDiv,
  UserName,
  NavIcon,
  UserDivIcon,
  Logo,
  NavTo
} from './styles';
import logo from 'assets/img/logo.png';
import { connect } from 'react-redux';
import {
  setAdminCategories
} from 'actions/';
import { bindActionCreators } from 'redux';

const usersTypes = {
  "admin": "Administrador",
  "manager": "Gerente",
  "group_manager": "Instituição"
}

const NavBar = ({
  user,
  setComponentCallback
}) => {

  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState("")

  const allCategories = [
    {
      key: "dashboard",
      value: "Visualizações"
    },
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
      key: "groups",
      value: "Instituições"
    },
  ];

  const loadCategories = () => {
    let categories = allCategories.slice(0, 1);

    if (user.type === "admin") {
      if (user.is_god === true) {
        categories = categories.concat(allCategories.slice(1, -1));
      }
      else {
        categories = categories.concat(allCategories.slice(3, -1));
      }
    } else if (user.type === "manager") {
      categories = categories.concat(allCategories.slice(5, -1));
    } else if (user.type === "group_manager") {
      categories = categories.concat(allCategories.slice(8));
    }

    setCategories(categories)
    setSelected(categories[0].key)
    setComponentCallback(categories[0])
  }

  useEffect(() => {
    loadCategories()
  }, [user.type]);

  const history = useHistory();

  const logout = async () => {
    await sessionService.deleteSession()
    await sessionService.deleteUser()
    setUser("")
    history.push("/login")
  }

  return (
    <Container>
      <Logo src={logo}/>
      <UserDiv>
        <div><NavIcon src={userIcon} /> {user.type === "admin" ? user.first_name + " " + user.last_name : user.name} <i>({user["type"]})</i></div>
        <div>{user.email}</div>
        <NavTo onClick={logout}>
          <UserDivIcon src={signOut} /> Logout
        </NavTo>
      </UserDiv>
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
      <NavTo style={{marginBottom: 40}} to="/contact">
        Contato
      </NavTo>
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
