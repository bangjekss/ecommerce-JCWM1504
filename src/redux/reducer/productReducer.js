const INITIAL_STATE = {
  categories: [],
  productList: [],
  isLoading: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      // INITIAL_STATE.categories.unshift('All');
      // console.log(INITIAL_STATE.categories);
      return {
        ...state,
        categories: action.payload,
      };
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        productList: action.payload,
      };
    case 'FETCH_BY_ID':
      return {
        ...state,
        productById: action.payload,
      };
    case 'GET_PRODUCTS_BY_CATEGORY':
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export { productReducer };
