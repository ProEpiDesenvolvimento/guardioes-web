import React from 'react';
import { withCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { Store } from './store';

function App(props) {
  return (
    <Provider store={Store}>
      <div>
        OOLA
      </div>
    </Provider>
  );
};

export default withCookies(App);
