import ArticleList from './ArticleListScreen';

export default {
  path: 'articles',
  name: 'Article',
  component: props=>props.children,
  indexRoute: {name: 'ArticleList', component: ArticleList},
  childRoutes: []
};
