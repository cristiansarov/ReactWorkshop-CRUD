import React from 'react';

export default class ArticleListItem extends React.Component {
  render() {
    const {article, k} = this.props;
    return (
      <tr>
        <td>
          {k+1}
        </td>
        <td className="title">
          <a>{article.title}</a>
        </td>
        <td className="content">
          <p>{article.content}</p>
        </td>
        <td>
          <a className="btn btn-xs btn-success">Edit</a>
        </td>
        <td>
          <button className="btn btn-xs btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}
