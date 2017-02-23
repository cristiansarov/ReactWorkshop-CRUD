import React from 'react';
import {connect} from 'react-redux';
import {Loader} from 'ContentComponents';
import {Link} from 'react-router';
import {getItem, resetItem} from './ArticleActions';


@connect(state=>({
  article: state.article.item,
  loading: state.article.itemLoading
}), {
  getItem,
  resetItem
})
export default class ArticleViewScreen extends React.Component {
  componentWillMount() {
    const {getItem, params: {articleId}} = this.props;
    getItem(articleId);
  }
  render() {
    const {article, loading} = this.props;
    return (
      <div className="container">
        {article && (
          <article>
            <h1>{article.title}</h1>
            <h4>Author: <strong>{article.author}</strong></h4>
            <p>{article.content}</p>
            <Link to={{name: 'ArticleList'}}>Back to List</Link>
          </article>
        )}
        {loading && <Loader />}
      </div>
    );
  }
  componentWillUnmount() {
    this.props.resetItem();
  }
}
