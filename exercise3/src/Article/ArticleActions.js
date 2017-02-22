import {getListResource, getItemResource, deleteItemResource, createItemResource, updateItemResource} from './ArticleResources';

export function getList(query) {
  return {
    type: 'article/getList',
    payload: getListResource(query)
  }
}

export function getItem(articleId) {
  return {
    type: 'article/getItem',
    payload: getItemResource(articleId)
  }
}

export function deleteItem(articleId) {
  return {
    type: 'article/deleteItem',
    payload: new Promise((resolve, reject)=>{
      deleteItemResource(articleId).then(()=>{
        resolve(articleId);
      }, reject)
    })
  }
}

export function createItem(article) {
  return {
    type: 'article/saveItem',
    payload: createItemResource(article)
  }
}

export function updateItem(article) {
  return {
    type: 'article/saveItem',
    payload: updateItemResource(article)
  }
}

export function resetItem() {
  return {
    type: 'article/resetItem'
  }
}
