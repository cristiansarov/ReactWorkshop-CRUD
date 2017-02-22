const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case 'main/setRouterParams': {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state;
  }
}
