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
        list: action.payload.data
      };
    }
    case 'article/getList_error': {
      return {
        ...state,
        listLoading: false
      };
    }


    default: {
      return state;
    }

  }
}
