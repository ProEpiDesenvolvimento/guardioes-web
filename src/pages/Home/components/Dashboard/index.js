import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser,
  setToken
} from 'actions/';
import { sessionService } from 'redux-react-session';

import queryString from 'query-string';

import getGraphs from './services/getGraphs'

import { isEmpty } from "lodash";
import './styles.css';

const Dashboard = ({
  token,
  user
}, props) => {
  const [currentNav, setCurrentNav] = useState({})
  const [urls, setUrls] = useState({})
  const [hashes, setHashes] = useState(queryString.parse(window.location.hash))

  console.log(Object.keys(hashes))

  const _getUrls = async (type) => {
    if(!type){
      type = 'surveys'
    } else {
      type = Object.keys(currentNav)[0]
    }

    const response = await getGraphs(token, type)
    setUrls(response.urls)
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();

    _getUrls(Object.keys(hashes)[0])
    if (isEmpty(hashes)) {
      setCurrentNav({ surveys: null })
    } else {
      setCurrentNav({...hashes})
    }

    console.log(urls)
  }, [hashes.surveys, hashes.users, hashes.biosecurity, user, token]);
  
  const isCurrentNav = (string) => {
    if (typeof currentNav[string] !== "undefined") return true
    return false
  }
  // This allows a begin date for iframes
  let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div style={{ height: '100%' }}>
      <div className="dash visualizations">
        <ul className="nav nav-tabs justify-content-center" style={{ marginTop: 20 }}>
          <li className="nav-item">
            <a onClick={() => setHashes({ surveys: null })} className={`nav-link ${isCurrentNav('surveys') ? 'active' : ''}`} href="#surveys">Reportes</a>
          </li>
          <li className="nav-item">
            <a onClick= {() => setHashes({ users: null })} className={`nav-link ${isCurrentNav('users') ? 'active' : ''}`} href="#users">Usuários</a>
          </li>
          <li className="nav-item">
            <a onClick={() => setHashes({ biosecurity: null })} className={`nav-link ${isCurrentNav('biosecurity') ? 'active' : ''}`} href="#biosecurity">Biosegurança</a>
          </li>
        </ul>
      </div>
        {urls?.length &&
          <iframe
            title="Dashboard"
            src={urls[0]['iframe_url']}
            frameborder="0"
            width="100%"
            height="92%"
            allowtransparency
          />
        }
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.user.token
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser,
    setToken,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
