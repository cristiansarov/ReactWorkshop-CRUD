import {getListResource} from './ArticleResources';

export function getList(query) {
  return {
    type: 'article/getList',
    payload: getListResource(query)
  }
}
