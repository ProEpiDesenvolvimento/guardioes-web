/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Container,
  OptionButton,
  OptionsSection,
  OptionName
} from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const NavBar = ({ 
  user,
  setComponentCallback
 }) => {

  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState("")

  const allCategories = [
    {
      key: "dashboards",
      value: "Visualizações"
    },
    {
      key: "admins",
      value: "Admins"
    },
    {
      key: "apps",
      value: "Configurar Apps"
    },
    {
      key: "managers",
      value: "Gerentes"
    },
    {
      key: "city_managers",
      value: "Gerentes de Município"
    },
    {
      key: "group_managers",
      value: "Gerentes de Instituições"
    },
    {
      key: "group_manager_teams",
      value: "Equipes de Instituição"
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
      value: "Dicas"
    },
    {
      key: "forms",
      value: "Biossegurança"
    },
    {
      key: "events",
      value: "Eventos"
    },
    {
      key: "users",
      value: "Usuários"
    },
    {
      key: "profile",
      value: "Conta"
    },
    {
      key: "groups",
      value: "Instituições"
    },
    {
      key: "vigilance",
      value: "Vigilância Ativa"
    },
    {
      key: "godata",
      value: "GoData"
    },
    {
      key: "rumors",
      value: "Rumores"
    }
  ];

  const getCategories = (categoryNames = []) => {
    const categories = []
    categoryNames.forEach((categoryName) => {
      allCategories.forEach((category) => {
        if (categoryName === category.key) {
          categories.push(category)
        }
      })
    })
    return categories
  }

  const loadCategories = () => {
    let categories = allCategories.slice(0, 1);

    if (user.type === "admin" && user.is_god) {
      categories = getCategories(
        ["dashboards", "admins", "apps", "managers", "city_managers", "group_managers", "symptoms", "syndromes", "contents","rumors", "users", "profile"]
      );
    } else if (user.type === "admin" && !user.is_god) {
      categories = getCategories(
        ["dashboards", "managers", "city_managers", "group_managers", "symptoms", "syndromes", "contents", "users","rumors", "profile"]
      );
    } else if (user.type === "manager") {
      categories = getCategories(
        ["dashboards", "city_managers", "symptoms", "syndromes", "contents", "users", "profile"]
      );
    } else if (user.type === "city_manager") {
      categories = getCategories(
        ["dashboards", "users", "profile"]
      );
    } else if (user.type === "group_manager") {
      categories = getCategories(
        ["dashboards", "group_manager_teams", "groups", "contents", "forms", "events", "users", "vigilance", "godata", "profile"]
      );
    } else if (user.type === "group_manager_team") {
      categories = getCategories(
        ["dashboards", "groups", "users", "vigilance", "profile"]
      );
    }

    setCategories(categories)
    setSelected(categories[0].key)
    setComponentCallback(categories[0])
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
              key={category.key}
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
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {},
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar); 
