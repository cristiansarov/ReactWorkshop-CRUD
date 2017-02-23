import {calculateTotalPages} from 'core/utils/helpers';

const initialState = {
  list: null,
  listLoading: false,
  totalPages: 0
};


export default function (state = initialState, action) {
  switch (action.type) {


    // GET LIST
    case 'article/getList_loading': {
      return {
        ...state,
        listLoading: true
      };
    }
    case 'article/getList_success': {
      return {
        ...state,
        listLoading: false,
        list: action.payload.data,
        totalPages: calculateTotalPages(parseInt(action.payload.headers['x-total-count']), 5)
      };
    }
    case 'article/getList_error': {
      return {
        ...state,
        listLoading: false
      };
    }


    // GET ITEM
    case 'article/getItem_loading': {
      return {
        ...state,
        itemLoading: true
      };
    }
    case 'article/getItem_success': {
      return {
        ...state,
        itemLoading: false,
        item: action.payload.data
      };
    }
    case 'article/getItem_error': {
      return {
        ...state,
        itemLoading: false
      };
    }


    // SAVE ITEM
    case 'article/saveItem_loading': {
      return {
        ...state,
        saveLoading: true
      };
    }
    case 'article/saveItem_success': {
      return {
        ...state,
        saveLoading: false
      };
    }
    case 'article/saveItem_error': {
      return {
        ...state,
        saveLoading: false
      };
    }


    // RESET ITEM
    case 'article/resetItem': {
      return {
        ...state,
        item: initialState.item
      };
    }


    default: {
      return state;
    }

  }
}
