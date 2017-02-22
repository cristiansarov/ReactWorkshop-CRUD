import Main from 'core/layout/Main/MainComponent';
import coreRoutes from 'core/layout/layoutRoutes';
import NotFound from 'core/layout/NotFound/NotFoundComponent';


export default {
  path: '/',
  component: Main,
  indexRoute: { onEnter: (nextState, replace) => replace({name: 'Article'}) },
  childRoutes: [
    ...coreRoutes,
    {path: '*', component: NotFound}
  ]
};
