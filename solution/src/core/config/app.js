import React, { Component } from 'react';
import { Provider } from 'react-redux';
import history from './history'
import routes from './routes';
import { Router } from 'react-router';
import store from './store';
import ReduxToastr from 'react-redux-toastr';
import axios from 'axios';


// sets /api prefix to axios requests
axios.defaults.baseURL = '/api';

export default class AppComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <ReduxToastr timeOut={3000} />
        </div>
      </Provider>
    );
  }
}
