import axios from 'axios';

export function getListResource({page = 1, size = 999, search, order}) {
  return axios.get('/articles', {params: {
    _page: page,
    _limit: size,
    q: search,
    _sort: order ? 'title' : undefined,
    _order: order
  }});
}

export function getItemResource(articleId) {
  return axios.get(`/articles/${articleId}`);
}

export function createItemResource(article) {
  return axios.post('/articles', article);
}

export function updateItemResource(article) {
  return axios.put(`/articles/${article.id}`, article);
}

export function deleteItemResource(articleId) {
  return axios.delete(`/articles/${articleId}`);
}
