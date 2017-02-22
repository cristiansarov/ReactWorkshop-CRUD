import React from 'react';
import {connect} from 'react-redux';
import { setQueryParam } from 'core/utils/helpers';
import {Pagination} from 'react-bootstrap';


@connect(state=>({
  location: state.main.location
}))
export default class PaginationComponent extends React.Component {
  render() {
    const { location: { query }, totalPages, activePage, onSelect } = this.props;
    if(totalPages<=1) return null;
    return (
      <Pagination
        prev={<span><span className="pagination--prev">Back</span></span>}
        next={<span><span className="pagination--next">Next</span></span>}
        bsSize="medium"
        boundaryLinks
        maxButtons={10}
        items={totalPages}
        activePage={activePage||parseInt(query.page)||1}
        onSelect={onSelect||this.handleOnSelect}/>
    )
  }
  handleOnSelect(page) {
    if(page==1) page = null;
    setQueryParam('page', page);
  }
}
