import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
import MainReducer from '../layout/Main/MainReducer';
import ArticleReducer from '../../Article/ArticleReducer';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  form: formReducer,
  main: MainReducer,
  article: ArticleReducer
});

export default rootReducer;
