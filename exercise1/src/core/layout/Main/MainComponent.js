import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRouterParams } from '../Main/MainActions';


@connect(null, {
  setRouterParams
})
export default class MainComponent extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  componentWillMount() {
    const { location, params, routes, routeParams, setRouterParams } = this.props;
    setRouterParams({ location, params, routes, routeParams, router: this.context.router });
    this.context.router.listen(()=>{
      setTimeout(() => {
        const { location, params, routes, routeParams, setRouterParams } = this.props;
        setRouterParams({ location, params, routes, routeParams });
      })
    })
  }
  render() {
    return <div>{ this.props.children }</div>
  }
}
