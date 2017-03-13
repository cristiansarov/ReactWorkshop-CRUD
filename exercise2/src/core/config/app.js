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
          <Router history={history} routes={routes} createElement={this.createElement}  />
          <ReduxToastr timeOut={3000} />
        </div>
      </Provider>
    );
  }
  createElement(component, props) { // fix for not re-rendering component routes with same component
    return React.createElement(component, { ...props, key: props.location.pathname });
  }
}
