import React, { useState, useEffect } from 'react';
import getGraphs from './services/getGraphs'
import queryString from 'query-string';
import { isEmpty } from "lodash";
import './styles.css';
var jwt = require('jsonwebtoken')

function Dashboard(props) {
  const [currentNav, setCurrentNav] = useState({})
  const [urls, setUrls] = useState({})
  const hashes = queryString.parse(window.location.hash)

  const _getUrls = async () => {
    const response = await getGraphs()
    // console.log(response)
    setUrls(response.urls)
  }

  const METABASE_SITE_URL = "http://localhost:3002";
  const METABASE_SECRET_KEY = "af294119ad618231d45901bc52f68b843e64b24510fc4183dcbf0add14d30c25";

  var payload = {
    resource: { dashboard: 1 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  
  var token = jwt.sign(payload, METABASE_SECRET_KEY);

  var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

  useEffect(() => {
    _getUrls()
    if (isEmpty(hashes)) {
      setCurrentNav({ geral: null })
    }
    else {
      setCurrentNav(hashes)
    }
  }, [hashes.geral, hashes.adesao, hashes.dados]);

  const isCurrentNav = (string) => {
    if (typeof currentNav[string] !== "undefined") return true
    return false
  }

  // This allows a begin date for iframes
  let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div className="dash visualizations">
      <ul className="nav nav-tabs justify-content-center" style={{ marginTop: 20 }}>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('geral') ? 'active' : ''}`} href="#geral">Dados gerais</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('adesao') ? 'active' : ''}`} href="#adesao">Dados sobre adesão</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('dados') ? 'active' : ''}`} href="#dados">Tabelas de dados</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('dashboard') ? 'active' : ''}`} href="#dashboard">Dashboard</a>
        </li>
      </ul>

      <div className={`dash visualizations ${isCurrentNav('geral') ? '' : 'd-none'}`}>
        <iframe
          title="Dados gerais"
          src={iframeUrl}
          frameBorder="0"
          height="900"
          width="100%"
        />
      </div>

      <div className={`dash visualizations ${isCurrentNav('adesao') ? '' : 'd-none'}`}>
        <iframe
          title="Dados sobre adesão"
          src={"http://painel.gds.proepi.org.br:5601/app/kibana#/dashboard/890db060-c06f-11ea-8757-c560579e51be?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'" + date + "',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:'19ab77de-4c86-48ae-8bc5-409052991902',w:48,x:0,y:0),id:'000abcf0-e256-11ea-b06d-f32b0ae9e5ff',panelIndex:'19ab77de-4c86-48ae-8bc5-409052991902',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:d4a06aab-f9a2-436e-b8a6-cefa3b711dab,w:48,x:0,y:15),id:'517cf530-e256-11ea-b06d-f32b0ae9e5ff',panelIndex:d4a06aab-f9a2-436e-b8a6-cefa3b711dab,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'38264330-a718-49f2-9636-dda67d9f719b',w:48,x:0,y:30),id:'54fc7570-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:'38264330-a718-49f2-9636-dda67d9f719b',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:18,i:'269f3c4c-1ea7-4d6d-a3ae-6bfba2982984',w:48,x:0,y:45),id:'2a37dea0-e25a-11ea-b06d-f32b0ae9e5ff',panelIndex:'269f3c4c-1ea7-4d6d-a3ae-6bfba2982984',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'87eea98b-a107-468c-aeea-f06b096be024',w:48,x:0,y:63),id:a5c35f40-e25a-11ea-b06d-f32b0ae9e5ff,panelIndex:'87eea98b-a107-468c-aeea-f06b096be024',type:visualization,version:'7.6.1'),(embeddableConfig:(hiddenLayers:!(),isLayerTOCOpen:!f,mapCenter:(lat:-14.14736,lon:-52.64071,zoom:3.6),openTOCDetails:!()),gridData:(h:30,i:fcc41562-98bd-411c-8995-d9ceaf3352af,w:48,x:0,y:93),id:ce21ad90-c0a2-11ea-8757-c560579e51be,panelIndex:fcc41562-98bd-411c-8995-d9ceaf3352af,type:map,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'2cc1390c-8d30-4712-ba41-d6cf01242fc6',w:48,x:0,y:78),id:'47a719e0-e261-11ea-b06d-f32b0ae9e5ff',panelIndex:'2cc1390c-8d30-4712-ba41-d6cf01242fc6',type:visualization,version:'7.6.1')),query:(language:kuery,query:''),timeRestore:!t,title:'M%C3%A9tricas%20de%20engajamento%20-%20Guardi%C3%B5es%20da%20Sa%C3%BAde',viewMode:view)"}
          frameBorder="0"
          height="3550"
          width="100%"
        />
      </div>

      <div className={`dash visualizations ${isCurrentNav('dados') ? '' : 'd-none'}`}>
        <iframe
          title="Tabelas de dados"
          src={"http://painel.gds.proepi.org.br:5601/app/kibana#/dashboard/926885c0-acd0-11ea-8757-c560579e51be?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'" + date + "',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:3,i:ea5f3762-c339-47d1-bc92-9ef6346cf66e,w:48,x:0,y:0),id:b18405e0-ace1-11ea-8757-c560579e51be,panelIndex:ea5f3762-c339-47d1-bc92-9ef6346cf66e,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:20,i:'492b704d-1fee-4fae-aab1-3c13d668136a',w:48,x:0,y:3),id:'231e3e70-ed2c-11ea-a5d0-b9c877143e8b',panelIndex:'492b704d-1fee-4fae-aab1-3c13d668136a',type:search,version:'7.6.1'),(embeddableConfig:(),gridData:(h:19,i:f589cd8e-bafd-4b39-aece-18a90f8afbdd,w:48,x:0,y:23),id:bd3b53e0-ed2b-11ea-a5d0-b9c877143e8b,panelIndex:f589cd8e-bafd-4b39-aece-18a90f8afbdd,type:search,version:'7.6.1')),query:(language:kuery,query:''),timeRestore:!f,title:Relat%C3%B3rios,viewMode:view)"}
          frameBorder="0"
          height="1250"
          width="100%"
        />
      </div>
{/* 
      <div className={`dash visualizations ${isCurrentNav('dashboard') ? '' : 'd-none'}`}>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {urls.length && urls.map((url) => {
            return (
              <div style={{ margin: 10 }}>
                <iframe
                  src={url['iframe_url']}
                  frameborder="0"
                  width="600"
                  height="400"
                  allowtransparency
                />
              </div>
            )
          })}
        </div>
      </div> */}

      <i className={"note"}>NOTA: caso você encontre problemas nessa página, use o navegador Firefox</i>
    </div>
  );
}

export default Dashboard;