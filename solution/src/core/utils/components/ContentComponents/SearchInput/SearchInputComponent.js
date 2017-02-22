import React from 'react';
import {connect} from 'react-redux';
import debounce from 'debounce';
import {setQueryParam} from 'core/utils/helpers';


@connect(state=>({
  query: state.main.location.query
}))
export default class SearchInputComponent extends React.Component {

  state = {};

  search(value) {
    this.setState({search: value});
    this.debounceSearch(value);
  }

  debounceSearch = debounce(value=>{
    this.setState({search: value});
    setQueryParam('search', value||null);
  }, 300);

  render() {
    const {placeholder, query} = this.props;
    const {search} = this.state;
    return (
      <div className="filter-control-input">
        <input
          className="form-control input-sm"
          type="text"
          value={typeof search != 'undefined' ? search : query.search}
          placeholder={placeholder||'Search'}
          onChange={e=>this.search(e.target.value)}/>
        {search ? (
          <button className="fa fa-times" onClick={()=>{this.setState({search: ''});setQueryParam('search', null)}} />
        ) : (
          <i className="fa fa-search" />
        ) }
      </div>
    )
  }
}
