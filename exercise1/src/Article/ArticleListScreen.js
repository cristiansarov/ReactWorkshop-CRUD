import React from 'react';


export default class ArticleListScreen extends React.Component {
  render() {
    return (
      <div className="article-list-screen container">

        <h2>
          Article Module <a className="btn btn-primary btn-xs">Create Article</a>
        </h2>

        <h3>Article List</h3>

        <table className="table table-striped table-condensed">
          <thead><tr>
            <th>#</th>
            <th>Article Name</th>
            <th>Content</th>
            <th />
            <th />
          </tr></thead>
          <tbody>
          <tr>
            <td>
              1
            </td>
            <td className="title">
              <a>Article Name</a>
            </td>
            <td className="content">
              <p>The description that the article should have.</p>
            </td>
            <td>
              <a className="btn btn-xs btn-success">Edit</a>
            </td>
            <td>
              <button className="btn btn-xs btn-danger">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>

        <div className="alert alert-info">There are no articles found</div>

      </div>
    )
  }
}
