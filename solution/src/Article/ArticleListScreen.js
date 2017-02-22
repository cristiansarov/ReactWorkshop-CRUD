import React from 'react';
import {connect} from 'react-redux';
import ListItem from './templates/ArticleListItem';
import {getList} from './ArticleActions';
import {Loader, Pagination, SearchInput} from 'ContentComponents';
import {Link} from 'react-router';
import {listenToLocation, setQueryParam} from 'core/utils/helpers'
import classnames from 'classnames';



@connect(state=>({
  list: state.article.list,
  totalPages: state.article.totalPages,
  loading: state.article.listLoading
}), {
  getList
})
export default class ArticleListScreen extends React.Component {
  componentWillMount() {
    this.getList();
    this.unlistenToLocation = listenToLocation(()=>{
      this.getList();
    }, this)
  }
  render() {
    const {list, loading, totalPages, location: {query}} = this.props;
    const filterButtons = ['ASC', 'DESC'];
    return (
      <div className="article-list-screen container">

        <h2>
          Article Module <Link className="btn btn-primary btn-xs" to={{name: 'ArticleAdd'}}>Create Article</Link>
        </h2>

        <div className="content-header">
          <h3>Article List</h3>
          <div>
            {filterButtons.map(item=>(
              <button key={item} className={classnames('btn btn-sm btn-default', {'btn-primary': query.order==item})}
                      onClick={()=>{setQueryParam('order', query.order == item ? null : item)}}>{item}</button>
            ))}
          </div>
          <SearchInput />
        </div>


        <div>
          {list && (list.length ? (
            <table className="table table-striped table-condensed">
              <thead><tr>
                <th>#</th>
                <th>Article Name</th>
                <th>Content</th>
                <th />
                <th />
              </tr></thead>
              <tbody>
              { list.map((article, k)=><ListItem key={k} article={article} k={k} getList={this.getList.bind(this)} />) }
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info">There are no articles found</div>
          ))}
          {loading && <Loader />}
        </div>

        <Pagination totalPages={totalPages} />

      </div>
    )
  }
  getList() {
    const {getList, location: {query}} = this.props;
    getList(query);
  }
  componentWillUnmount() {
    this.unlistenToLocation();
  }
}
