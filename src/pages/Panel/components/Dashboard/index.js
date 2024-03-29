import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser,
  setToken
} from 'actions/';
import { sessionService } from 'redux-react-session';
import { isEmpty } from "lodash";

import getGraphs from './services/getGraphs';
import './styles.css';

const Dashboard = ({
  token,
  user
}) => {
  const [urls, setUrls] = useState({})
  const [hashes, setHashes] = useState(queryString.parse(window.location.hash))

  const _getUrls = async (type) => {
    if (!type) {
      type = 'surveys'
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
  }, []);

  useEffect(() => {
    if (isEmpty(hashes)) {
      setHashes({ surveys: null })
    }
  }, [hashes]);

  useEffect(() => {
    if (token && !isEmpty(hashes)) {
      _getUrls(Object.keys(hashes)[0])
    }
  }, [token, hashes]);

  const isHash = (string) => {
    if (typeof hashes[string] !== "undefined") {
      return true
    }
    return false
  }

  const isGroupManagerORTeam = () => {
    return user.type === 'group_manager' || user.type === 'group_manager_team'
  }

  const isVigilance = () => {
    if (user.type === 'group_manager') {
      if (user.vigilance_email) {
        return true
      }
    } else if (user.type === 'group_manager_team') {
      if (user.group_manager && user.group_manager.vigilance_email) {
        return true
      }
    }
    return false
  }

  // This allows a begin date for iframes
  // let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div style={{ height: '100%' }}>
      <div className="dash visualizations">
        <ul className="nav nav-tabs justify-content-center" style={{ marginTop: 20 }}>
          <li className="nav-item">
            <a 
              onClick={() => setHashes({ surveys: null })} 
              className={`nav-link ${isHash('surveys') ? 'active' : ''}`} 
              href="#surveys"
            >
              Reportes
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick= {() => setHashes({ users: null })}
              className={`nav-link ${isHash('users') ? 'active' : ''}`}
              href="#users"
            >
              Usuários
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => setHashes({ biosecurity: null })}
              className={`nav-link ${!isGroupManagerORTeam() ? 'd-none': ''} ${isHash('biosecurity') ? 'active' : ''}`}
              href="#biosecurity"
            >
              Biossegurança
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => setHashes({ vigilance: null })}
              className={`nav-link ${!isGroupManagerORTeam() || !isVigilance() ? 'd-none': ''} ${isHash('vigilance') ? 'active' : ''}`}
              href="#vigilance"
            >
              Vigilância Ativa
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => setHashes({ vaccination: null })}
              className={`nav-link ${!isGroupManagerORTeam() ? 'd-none': ''} ${isHash('vaccination') ? 'active' : ''}`}
              href="#vaccination"
            >
              Vacinação
            </a>
          </li>
        </ul>
      </div>
        {urls?.length &&
          <iframe
            title="Dashboard"
            src={urls[0]['iframe_url']}
            frameBorder="0"
            width="100%"
            height="92%"
            allowtransparency="true"
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
