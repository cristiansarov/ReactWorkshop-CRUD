import ArticleList from './ArticleListScreen';
import ArticleView from './ArticleViewScreen';
import ArticleEdit from './ArticleEditScreen';


export default {
  path: 'articles',
  name: 'Article',
  component: props=>props.children,
  indexRoute: {name: 'ArticleList', component: ArticleList},
  childRoutes: [
    {path: 'add', name: 'ArticleAdd', component: ArticleEdit},
    {path: ':articleId', name: 'ArticleView', component: ArticleView},
    {path: ':articleId/edit', name: 'ArticleEdit', component: ArticleEdit}
  ]
};
