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
  const hashes = queryString.parse(window.location.hash)

  const _getUrls = async () => {
    const response = await getGraphs(token)
    setUrls(response.urls)
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();

    _getUrls()
    if (isEmpty(hashes)) {
      setCurrentNav({ reportes: null })
    } else {
      setCurrentNav(hashes)
    }

    console.log(urls)
  }, [hashes.reportes, hashes.usuarios, hashes.bioseguranca, user, token]);
  
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
            <a className={`nav-link ${isCurrentNav('reportes') ? 'active' : ''}`} href="#reportes">Reportes</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${isCurrentNav('usuarios') ? 'active' : ''}`} href="#usuarios">Usuários</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${isCurrentNav('bioseguranca') ? 'active' : ''}`} href="#bioseguranca">Biosegurança</a>
          </li>
        </ul>
      </div>

      <div style={{width: '100%', height: '92%'}} className={`${isCurrentNav('reportes') ? '' : 'd-none'}`}>
        {urls?.length &&
          <iframe
            src={urls[0]['iframe_url']}
            frameborder="0"
            width="100%"
            height="100%"
            allowtransparency
          />
        }
      </div>

      <div style={{width: '100%', height: '92%'}} className={`${isCurrentNav('usuarios') ? '' : 'd-none'}`}>
        {urls?.length &&
          <iframe
            src={urls[1]['iframe_url']}
            frameborder="0"
            width="100%"
            height="100%"
            allowtransparency
          />
        }
      </div>

      <div style={{width: '100%', height: '92%'}} className={`${isCurrentNav('bioseguranca') ? '' : 'd-none'}`}>
        {urls?.length &&
          <iframe
            src={urls[2]['iframe_url']}
            frameborder="0"
            width="100%"
            height="100%"
            allowtransparency
          />
        }
      </div>
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
