import store from 'core/config/store';
import _ from 'lodash';


/**
 * CALCULATE TOTAL PAGES
 * @description Receives count and perPage and returns totalPages
 * @param count
 * @param perPage
 * @returns int
 */
export function calculateTotalPages(count, perPage) {
    var totalPages;
    if (count && perPage) totalPages = Math.ceil(count / perPage);
    else totalPages = 1;
    return totalPages;
}


/**
 * String to Object Value
 * @description gets properties of an object by a string
 */
export function stringToObjectValue(s, o) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}


/**
 * Set object deep value
 */
export function setObjectDeepValue(obj, keys, val) {
    keys = keys.split('.');
    var last = keys.pop(); // get the last element off.
    for (var i in keys) {
        obj[keys[i]] = obj[keys[i]] || {};
        obj = obj[keys[i]]; // updating reference
    }
    obj[last] = val; // set the value
}


/**
 * Converts images to base64 by their url
 */
export function imageUrlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}


/**
 * Set Query parameters
 */
export function setQueryParam(name, value) {
  const { routes, params, location, router } = store.getState().main;
  const route = routes[routes.length-1];
  const query = {...location.query};
  if ([undefined, null, false].includes(value)) delete query[name];
  else query[name] = value;
  if(name!='page') delete query.page;
  router.replace({name: route.name, params, query});
}



/**
 * Listen to Location
 * @returns unlistener function
 */
export function listenToLocation(cb, that) {
  const { router } = store.getState().main;
  let lastQuery = {};
  return router.listen(location=>{
    if(!_.isEqual(lastQuery, location.query) && lastQuery.type == location.query.type) {
      setTimeout(()=>{ // to wait for props to be updated
        if(!that._calledComponentWillUnmount) cb();
      });
    }
    lastQuery = location.query;
  });
}
