import React from 'react';
import { withCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { Store } from './store';
import Routes from "./routes";

function App() {
  return (
    <Provider store={Store}>
       <Routes />
    </Provider>
  );
};

export default withCookies(App);
