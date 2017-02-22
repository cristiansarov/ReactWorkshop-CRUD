import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Loader} from 'ContentComponents';
import {toastr} from 'react-redux-toastr';
import {Field, SubmitButton, ReturnButton, ResetButton, Validate} from 'FormComponents';
import {getItem, createItem, updateItem, resetItem} from './ArticleActions';


@connect(state=>({
  article: state.article.item,
  getLoading: state.article.itemLoading,
  saveLoading: state.article.saveLoading,
  router: state.main.router
}), {
  getItem,
  createItem,
  updateItem,
  resetItem
})
@reduxForm({form: 'ArticleEditForm', validate: Validate({
  title: {required: true},
  author: {required: true},
  content: {required: true}
})})
export default class ArticleEditScreen extends React.Component {
  componentWillMount() {
    const {getItem, params: {articleId}, initialize} = this.props;
    this.addMode = !articleId;
    if(!this.addMode) getItem(articleId).then(response=>{
      initialize(response.value.data);
    });
  }
  render() {
    const {getLoading, saveLoading, handleSubmit, reset} = this.props;
    return (
      <form className="container" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <h1>Edit Article</h1>

        <fieldset disabled={saveLoading}>
          <Field name="title" label="Title" />
          <Field name="author" label="Author" />
          <Field name="content" label="Content" type="textarea" />
        </fieldset>

        <div className="form-actions">
          <ReturnButton route={{name: 'ArticleList'}} />
          <ResetButton reset={reset} />
          <SubmitButton loading={saveLoading}>Save</SubmitButton>
        </div>

        {getLoading && <Loader />}
      </form>
    );
  }
  onSubmit(formData) {
    const {createItem, updateItem, initialize, router} = this.props;
    if(this.addMode) {
      createItem(formData).then(response=>{
        toastr.success('You have updated the article successfully!');
        router.push({name: 'ArticleEdit', params: {articleId: response.value.data.id}});
      })
    } else {
      updateItem(formData).then(response=>{
        toastr.success('You have created the article successfully!');
        initialize(response.value.data);
      })
    }
  }
  componentWillUnmount() {
    this.props.resetItem();
  }
}
