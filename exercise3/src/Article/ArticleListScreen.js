import React from 'react';
import {connect} from 'react-redux';
import ListItem from './templates/ArticleListItem';
import {getList} from './ArticleActions';
import {Loader} from 'ContentComponents';
import {Link} from 'react-router';



@connect(state=>({
  list: state.article.list,
  loading: state.article.listLoading
}), {
  getList
})
export default class ArticleListScreen extends React.Component {
  componentWillMount() {
    const {getList} = this.props;
    getList();
  }
  render() {
    const {list, loading, getList} = this.props;
    return (
      <div className="article-list-screen container">

        <h2>
          Article Module <Link className="btn btn-primary btn-xs" to={{name: 'ArticleAdd'}}>Create Article</Link>
        </h2>

        <h3>Article List</h3>

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
              { list.map((article, k)=><ListItem key={k} article={article} k={k} getList={getList} />) }
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info">There are no articles found</div>
          ))}
          {loading && <Loader />}
        </div>

      </div>
    )
  }
}
