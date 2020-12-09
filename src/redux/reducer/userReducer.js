const INITIAL_STATE = {
  id: 0,
  username: null,
  email: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        id: action.payload.id,
      };
    // case 'REGISTER':
    //   return {
    //     ...state,
    //     email: action.payload.email,
    //     username: action.payload.username,
    //     id: action.payload.id,
    //   };
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { userReducer };
