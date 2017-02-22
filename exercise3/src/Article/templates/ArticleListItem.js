import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {deleteItem} from '../ArticleActions';


@connect(null, {
  deleteItem
})
export default class ArticleListItem extends React.Component {
  render() {
    const {article, k} = this.props;
    return (
      <tr>
        <td>
          {k+1}
        </td>
        <td className="title">
          <Link to={{name: 'ArticleView', params: {articleId: article.id}}}>{article.title}</Link>
        </td>
        <td className="content">
          <p>{article.content}</p>
        </td>
        <td>
          <Link to={{name: 'ArticleEdit', params: {articleId: article.id}}} className="btn btn-xs btn-success">Edit</Link>
        </td>
        <td>
          <button onClick={this.deleteItem.bind(this)} className="btn btn-xs btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
  deleteItem() {
    const {article, deleteItem, getList} = this.props;
    if(confirm('Are you sure?')) {
      deleteItem(article.id).then(getList);
    }
  }
}
